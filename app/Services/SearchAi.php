<?php

namespace App\Services;

use Illuminate\Support\Facades\{DB, Http, Log, Redis};

//  AI 검색어·규격 통역 (AI 검색 2-2) - 모든 AI 호출은 이 파일 한 곳 (나중에 Python AI 서버로 바꿀 때 call()만 고침)
//  손님 검색은 수첩(la_search_ai)만 봄 - 없으면 대기 목록(la_search_ai_queue)에 넣고 지금 검색 그대로 (기다리지 않기)
//  1분마다 search:ai-fill이 대기 목록을 AI에 물어 수첩을 채움, 밤에 search:ai-prewarm이 인기 검색어를 미리 넣음
//  손님 검색에 쓰는 곳 (2-4): 결과가 적은 검색만 - 영문 자판 실수(qlzj→비커)·AI가 바꾼 말(메탄올→methanol)로 함께 찾아 보여줌
//  AI에는 검색어·규격 글자만 보냄 - 손님 정보(회원·IP·uuid)는 보내지 않음
class SearchAi {
    const PROMPT    = ['query' => 'query.v2', 'spec' => 'spec.v1'];     //  프롬프트를 고치면 올림 → 밤 작업이 검수 안 한 줄만 다시 물음
    const MAX_TRIES = 3;                                                 //  실패 3번이면 더 묻지 않음 (7일 뒤 밤 작업이 정리)
    const RETRY_MIN = [1 => 2, 2 => 30];                                 //  실패 n번째 → n분 뒤 다시
    const OUR_SIDE  = 2;                                                 //  예외 code - 키·잔액·요청 모양 문제 (어느 글자를 물어도 실패) → 바로 차단

    //  차단기 - 1분 안에 5번 실패하면 5분 동안 묻지 않음
    const FAIL_KEY = 'search_ai:fails', OPEN_KEY = 'search_ai:open', FAIL_MAX = 5, OPEN_SEC = 300;

    //  기준 단위 값의 정상 범위 - 벗어나면 버림 (순도는 50~100, 규칙 GoodsAttr::purity와 같음)
    const RANGE = ['ml' => [0.0001, 1e7], 'mg' => [0.00001, 1e9], 'mm' => [0.00001, 1e6], '%' => [50, 100], 'ea' => [1, 1e6]];
    const OPS   = ['=' => null, '>=' => '>=', '>' => '>', '<=' => '<=', '<' => '<', '~' => '~'];

    //  ───── 손님 검색 쪽 (빠르고, 어떤 오류도 검색을 막지 않음) ─────

    //  보정이 필요한지 판별하는 집계 - 손님 검색 본문에 함께 넣음 (검색 한 번 더 안 함, 스위치 꺼져 있으면 빈 배열)
    //  ai_base: 카테고리·제조사 거르기 전 결과 수 / ai_exact: 검색어 단어가 그대로(비슷한 글자 말고) 들어간 상품 수
    public static function aggs(string $keyword): array {
        if (!config('search.ai.fill', false) && !config('search.ai.boost', false))
            return [];
        return [
            'ai_base'  => ['filter' => ['match_all' => (object) []]],
            'ai_exact' => ['filter' => self::exactFilter($keyword)],
        ];
    }

    //  검색어 단어가 하나씩 상품명·모델명·키워드·제조사에 그대로 있는 조건 (비슷한 글자 말고) - 규격 토큰은 뺌
    protected static function exactFilter(string $keyword): array {
        $words = SearchSpec::wordsMatch(SearchSpec::without($keyword, SearchSpec::tokens($keyword, SearchSpec::makers())));
        return $words ? ['bool' => ['must' => $words]] : ['match_all' => (object) []];
    }

    //  약한 검색인지 - 결과가 적거나(search.ai.low 이하), 검색어가 그대로 들어간 상품이 없음 ("애펜 도르푸" → 비슷한 글자인 "다이아몬드 펜"만 잡힘)
    public static function weak(array $aggs): bool {
        return isset($aggs['ai_base'], $aggs['ai_exact'])
            && ($aggs['ai_base']['doc_count'] <= (int) config('search.ai.low', 3) || $aggs['ai_exact']['doc_count'] == 0);
    }

