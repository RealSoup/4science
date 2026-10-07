<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

//  상품 속성 뽑기 (AI 검색 2단계) - 모델 규격 글자에서 "용량 500ml" "순도 ≥99.5% (HPLC)" 같은 값을 규칙으로 뽑아 la_shop_goods_attr에 저장
//  규칙으로 채운 줄(rule + 검수 안 함)만 지우고 다시 넣음 - 사람이 고치거나 검수한 속성(manual, 검수 Y/X)은 건드리지 않음
class GoodsAttr {
    const RULE = 'v1';          //  규칙 버전 - 규칙을 고치면 올림 (ga_rule = volume.v1)

    const OPS = ['≥' => '>=', '>=' => '>=', '>' => '>', '≤' => '<=', '<=' => '<=', '<' => '<', '~' => '~', '약' => '~', 'min' => '>=', 'max' => '<='];
    const OP_SIGN = ['>=' => '≥', '>' => '>', '<=' => '≤', '<' => '<', '~' => '~'];

    //  순도 뒤 괄호 = 측정법 ("98% (HPLC)"의 HPLC는 등급이 아니라 측정 방법)
    const METHODS = ['hplc' => 'HPLC', 'gc' => 'GC', 'tlc' => 'TLC', 'nt' => 'NT', 't' => 'T', 'at' => 'AT', 'ce' => 'CE', 'hpce' => 'HPCE',
                     'nmr' => 'NMR', 'qnmr' => 'qNMR', 'titration' => 'titration', 'sds-page' => 'SDS-PAGE', 'lc' => 'LC', 'gc/lc' => 'GC/LC'];

    const NUM = '\d+(?:\.\d+)?';

    //  규칙으로 뽑지 않는 카탈로그 번호 앞자리 - 40 = Merck(Sigma-Aldrich): 엑셀 정리본으로 새로 등록 예정
    const SKIP_CATNO01 = ['40'];

    protected static $defs, $labels;

    //  속성 사전 (사용 중인 것만) - ad_key => [name, type, unit, unit_map, min_conf]
    public static function defs(): array {
        if (self::$defs === null) {
            self::$defs = self::$labels = [];
            foreach (DB::table('shop_goods_attr_def')->where('ad_enable', 'Y')->get() as $d) {
                self::$defs[$d->ad_key] = [
                    'name'     => $d->ad_name,
                    'type'     => $d->ad_type,
                    'unit'     => $d->ad_unit,
                    'unit_map' => json_decode((string) $d->ad_unit_map, true) ?: [],
                    'min_conf' => (float) $d->ad_min_conf,
                ];
                foreach (json_decode((string) $d->ad_labels, true) ?: [] as $l)       //  이름표 → 속성 키 ("교반 용량" → volume)
                    self::$labels[self::labelKey($l)] = $d->ad_key;
            }
        }
        return self::$defs;
    }

    //  상품 번호 범위의 속성을 다시 뽑아 저장 - $dry면 저장 없이 뽑은 줄만 돌려줌
    public static function sync(int $fromId, int $toId, bool $dry = false): array {
        $models = DB::table('shop_goods_model as m')
            ->join('shop_goods as g', 'g.gd_id', '=', 'm.gm_gd_id')
            ->whereBetween('m.gm_gd_id', [$fromId, $toId])
            ->whereNull('m.deleted_at')->whereNull('g.deleted_at')
            ->whereNotIn('m.gm_catno01', self::SKIP_CATNO01)
            ->get(['m.gm_id', 'm.gm_gd_id', 'm.gm_name', 'm.gm_spec']);

        //  사람이 손댄 속성 - 이 모델·속성은 규칙으로 다시 넣지 않음
        $keep = DB::table('shop_goods_attr')->whereBetween('ga_gd_id', [$fromId, $toId])
            ->where(fn($q) => $q->where('ga_source', '<>', 'rule')->orWhere('ga_checked', '<>', 'N'))
            ->get(['ga_gm_id', 'ga_key'])
            ->mapWithKeys(fn($r) => ["{$r->ga_gm_id}|{$r->ga_key}" => true])->all();

        $rows = [];
        foreach ($models as $m) {
            foreach (self::extract((string) $m->gm_name, (string) $m->gm_spec) as $r) {
                if (isset($keep["{$m->gm_id}|{$r['ga_key']}"]))
                    continue;
                $rows[] = ['ga_gd_id' => $m->gm_gd_id, 'ga_gm_id' => $m->gm_id] + $r;
            }
        }

        if (!$dry) {
            DB::transaction(function () use ($fromId, $toId, $rows) {
                DB::table('shop_goods_attr')->whereBetween('ga_gd_id', [$fromId, $toId])
                    ->where('ga_source', 'rule')->where('ga_checked', 'N')->delete();
                foreach (array_chunk($rows, 1000) as $chunk)
                    DB::table('shop_goods_attr')->insertOrIgnore($chunk);
            });
        }
        return $rows;
    }
    
