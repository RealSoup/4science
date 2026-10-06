<?php

namespace App\Services;

use Illuminate\Support\Facades\{DB, Redis};

//  규격 표기 정리 (AI 검색) - 검색어·상품 규격을 같은 모양으로 맞춰 비교
//  "500 mL" "500㎖" → "500ml" / "1,000ml" → "1000ml" / 6인치·6" → "6inch"
class SearchSpec {
    const UNITS = 'ml|l|ul|cc|mg|g|kg|ug|mm|cm|m|um|nm|mesh|inch|%';

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
    public static function functions(string $keyword, int $weight): array {
        $specs = self::tokens($keyword, self::makers());
        if (!$specs || $weight <= 0)
            return [];

        $must = array_map(fn($s) => ['term' => ['spec_all' => $s]], $specs);
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
}