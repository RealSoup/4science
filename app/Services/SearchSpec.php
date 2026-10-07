<?php

namespace App\Services;

use Illuminate\Support\Facades\{DB, Redis};

//  규격 표기 정리 (AI 검색) - 검색어·상품 규격을 같은 모양으로 맞춰 비교
//  "500 mL" "500㎖" → "500ml" / "1,000ml" → "1000ml" / 6인치·6" → "6inch"
class SearchSpec {
    const UNITS = 'ml|l|ul|cc|mg|g|kg|ug|mm|cm|m|um|nm|mesh|inch|%';
    //  같은 종류 단위 → 기준 단위 배수 (1l = 1000ml) - 속성 칸(attr_volume·attr_pack_mass)도 이 기준 단위 (la_shop_goods_attr_def와 같음)
    //  m(미터)는 뺌 - "1m hcl"의 1M은 몰 농도
    const UNIT_GROUPS = [
        'volume'    => ['ul' => 0.001, 'ml' => 1, 'cc' => 1, 'l' => 1000],
        'pack_mass' => ['ug' => 0.001, 'mg' => 1, 'g' => 1000, 'kg' => 1000000],
        'length'    => ['nm' => 0.000001, 'um' => 0.001, 'mm' => 1, 'cm' => 10],
    ];

    protected static $makers;

    public static function normalize(string $text): string {
        $text = mb_strtolower($text);
        $text = str_replace(
            ['㎖', 'ℓ', '㎕', 'μl', 'µl', '㎍', 'μg', 'µg', '㎎', '㎏', '㎛', 'μm', 'µm', '㎜', '㎝', '㎚'],
            ['ml', 'l', 'ul', 'ul', 'ul', 'ug', 'ug', 'ug', 'mg', 'kg', 'um', 'um', 'um', 'mm', 'cm', 'nm'],
            $text);
        $text = preg_replace('/(\d)\s*(인치|\\\\*")/u', '$1inch', $text);                         //  6인치, 6" → 6inch
        $text = preg_replace('/(\d),(\d{3})(?!\d)/', '$1$2', $text);                             //  1,000 → 1000
        return preg_replace('/(\d)\s+(' . self::UNITS . ')(?![a-z])/u', '$1$2', $text);       //  500 ml → 500ml
    }

    //  규격 토큰 목록 ["500ml", "99.9%"] - $except: 규격이 아닌 말 (예: 제조사 "3m")
    public static function tokens(string $text, array $except = []): array {
        preg_match_all('/(?<![\d.])\d+(?:\.\d+)?(?:' . self::UNITS . ')(?![a-z])/u', self::normalize($text), $m);
        return array_values(array_diff(array_unique($m[0]), $except));
    }

    //  text 안에 규격 토큰이 그대로 있는지 ("1500ml" 안의 "500ml"은 아님)
    public static function contains(string $text, string $token): bool {
        return (bool) preg_match('/(?<![\d.])' . preg_quote($token, '/') . '(?![a-z])/u', self::normalize($text));
    }

    //  규격 토큰을 뺀 나머지 ("비커 500ml" → "비커")
    public static function without(string $text, array $tokens): string {
        $text = self::normalize($text);
        foreach ($tokens as $t)
            $text = preg_replace('/(?<![\d.])' . preg_quote($t, '/') . '(?![a-z])/u', ' ', $text);
        return trim(preg_replace('/\s+/u', ' ', $text));
    }

    //  제조사 이름 (소문자) - "3m 장갑"의 3m은 규격이 아니라 제조사
    public static function makers(): array {
        if (self::$makers === null) {
            $cached = Redis::get('search_spec:makers');
            self::$makers = $cached ? json_decode($cached, true) : null;
            if (!self::$makers) {
                self::$makers = DB::table('shop_makers')->pluck('mk_name')->map(fn($n) => mb_strtolower(trim($n)))->filter()->unique()->values()->all();
                Redis::setex('search_spec:makers', 86400, json_encode(self::$makers));
            }
        }
        return self::$makers;
    }