    //  약한 검색이면 함께 찾을 말 - ['q' => 바꾼 말, 'by' => keyboard|ai, 'first' => 바꾼 말 결과를 먼저 보여줄지]
    //  1. 영문 자판 실수 (qlzj → 비커, AI 없이 규칙)  2. AI 수첩의 바꾼 말 (없으면 대기 목록에 넣고 이번엔 그대로)
    public static function rescue(string $keyword, ?string $mode, int $page, array $aggs): ?array {
        if (!self::weak($aggs) || !self::askable($keyword, $mode))
            return null;
        if (config('search.ai.boost', false) && ($ko = self::keyboard($keyword)))
            return ['q' => $ko, 'by' => 'keyboard', 'first' => true];
        $alt = self::lookup($keyword, $mode, $page)['alts'][0] ?? null;
        if (!$alt)
            return null;
        //  바꾼 말 결과를 위로: 원래 결과가 비슷한 글자로만 잡힌 것 ("애펜 도르푸"), 또는 바꾼 말 상품이 10배 이상 많음 ("메탄올" 3건 → methanol 4,540건)
        $first = $aggs['ai_exact']['doc_count'] == 0 || ($alt['hits'] ?? 0) >= 10 * max(1, $aggs['ai_base']['doc_count']);
        return ['q' => $alt['q'], 'by' => 'ai', 'first' => $first];
    }

    //  검색어 하나가 약한 검색인지 ES에 물어봄 - 밤 미리 채우기용 (손님 검색은 본문 집계로 판별)
    public static function isWeak(string $keyword): bool {
        $es = new GoodsElasticSearch;
        $r  = $es->search([
            'size'  => 0,
            'query' => $es->buildQuery($keyword, null, GoodsElasticSearch::customerFilters(), GoodsElasticSearch::specFunctions($keyword)),
            'aggs'  => self::aggs($keyword) ?: ['ai_none' => ['filter' => ['match_all' => (object) []]]],
        ])->asArray();
        return self::weak($r['aggregations'] ?? []);
    }

    //  두 검색을 합침 - 앞 검색에 맞는 상품이 항상 위, 그 아래 뒤 검색 상품 (각 검색 안의 순서는 그대로)
    public static function combine(array $first, array $second): array {
        return ['bool' => ['should' => [
            $first,
            $second,
            ['constant_score' => ['filter' => $first, 'boost' => 1000000]],
        ], 'minimum_should_match' => 1]];
    }