    //  상품 하나 다시 뽑기 - 관리자 상품 등록·수정 후 색인 갱신 직전에 부름 (속성 칸이 켜진 경우만)
    //  실패해도 상품 저장은 막지 않음 (밤 배치 search:extract-attrs --es가 다시 채움)
    public static function refresh(int $gdId): void {
        if (!GoodsElasticSearch::hasAttr())
            return;
        try {
            self::sync($gdId, $gdId);
        } catch (\Throwable $e) {
            \Log::error("상품 속성 뽑기 실패 ({$gdId}번 상품): " . $e->getMessage());
        }
    }

    //  검색 색인 칸 구조 - 숫자 속성은 attr_volume 등 (float_range - 값 하나도 [n, n] 범위로), 글자 속성은 keyword
    public static function esMapping(): array {
        $props = [];
        foreach (self::defs() as $key => $def)
            $props["attr_{$key}"] = ['type' => $def['type'] === 'num' ? 'float_range' : 'keyword'];
        return $props;
    }

    //  상품별 색인 값 [gd_id => [attr_volume => [[gte, lte], ...], ...]] - 속성이 없는 상품도 빈 칸으로 (지난 값 지우기)
    //  검색에 쓰는 줄 = 검수에서 맞음, 또는 검수 전이면서 신뢰도가 기준(ad_min_conf) 이상 - 틀림(X)·애매한 줄은 안 씀
    public static function esDocs(array $gdIds): array {
        $defs  = self::defs();
        $empty = array_fill_keys(array_map(fn($key) => "attr_{$key}", array_keys($defs)), []);
        $docs  = array_fill_keys($gdIds, $empty);

        $rows = DB::table('shop_goods_attr')->whereIn('ga_gd_id', $gdIds)->where('ga_checked', '<>', 'X')
            ->get(['ga_gd_id', 'ga_key', 'ga_value', 'ga_num', 'ga_num_max', 'ga_conf', 'ga_checked']);
        foreach ($rows as $r) {
            $def = $defs[$r->ga_key] ?? null;
            if (!$def || ($r->ga_checked === 'N' && $r->ga_conf < $def['min_conf']))
                continue;
            //  숫자 범위 "0.5-5ml"(가변 피펫)는 양 끝 값만 - 안쪽 값까지 맞추면 "1.5ml" 검색에 피펫이 마이크로튜브보다 위로 올라옴
            if ($def['type'] === 'num') {
                if ($r->ga_num === null)
                    continue;
                $vals = array_map(fn($n) => ['gte' => $n, 'lte' => $n], array_unique([(float) $r->ga_num, (float) ($r->ga_num_max ?? $r->ga_num)]));
            } else {
                $vals = [$r->ga_value];
            }
            $field = "attr_{$r->ga_key}";
            foreach ($vals as $v)
                if (!in_array($v, $docs[$r->ga_gd_id][$field]))     //  같은 상품의 여러 모델이 같은 값이면 한 번만
                    $docs[$r->ga_gd_id][$field][] = $v;
        }
        return $docs;
    }

    //  모델 하나의 속성 줄 목록 (규격 칸 먼저, 없으면 모델명)
    public static function extract(string $name, string $spec): array {
        $defs = self::defs();
        $out  = [];
        $add  = function (string $key, string $from, string $raw, array $vals) use (&$out, $defs) {
            if (!isset($defs[$key]))
                return;
            $seq = 1;
            foreach ($out as $o)
                if ($o['ga_key'] === $key) $seq++;
            foreach ($vals as $v)
                $out[] = [
                    'ga_key'     => $key,
                    'ga_seq'     => $seq++,
                    'ga_from'    => $from,
                    'ga_raw'     => mb_substr(trim($raw), 0, 200),
                    'ga_value'   => mb_substr($v['value'], 0, 100),
                    'ga_num'     => $v['num'] ?? null,
                    'ga_num_max' => $v['max'] ?? null,
                    'ga_op'      => $v['op'] ?? null,
                    'ga_unit'    => $defs[$key]['unit'],
                    'ga_source'  => 'rule',
                    'ga_rule'    => "{$key}." . self::RULE,
                    'ga_conf'    => $v['conf'],
                ];
        };

        $s = SearchSpec::normalize($spec);
        $n = SearchSpec::normalize($name);

        //  1. 이름표 붙은 규격 "용량(ml) : 500 / 외치수(mm) : 440x264x117"
        foreach (self::labeled($s) as $key => $vals)
            $add($key, 'gm_spec', $spec, $vals);
        $has = fn($key) => in_array($key, array_column($out, 'ga_key'));

        //  2. 용량 "500ml" "1-200ul" "3lit."
        if (!$has('volume')) {
            if ($v = self::volume($s, 0.95))     $add('volume', 'gm_spec', $spec, $v);
            elseif ($v = self::volume($n, 0.85)) $add('volume', 'gm_name', $name, $v);
        }

        //  3. 순도 "≥98% (HPLC)" + 측정법
        if (!$has('purity')) {
            [$v, $mt] = self::purity($s, 0.9);
            $from = 'gm_spec';
            if (!$v) {
                [$v, $mt] = self::purity($n, 0.85);
                $from = 'gm_name';
            }
            if ($v) {
                $add('purity', $from, $from === 'gm_spec' ? $spec : $name, $v);
                if ($mt) $add('purity_method', $from, $from === 'gm_spec' ? $spec : $name, $mt);
            }
        }

        //  4. 시약 포장량 - 규격이 "100mg" 이거나 "5g, Oleic Acid Coated" 처럼 무게로 시작
        if (preg_match('/^\s*(' . self::NUM . ')\s*(ug|mg|g|kg)\s*($|[,\/;])/u', $s, $m)) {
            $num = self::toBase('pack_mass', (float) $m[1], $m[2]);
            if ($num !== null)
                $add('pack_mass', 'gm_spec', $spec, [['value' => self::fmt($num) . 'mg', 'num' => $num, 'conf' => $m[3] === '' ? 0.95 : 0.85]]);
        }

        return $out;
    }