    //  규격 가산점 (shop_goods_v2) - "비커 500ml": 규격에 500ml이 있고 나머지 단어("비커")도 맞는 상품에 +$weight
    //  나머지 단어는 하나씩 상품명·모델명·키워드·제조사 중 어디든 있으면 됨 ("duran 500ml")
    //  점수만 더함 (function_score) → 규격만 맞는 엉뚱한 상품을 새로 끌어오지 않음
    //  $attr(속성 방식, 기본 = .env SEARCH_ATTR): 같은 양의 다른 단위("1l" = "1000ml")와 속성 칸(범위·순도)도 맞는 것으로 봄
    public static function functions(string $keyword, int $weight, ?bool $attr = null): array {
        $specs = self::tokens($keyword, self::makers());
        if (!$specs || $weight <= 0)
            return [];

        $attr = $attr ?? GoodsElasticSearch::hasAttr();
        $must = array_map(fn($s) => $attr ? self::specMatch($s) : ['term' => ['spec_all' => $s]], $specs);
        $rest = self::without($keyword, $specs);
        foreach ($rest === '' ? [] : explode(' ', $rest) as $word) {
            $q = ['query' => $word, 'operator' => 'and', 'zero_terms_query' => 'all'];     //  "~" 처럼 검색어가 안 되는 말은 통과
            $must[] = ['bool' => ['should' => [
                ['match' => ['gd_name'     => $q + ['analyzer' => 'korean_search']]],
                ['match' => ['gm_name_all' => $q + ['analyzer' => 'korean_search']]],
                ['match' => ['gd_keyword'  => $q + ['analyzer' => 'korean_search']]],
                ['match' => ['mk_name'     => $q]],
            ], 'minimum_should_match' => 1]];
        }

        return [['filter' => ['bool' => ['must' => $must]], 'weight' => $weight]];
    }

    //  규격 하나가 맞는 조건 (속성 방식) - 규격 칸에 같은 양의 글자("1l"이면 "1l" 또는 "1000ml"), 또는 속성 칸에 맞는 값
    protected static function specMatch(string $token): array {
        $should = array_map(fn($t) => ['term' => ['spec_all' => $t]], self::equivalents($token));
        if ($q = self::attrQuery($token))
            $should[] = $q;
        return ['bool' => ['should' => $should, 'minimum_should_match' => 1]];
    }

    //  규격 토큰 → [숫자, 단위, 종류] ("1l" → [1, 'l', 'volume'], "99%" → [99, '%', 'purity']) - 모르는 단위면 null
    protected static function parse(string $token): ?array {
        if (!preg_match('/^(\d+(?:\.\d+)?)([a-z%]+)$/', $token, $m))
            return null;
        foreach (self::UNIT_GROUPS as $group => $units)
            if (isset($units[$m[2]]))
                return [(float) $m[1], $m[2], $group];
        return $m[2] === '%' ? [(float) $m[1], '%', 'purity'] : null;
    }

    //  같은 양을 다른 단위로 쓴 토큰들 ("1l" → ["1l", "1000ml", "1000cc"], "500ml" → ["500ml", "500cc", "0.5l"])
    //  0.001l, 1000000ul 처럼 실제로 안 쓰는 표기는 뺌
    public static function equivalents(string $token): array {
        $out = [$token];
        if (!($p = self::parse($token)) || !isset(self::UNIT_GROUPS[$p[2]]))
            return $out;
        [$num, $unit, $group] = $p;
        foreach (self::UNIT_GROUPS[$group] as $u => $rate) {
            $v = $num * self::UNIT_GROUPS[$group][$unit] / $rate;
            if ($u === $unit || $v < 0.01 || $v > 100000 || abs(round($v, 3) - $v) > 1e-9)
                continue;
            $out[] = rtrim(rtrim(sprintf('%.3f', $v), '0'), '.') . $u;
        }
        return array_values(array_unique($out));
    }

    //  속성 칸 조건 (la_shop_goods_attr → attr_volume 등, search:extract-attrs --es)
    //  용량·시약 포장량: 같은 값 (범위 상품은 양 끝 값 - "20-200ul" 팁은 20ul·200ul에 맞음, GoodsAttr::esDocs)
    //  순도: 찾는 값부터 100%까지 남은 거리의 절반까지 ("99%" → 99~99.5%, "95%" → 95~97.5%) - 95% 에탄올과 99% 에탄올은 다른 상품
    public static function attrQuery(string $token): ?array {
        if (!$p = self::parse($token))
            return null;
        [$num, $unit, $group] = $p;
        if ($group === 'purity')
            return $num >= 50 && $num <= 100 ? ['range' => ['attr_purity' => ['gte' => $num, 'lte' => $num + (100 - $num) / 2, 'relation' => 'within']]] : null;
        if (!in_array($group, ['volume', 'pack_mass']))
            return null;
        return ['term' => ["attr_{$group}" => round($num * self::UNIT_GROUPS[$group][$unit], 6)]];
    }
}