    //  영문 자판으로 친 한글 되돌리기 ("qlzj" → "비커", "wjdnf" → "저울") - 영문 소문자·띄어쓰기만, 글자가 다 맞게 조립될 때만
    public static function keyboard(string $text): ?string {
        if (!preg_match('/^[a-z]+( [a-z]+)*$/', $text))
            return null;
        $key  = ['q'=>'ㅂ','w'=>'ㅈ','e'=>'ㄷ','r'=>'ㄱ','t'=>'ㅅ','y'=>'ㅛ','u'=>'ㅕ','i'=>'ㅑ','o'=>'ㅐ','p'=>'ㅔ','a'=>'ㅁ','s'=>'ㄴ','d'=>'ㅇ','f'=>'ㄹ','g'=>'ㅎ',
                 'h'=>'ㅗ','j'=>'ㅓ','k'=>'ㅏ','l'=>'ㅣ','z'=>'ㅋ','x'=>'ㅌ','c'=>'ㅊ','v'=>'ㅍ','b'=>'ㅠ','n'=>'ㅜ','m'=>'ㅡ'];
        $cho  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
        $jung = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
        $jong = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
        $vv   = ['ㅗㅏ'=>'ㅘ','ㅗㅐ'=>'ㅙ','ㅗㅣ'=>'ㅚ','ㅜㅓ'=>'ㅝ','ㅜㅔ'=>'ㅞ','ㅜㅣ'=>'ㅟ','ㅡㅣ'=>'ㅢ'];
        $cc   = ['ㄱㅅ'=>'ㄳ','ㄴㅈ'=>'ㄵ','ㄴㅎ'=>'ㄶ','ㄹㄱ'=>'ㄺ','ㄹㅁ'=>'ㄻ','ㄹㅂ'=>'ㄼ','ㄹㅅ'=>'ㄽ','ㄹㅌ'=>'ㄾ','ㄹㅍ'=>'ㄿ','ㄹㅎ'=>'ㅀ','ㅂㅅ'=>'ㅄ'];

        $words = [];
        foreach (explode(' ', $text) as $word) {
            $out = '';
            $c = $v = $t = '';      //  지금 조립 중인 글자의 초성·중성·종성
            $flush = function () use (&$c, &$v, &$t, &$out, $cho, $jung, $jong) {
                if ($c === '' || $v === '')
                    return false;       //  자음만·모음만 남음 = 한글 단어가 아님
                $out .= mb_chr(0xAC00 + (array_search($c, $cho) * 21 + array_search($v, $jung)) * 28 + array_search($t, $jong));
                $c = $v = $t = '';
                return true;
            };
            foreach (str_split($word) as $ch) {
                $j = $key[$ch];
                if (!in_array($j, $jung)) {                                         //  자음
                    if ($v === '') {
                        if ($c !== '') return null;
                        $c = $j;
                    } elseif ($t === '' && in_array($j, $jong))
                        $t = $j;
                    elseif ($t !== '' && isset($cc[$t . $j]))
                        $t = $cc[$t . $j];
                    else {
                        if (!$flush()) return null;
                        $c = $j;
                    }
                } elseif ($t !== '') {                                              //  모음 - 앞 글자 받침을 이번 글자 초성으로
                    $pair = array_search($t, $cc);
                    [$t, $next] = $pair !== false ? [mb_substr($pair, 0, 1), mb_substr($pair, 1, 1)] : ['', $t];
                    if (!$flush()) return null;
                    [$c, $v] = [$next, $j];
                } elseif ($v !== '' && isset($vv[$v . $j]))
                    $v = $vv[$v . $j];
                elseif ($v === '' && $c !== '')
                    $v = $j;
                else
                    return null;
            }
            if (!$flush())
                return null;
            $words[] = $out;
        }
        return implode(' ', $words);
    }

    //  수첩에 통역이 있으면 돌려줌 (BOOST 켜짐 + 쓸 만한 답 + 검수 틀림 아님), 없으면 대기 목록에 넣음 (FILL 켜짐 + 1페이지)
    public static function lookup(string $keyword, ?string $mode, int $page): ?array {
        $fill  = config('search.ai.fill', false);
        $boost = config('search.ai.boost', false);
        if ((!$fill && !$boost) || !self::askable($keyword, $mode))
            return null;
        try {
            $row = DB::table('search_ai')->where('sa_kind', 'query')->where('sa_hash', md5($keyword))->first(['sa_result', 'sa_status', 'sa_checked']);
            if (!$row) {
                if ($fill && $page === 1)
                    self::enqueue('query', $keyword, 'search');
                return null;
            }
            return $boost && $row->sa_status === 'ok' && $row->sa_checked !== 'X' ? json_decode((string) $row->sa_result, true) : null;
        } catch (\Throwable $e) {
            Log::warning('SearchAi::lookup 실패 (검색은 그대로): ' . $e->getMessage());
            return null;
        }
    }

    //  AI에 물어볼 만한 검색어인지 - 카탈로그번호·모델코드 검색, 너무 짧거나 긴 글자, "54fgb" 같은 코드 한 덩어리는 제외
    public static function askable(string $keyword, ?string $mode = null): bool {
        $len = mb_strlen($keyword);
        if (in_array($mode, ['cat_no', 'gm_code']) || $len < 2 || $len > 100 || !preg_match('/\p{L}/u', $keyword))
            return false;
        $code = !str_contains($keyword, ' ') && !preg_match('/[가-힣]/u', $keyword) && preg_match('/\d/', $keyword) && preg_match('/[a-z]/', $keyword);
        return !$code;
    }

    //  대기 목록에 넣기 - 같은 글자는 한 줄 (이미 있으면 무시), 넣었으면 true
    public static function enqueue(string $kind, string $text, string $from = 'manual'): bool {
        return DB::table('search_ai_queue')->insertOrIgnore([
            'sq_kind' => $kind,
            'sq_text' => mb_substr($text, 0, 500),
            'sq_hash' => md5($text),
            'sq_from' => $from,
        ]) > 0;
    }

    //  ───── AI 묻기 (1분 작업·비교 시험에서만 부름 - 손님 검색에서는 절대 부르지 않음) ─────