    //  이름표 규격 - 이름표가 사전 ad_labels에 있을 때만, 값이 숫자로 깔끔하게 읽힐 때만
    protected static function labeled(string $s): array {
        self::defs();
        $res = [];
        preg_match_all('/([가-힣a-z][가-힣a-z .]*?)\s*(?:\(([^)]{0,10})\))?\s*[:：]\s*([^\/:：|]+)/u', $s, $mm, PREG_SET_ORDER);
        foreach ($mm as [, $label, $paren, $val]) {
            if (!$key = self::$labels[self::labelKey($label)] ?? null)
                continue;
            $def  = self::$defs[$key];
            $unit = preg_replace('/[^a-z]/', '', $paren);                   //  "(φmm)" → mm
            $val  = trim(str_replace(['×', '＊', '*'], 'x', $val));

            if ($def['type'] === 'text') {                                  //  치수 "440x264x117" → "440x264x117mm"
                if (!preg_match('/^(' . self::NUM . '(?:\s*x\s*' . self::NUM . '){1,2})\s*([a-z]*)$/u', $val, $m))
                    continue;
                $unit = $unit ?: $m[2];
                $conf = $unit ? 0.9 : 0.75;                                 //  단위가 없으면 기준 단위로 보고 검수
                $nums = array_map(fn($x) => self::toBase($key, (float) $x, $unit ?: $def['unit']), preg_split('/\s*x\s*/', $m[1]));
                if (in_array(null, $nums, true))
                    continue;
                $res[$key][] = ['value' => implode('x', array_map([self::class, 'fmt'], $nums)) . $def['unit'], 'conf' => $conf];
                continue;
            }

            //  숫자 하나 또는 범위 "200 ~ 2500", 앞에 "약" "~" "≥"
            if (!preg_match('/^((?:(?:≥|>=|>|≤|<=|<|~|약|min|max)\.?\s*)*)(' . self::NUM . ')(?:\s*[~-]\s*(' . self::NUM . '))?\s*([a-z가-힣]*)$/u', $val, $m))
                continue;
            $unit = $unit ?: $m[4];
            if (!$unit && $def['unit_map'])                                 //  ml·mm 같은 단위가 필요한 속성인데 단위가 없음
                continue;
            if (!$def['unit_map'] && $unit && !preg_match('/^(ea|개|pcs?|매|장|본|set|pk)$/u', $unit))     //  입수 "1m"은 개수가 아님
                continue;
            $num = self::toBase($key, (float) $m[2], $unit ?: (string) $def['unit']);
            $max = isset($m[3]) && $m[3] !== '' ? self::toBase($key, (float) $m[3], $unit ?: (string) $def['unit']) : null;
            if ($num === null)
                continue;
            $op = self::op($m[1]);
            $res[$key][] = ['value' => self::value($num, $max, $op, $def['unit']), 'num' => $num, 'max' => $max, 'op' => $op, 'conf' => $max === null ? 0.95 : 0.9];
        }
        return $res;
    }