    //  글자 하나를 AI에 물어 검증까지 한 결과 - 실패면 \RuntimeException (code OUR_SIDE = 우리 쪽 문제)
    //  $model·$provider: 비교 시험용 (비우면 .env 설정)
    public static function ask(string $kind, string $text, ?string $model = null, ?string $provider = null): array {
        $provider = $provider ?? config('search.ai.provider', 'openai');
        $model    = $model ?? (string) config('search.ai.model', '');      //  설정이 없으면 '' → call()이 "모델 이름 없음"으로 알림
        $start    = microtime(true);

        [$raw, $tokIn, $tokOut] = self::call($provider, $model, self::system($kind), $text, self::schema($kind));

        $ans = json_decode($raw, true);
        if (!is_array($ans) || !isset($ans['attrs']) || !is_array($ans['attrs']))
            throw new \RuntimeException('답이 정해진 JSON 모양이 아님: ' . mb_substr($raw, 0, 100));

        [$result, $dropped] = self::validate($kind, $text, $ans);
        if ($kind === 'query')
            $result = ['alts' => self::checkAlts($text, (array) ($ans['alts'] ?? []), $dropped)] + $result;
        $kept =array_filter($result, fn($v) => $v !== [] && $v !== null);
        return [
            'result'  => $result,
            'raw'     => $raw,
            'dropped' => $dropped,
            'status'  => $kept ? 'ok' : ($dropped ? 'bad' : 'empty'),
            'model'   => $model,
            'prompt'  => self::PROMPT[$kind],
            'tok_in'  => $tokIn,
            'tok_out' => $tokOut,
            'ms'      => (int) round((microtime(true) - $start) * 1000),
        ];
    }

    //  수첩에 저장 - 사람이 검수한 줄(Y·X)은 덮어쓰지 않음 (false)
    public static function save(string $kind, string $text, array $a): bool {
        $hash = md5($text);
        $row  = [
            'sa_result'  => json_encode($a['result'], JSON_UNESCAPED_UNICODE),
            'sa_raw'     => $a['raw'],
            'sa_dropped' => $a['dropped'] ? mb_substr(implode(' / ', $a['dropped']), 0, 500) : null,
            'sa_status'  => $a['status'],
            'sa_model'   => mb_substr($a['model'], 0, 50),
            'sa_prompt'  => $a['prompt'],
            'sa_tok_in'  => $a['tok_in'],
            'sa_tok_out' => $a['tok_out'],
            'sa_ms'      => $a['ms'],
        ];
        $cur = DB::table('search_ai')->where('sa_kind', $kind)->where('sa_hash', $hash)->first(['sa_id', 'sa_checked']);
        if (!$cur)
            return DB::table('search_ai')->insertOrIgnore($row + ['sa_kind' => $kind, 'sa_text' => mb_substr($text, 0, 500), 'sa_hash' => $hash]) > 0;
        if ($cur->sa_checked !== 'N')
            return false;
        DB::table('search_ai')->where('sa_id', $cur->sa_id)->update($row);
        return true;
    }

    //  ───── 답 검증 - 사전에 없는 속성, 모르는 단위, 범위 밖 값, 검색어에 없는 숫자(지어낸 값)는 버림 ─────

    //  [결과, 버린 항목 이유 목록]
    public static function validate(string $kind, string $text, array $ans): array {
        $dropped = [];
        $result  = ['attrs' => []];

        if ($kind === 'query') {
            $result = ['maker' => null] + $result;
            $maker = mb_strtolower(trim((string) ($ans['maker'] ?? '')));
            if ($maker !== '') {
                if (in_array($maker, SearchSpec::makers(), true))
                    $result['maker'] = $maker;
                else
                    $dropped[] = "maker {$maker}: 제조사 목록에 없음";
            }
        }

        $nums = self::numbers($text);
        $seen = [];
        foreach ($ans['attrs'] as $a) {
            [$attr, $why] = self::attr((array) $a, $nums);
            $label = ($a['key'] ?? '?') . ' ' . ($a['value'] ?? '') . ($a['num'] ?? '') . (isset($a['max']) ? "-{$a['max']}" : '') . ($a['unit'] ?? '');
            if ($why)
                $dropped[] = "{$label}: {$why}";
            elseif (!isset($seen[$attr['key'] . '|' . $attr['value']])) {      //  같은 값 두 번이면 한 번만
                $seen[$attr['key'] . '|' . $attr['value']] = true;
                $result['attrs'][] = $attr;
            }
        }
        return [$result, $dropped];
    }

    //  바꾼 말 검증 - 우리 가게(ES)에서 그 말이 그대로 들어간 상품이 원래 검색어보다 많아야 씀
    //  비슷한 글자로 잡힌 개수는 안 셈 ("빙커" → "bunker"는 엉뚱한 상품만 비슷하게 잡히고 그대로 든 상품은 0개라 버려짐)
    //  [['q' => 'methanol', 'hits' => 그대로 든 상품 수], ...] AI가 준 순서 그대로
    protected static function checkAlts(string $text, array $alts, array &$dropped): array {
        $es    = new GoodsElasticSearch;
        $count = function (string $q) use ($es): int {
            try {
                $body = ['size' => 0, 'query' => $es->buildQuery($q, null, GoodsElasticSearch::customerFilters(), GoodsElasticSearch::specFunctions($q)),
                         'aggs' => ['exact' => ['filter' => self::exactFilter($q)]]];
                return (int) ($es->search($body)->asArray()['aggregations']['exact']['doc_count'] ?? 0);
            } catch (\Throwable $e) {
                throw new \RuntimeException('ES 확인 실패: ' . mb_substr($e->getMessage(), 0, 100));
            }
        };
        $base = $count($text);
        $out  = [];
        foreach (array_slice($alts, 0, 3) as $a) {
            $q = GoodsElasticSearch::keyword((string) $a);
            if ($q === '' || $q === $text || mb_strlen($q) > 60 || isset($out[$q]))
                continue;
            $n = $count($q);
            if ($n > $base)
                $out[$q] = ['q' => $q, 'hits' => $n];
            else
                $dropped[] = "alt {$q}: {$n}건 (원래 {$base}건보다 많지 않음)";
        }
        return array_values($out);
    }

    //  속성 하나 검증 →[['key','op','num','max','value'], null] 또는 [null, 버린 이유]
    protected static function attr(array $a, array $nums): array {
        $defs = GoodsAttr::defs();
        $key  = (string) ($a['key'] ?? '');
        if (!isset($defs[$key]))
            return [null, '사전에 없는 속성'];
        $def  = $defs[$key];
        $unit = SearchSpec::normalize(trim((string) ($a['unit'] ?? '')));

        //  단위 → 기준 단위 배수 (단위 표가 없는 속성은 기준 단위만: 순도 %, 입수 ea)
        if ($def['unit_map']) {
            if (!isset($def['unit_map'][$unit]))
                return [null, "모르는 단위 {$unit}"];
            $rate = (float) $def['unit_map'][$unit];
        } else {
            if ($unit !== '' && $unit !== (string) $def['unit'] && !($def['unit'] === 'ea' && preg_match('/^(개|pcs?|매|장|본|set|pk)$/u', $unit)))
                return [null, "모르는 단위 {$unit}"];
            $rate = 1.0;
        }

        //  글자 속성 - 측정법은 정해진 이름만, 치수는 "440x264x117"
        if ($def['type'] === 'text') {
            $value = trim((string) ($a['value'] ?? ''));
            if ($key === 'purity_method') {
                $m = GoodsAttr::METHODS[mb_strtolower($value)] ?? null;
                return $m ? [['key' => $key, 'op' => null, 'num' => null, 'max' => null, 'value' => $m], null] : [null, '모르는 측정법'];
            }
            $parts = preg_split('/\s*[x×*]\s*/u', mb_strtolower($value));
            if (count($parts) < 2 || count($parts) > 3)
                return [null, '치수 모양이 아님'];
            $out = [];
            foreach ($parts as $p) {
                if (!is_numeric($p))
                    return [null, '치수 모양이 아님'];
                if (!self::written((float) $p, $nums))
                    return [null, '글자에 없는 숫자'];
                $out[] = GoodsAttr::fmt(round((float) $p * $rate, 6));
            }
            return [['key' => $key, 'op' => null, 'num' => null, 'max' => null, 'value' => implode('x', $out) . $def['unit']], null];
        }

        //  숫자 속성 - 값(과 범위 끝)은 글자에 실제로 쓰인 숫자여야 함, 기준 단위로 바꾼 뒤 정상 범위 확인
        if (!is_numeric($a['num'] ?? null))
            return [null, '숫자 없음'];
        $num = (float) $a['num'];
        $max = is_numeric($a['max'] ?? null) ? (float) $a['max'] : null;
        if (!self::written($num, $nums) || ($max !== null && !self::written($max, $nums)))
            return [null, '글자에 없는 숫자'];
        $num = round($num * $rate, 6);
        $max = $max === null ? null : round($max * $rate, 6);
        if ($max !== null && $max < $num)
            [$num, $max] = [$max, $num];
        if ($max === $num)
            $max = null;

        $range = self::RANGE[$def['unit']] ?? null;
        if ($range && ($num < $range[0] || ($max ?? $num) > $range[1]))
            return [null, '범위 밖'];

        $op = array_key_exists($a['op'] ?? '=', self::OPS) ? self::OPS[$a['op'] ?? '='] : null;
        if ($max !== null)
            $op = null;     //  범위는 기호 없이
        $value = ($op ? GoodsAttr::OP_SIGN[$op] : '') . GoodsAttr::fmt($num) . ($max !== null ? '-' . GoodsAttr::fmt($max) : '') . $def['unit'];
        return [['key' => $key, 'op' => $op, 'num' => $num, 'max' => $max, 'value' => $value], null];
    }