    //  용량 - "10ml/min" 같은 유량, "mg/ml" 같은 농도, "±0.4ml" 같은 허용오차는 제외
    //  "316L"(스테인리스 강종) "clone 9L4U5"(항체 이름)의 L은 리터가 아님
    protected static function volume(string $t, float $conf): array {
        preg_match_all('/(?<![\w.\/±-])(?<!± )(' . self::NUM . ')(?:\s*[-~]\s*(' . self::NUM . '))?\s*(ml|ul|cc|liter|litre|lit\.?|gal|l)(?![a-z0-9\/])/u', $t, $mm, PREG_SET_ORDER | PREG_OFFSET_CAPTURE);
        $vals = [];
        foreach ($mm as $m) {
            $before = substr($t, max(0, $m[0][1] - 12), min(12, $m[0][1]));
            $after  = substr($t, $m[0][1] + strlen($m[0][0]), 6);
            if ($m[3][0] === 'l' && (preg_match('/^(201|202|301|302|303|304|309|310|316|317|321|347|410|420|430|440)$/', $m[1][0])
                                     || preg_match('/(aisi|sus|sts|ss|type|grade|clone)\s*$/', $before)
                                     || preg_match('/[x×*]\s*$/u', $before) || preg_match('/^\s*[x×*]/u', $after)))     //  "2200L x 760W" 치수의 L(길이)
                continue;
            $m    = array_column($m, 0);
            $unit = str_starts_with($m[3], 'lit') ? 'l' : $m[3];
            $num  = self::toBase('volume', (float) $m[1], $unit);
            $max  = isset($m[2]) && $m[2] !== '' ? self::toBase('volume', (float) $m[2], $unit) : null;
            if (!$num && !$max)
                continue;
            $v = self::value($num, $max, null, 'ml');
            $vals[$v] = ['value' => $v, 'num' => $num, 'max' => $max, 'conf' => $max === null ? $conf : $conf - 0.1];
        }
        return self::single($vals);
    }

    //  순도 % (50~100) - "25% in water"(농도) "99 atom % D"(동위원소) "ee: 99%"(광학 순도) "±0.5%"(정확도) "95% rh"(습도)는 제외
    protected static function purity(string $t, float $conf): array {
        preg_match_all('/((?:≥|>=|>|≤|<=|<|~|약|min\.?|max\.?)\s*)?(' . self::NUM . ')\s*%(\s*\(\s*([a-z][a-z\/-]{0,10})\s*\))?/u', $t, $mm, PREG_SET_ORDER | PREG_OFFSET_CAPTURE);
        $vals = $methods = [];
        foreach ($mm as $m) {
            $num    = (float) $m[2][0];
            $before = substr($t, max(0, $m[0][1] - 12), min(12, $m[0][1]));
            $after  = substr($t, $m[0][1] + strlen($m[0][0]), 12);
            if ($num < 50 || $num > 100
                || preg_match('/(atom|wt\.?|±|\+\/-|ee\s*:?|정확도|accuracy|습도|humidity|효율|efficiency)\s*$/u', $before)
                || preg_match('/^\s*(in\b|w\/|v\/|wt|aq|solution|sol\b|ee\b|de\b|rh\b|off\b|이상\s*습)/u', $after))
                continue;
            $op     = self::op($m[1][0] ?? '');
            $method = self::METHODS[$m[4][0] ?? ''] ?? null;
            $v      = self::value($num, null, $op, '%');
            $vals[$v] = ['value' => $v, 'num' => $num, 'op' => $op, 'conf' => ($op || $method) ? $conf + 0.05 : $conf];
            if ($method)
                $methods[$method] = ['value' => $method, 'conf' => $conf + 0.05];
        }
        return [self::single($vals), count($vals) > 1 ? self::single($methods) : array_values($methods)];     //  같은 순도를 여러 방법으로 잰 건 정상
    }

    //  값이 여러 개면 어느 게 맞는지 모름 → 신뢰도 낮춰 검수로
    protected static function single(array $vals): array {
        if (count($vals) > 1)
            foreach ($vals as &$v) $v['conf'] = 0.6;
        return array_values($vals);
    }

    //  기준 단위로 바꾸기 (사전 ad_unit_map) - 모르는 단위면 null
    protected static function toBase(string $key, float $num, string $unit): ?float {
        $def = self::$defs[$key];
        if (!$def['unit_map'])
            return $num;
        $rate = $def['unit_map'][$unit] ?? null;
        return $rate === null ? null : round($num * $rate, 6);
    }

    protected static function op(string $s): ?string {
        $s = trim(str_replace('.', '', $s));
        foreach (self::OPS as $k => $op)
            if ($s !== '' && str_starts_with($s, $k)) return $op;
        return null;
    }

    protected static function value(?float $num, ?float $max, ?string $op, ?string $unit): string {
        return ($op ? self::OP_SIGN[$op] : '') . self::fmt($num) . ($max !== null ? '-' . self::fmt($max) : '') . $unit;
    }

    public static function fmt(?float $n): string {
        return $n === null ? '' : rtrim(rtrim(sprintf('%.6f', $n), '0'), '.');
    }

    protected static function labelKey(string $l): string {
        return preg_replace('/\s+/u', '', mb_strtolower(trim($l)));
    }
}