    //  글자에 쓰인 숫자들 ("비커 1,000ml 2개" → [1000, 2])
    protected static function numbers(string $text): array {
        preg_match_all('/\d+(?:\.\d+)?/', SearchSpec::normalize($text), $m);
        return array_map('floatval', $m[0]);
    }

    protected static function written(float $n, array $nums): bool {
        foreach ($nums as $x)
            if (abs($x - $n) < 1e-9)
                return true;
        return false;
    }

    //  ───── 프롬프트·답 모양 ─────

    protected static function system(string $kind): string {
        $dict = [];
        foreach (GoodsAttr::defs() as $key => $d) {
            $units = $d['unit_map'] ? implode(', ', array_keys($d['unit_map'])) : (string) $d['unit'];
            $dict[] = "- {$key} ({$d['name']}, " . ($d['type'] === 'num' ? 'number' : 'text') . ($units !== '' ? ", units: {$units}" : '') . ')';
        }
        $dict    = implode("\n", $dict);
        $methods = implode(', ', array_unique(array_values(GoodsAttr::METHODS)));

        $attrRules = <<<TXT
attrs: measurable specs, using ONLY these keys:
{$dict}
Rules for attrs:
- Use only numbers that are literally written in the text. Never guess or convert a value; give the unit as written.
- op: "=" exact, ">=" ">" "<=" "<" for 이상/초과/이하/미만/min/max/≥/≤, "~" for 약/approx.
- A range such as "0.5-5ml" or "20~200ul" → num = low end, max = high end. Otherwise max = null.
- purity = % purity/assay of a chemical (50~100). A % meaning solution concentration (e.g. "35% 염산", "30% 과산화수소 용액", "70% 소독용 에탄올"), humidity, efficiency or tolerance is NOT purity → leave it out.
- purity_method = the method in parentheses after purity, one of: {$methods}.
- outer_size / inner_size: value = "WxDxH" numbers only (e.g. "440x264x117"), num = null.
- Molarity/normality (1M, 0.1N), temperatures, speeds (rpm), flow rates (ml/min) and concentrations (mg/ml) are not attrs.
- If nothing applies, return an empty list.
TXT;

        if ($kind === 'spec')
            return <<<TXT
You read the spec text of ONE product model from a Korean online store for laboratory equipment and reagents.
Return JSON only.
{$attrRules}
- Only facts about this product itself. If two different values could apply and it is unclear which, leave them out.
TXT;

        return <<<TXT
You help the search box of a Korean online store for laboratory and scientific equipment, consumables and chemicals.
Product names in the catalog are mostly English or mixed Korean/English, e.g. "Methanol, HPLC grade", "Isopropyl alcohol", "비이커 (Glass)", "Eppendorf Research plus", "클린룸용 방진복".
The shopper's query found few or only loosely related products. Figure out what the shopper wants.
Return JSON only.
alts: up to 3 alternative search queries that would find it in such a catalog, best first. Use your knowledge of lab products, brands and chemicals:
- fix typos and phonetic or Korean spellings of names (e.g. "애펜 도르푸" → "eppendorf", "빙커" → "비커", "seive" → "sieve", "킴와입스" → "킴테크")
- Korean chemical/technical names → the English name used in product names (e.g. "메탄올" → "methanol", "이소프로필알코올" → "isopropyl alcohol", "클로로포름" → "chloroform")
- other common names of the same product (e.g. "쿼츠" → "석영", "막자사발" → "mortar", "스톱워치" → "타이머", "공병" → "시약병")
- a situation or purpose → the product to buy (e.g. "클린룸 출입 복장" → "방진복")
- keep size/spec numbers from the query (e.g. "메탄올 4l" → "methanol 4l"); 1–4 words each; never repeat the query itself
- if you cannot tell what the shopper wants, return an empty list
maker: the brand/manufacturer named in the query, in its usual written form (e.g. "3m 장갑" → "3m", "애펜도르프 팁" → "eppendorf"), else null.
{$attrRules}
TXT;
    }

    //  정해진 답 모양 (OpenAI strict json_schema·Claude output_config 공용 - 모든 칸 required, null 허용은 anyOf)
    protected static function schema(string $kind): array {
        $nullable = fn(string $type) => ['anyOf' => [['type' => $type], ['type' => 'null']]];
        $attr = [
            'type'                 => 'object',
            'additionalProperties' => false,
            'required'             => ['key', 'op', 'num', 'max', 'unit', 'value'],
            'properties'           => [
                'key'   => ['type' => 'string', 'enum' => array_keys(GoodsAttr::defs())],
                'op'    => ['type' => 'string', 'enum' => array_keys(self::OPS)],
                'num'   => $nullable('number'),
                'max'   => $nullable('number'),
                'unit'  => $nullable('string'),
                'value' => $nullable('string'),
            ],
        ];
        $props = ['attrs' => ['type' => 'array', 'items' => $attr]];
        if ($kind === 'query')
            $props = ['alts' => ['type' => 'array', 'items' => ['type' => 'string']], 'maker' => $nullable('string')] + $props;
        return ['type' => 'object', 'additionalProperties' => false, 'required' => array_keys($props), 'properties' => $props];
    }

    //  ───── AI 호출 (OpenAI / Claude) - [답 JSON 글자, 보낸 토큰, 받은 토큰] ─────

    protected static function call(string $provider, string $model, string $system, string $text, array $schema): array {
        if (!$model)
            throw new \RuntimeException('모델 이름 없음 (SEARCH_AI_MODEL)', self::OUR_SIDE);
        $key = config("search.ai.keys.{$provider}");
        if (!$key)
            throw new \RuntimeException("{$provider} API 키 없음", self::OUR_SIDE);
        $http = Http::timeout((int) config('search.ai.timeout', 30));

        try {
            if ($provider === 'anthropic') {
                $res = $http->withHeaders(['x-api-key' => $key, 'anthropic-version' => '2023-06-01'])
                    ->post('https://api.anthropic.com/v1/messages', [
                        'model'         => $model,
                        'max_tokens'    => 1024,
                        'system'        => $system,
                        'messages'      => [['role' => 'user', 'content' => $text]],
                        'output_config' => ['format' => ['type' => 'json_schema', 'schema' => $schema]],
                    ]);
                self::checkHttp($res);
                $j = $res->json();
                if (($j['stop_reason'] ?? '') !== 'end_turn')
                    throw new \RuntimeException('답이 끝나지 않음: ' . ($j['stop_reason'] ?? '?'));
                $out = implode('', array_column(array_filter($j['content'] ?? [], fn($b) => ($b['type'] ?? '') === 'text'), 'text'));
                return [$out, (int) ($j['usage']['input_tokens'] ?? 0), (int) ($j['usage']['output_tokens'] ?? 0)];
            }

            $body = [
                'model'                 => $model,
                'messages'              => [['role' => 'system', 'content' => $system], ['role' => 'user', 'content' => $text]],
                'response_format'       => ['type' => 'json_schema', 'json_schema' => ['name' => 'search_ai', 'strict' => true, 'schema' => $schema]],
                'max_completion_tokens' => 2000,        //  생각하는 모델은 생각 토큰도 여기 포함
            ];
            if (($t = config('search.ai.temperature')) !== null && $t !== '')
                $body['temperature'] = (float) $t;      //  생각하는 모델은 temperature를 받지 않음 - 비워 두면 안 보냄
            $res = $http->withToken($key)->post('https://api.openai.com/v1/chat/completions', $body);
            self::checkHttp($res);
            $j   = $res->json();
            $msg = $j['choices'][0]['message'] ?? [];
            if (!empty($msg['refusal']) || ($j['choices'][0]['finish_reason'] ?? '') !== 'stop')
                throw new \RuntimeException('답이 끝나지 않음: ' . ($msg['refusal'] ?? $j['choices'][0]['finish_reason'] ?? '?'));
            return [(string) ($msg['content'] ?? ''), (int) ($j['usage']['prompt_tokens'] ?? 0), (int) ($j['usage']['completion_tokens'] ?? 0)];
        } catch (\RuntimeException $e) {
            throw $e;
        } catch (\Throwable $e) {      //  연결 안 됨·시간 초과
            throw new \RuntimeException('연결 실패: ' . mb_substr($e->getMessage(), 0, 150));
        }
    }

    //  HTTP 오류 나누기 - 400·401·403·404·잔액 부족 = 우리 쪽 문제 (키·모델 이름·요청 모양) / 429 속도 제한·5xx = 잠시 뒤 다시
    protected static function checkHttp($res): void {
        if ($res->successful())
            return;
        $s    = $res->status();
        $body = mb_substr($res->body(), 0, 150);
        $ours = in_array($s, [400, 401, 403, 404])
             || ($s === 429 && str_contains($res->body(), 'insufficient_quota'));
        throw new \RuntimeException("HTTP {$s}: {$body}", $ours ? self::OUR_SIDE : 0);
    }

    //  ───── 차단기·하루 상한 (Redis) ─────

    public static function blocked(): ?string {
        $v = Redis::get(self::OPEN_KEY);
        return $v === null || $v === false ? null : (string) $v;
    }

    public static function succeeded(): void {
        Redis::del(self::FAIL_KEY);
    }

    //  실패 기록 - 우리 쪽 문제면 바로, 아니면 1분 안에 5번째에 차단 (차단했으면 true)
    public static function failed(\RuntimeException $e): bool {
        $n = Redis::incr(self::FAIL_KEY);
        if ($n == 1)
            Redis::expire(self::FAIL_KEY, 60);
        if ($e->getCode() !== self::OUR_SIDE && $n < self::FAIL_MAX)
            return false;

        Redis::setex(self::OPEN_KEY, self::OPEN_SEC, mb_substr($e->getMessage(), 0, 200));
        Redis::del(self::FAIL_KEY);
        self::alert('AI 호출 5분 중단 (' . ($e->getCode() === self::OUR_SIDE ? '키·잔액·요청 문제' : '연속 실패') . '): ' . $e->getMessage());
        return true;
    }

    //  오늘 호출 수 +1 - 상한을 넘으면 false
    public static function countCall(): bool {
        $key = 'search_ai:calls:' . date('Ymd');
        $n   = Redis::incr($key);
        if ($n == 1)
            Redis::expire($key, 172800);
        $limit = (int) config('search.ai.daily_limit', 3000);
        if ($n <= $limit)
            return true;
        if ($n == $limit + 1)
            self::alert("하루 호출 상한 {$limit}회 도달 - 내일까지 멈춤 (SEARCH_AI_DAILY_LIMIT)");
        return false;
    }

    //  문제 알림 - 상세 로그엔 매번, 작업 기록 표(schedule_logs)엔 1시간에 한 번만
    protected static function alert(string $msg): void {
        if (Redis::exists('search_ai:alerted')) {
            Log::channel('search-ai-detail')->warning("search:ai-fill - {$msg}");
            return;
        }
        Redis::setex('search_ai:alerted', 3600, 1);
        Log::channel('search-ai')->warning("search:ai-fill - {$msg}");       //  상세 로그 + 작업 기록 표
    }
}
