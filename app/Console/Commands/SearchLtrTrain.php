<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Process\Process;
use App\Services\{GoodsElasticSearch, SearchLtr, SearchLtrModel, SearchRank};

//  검색 순서 학습 숙제 (AI 검색 2-5 ②) - 매주 일요일 새벽, 서버가 아니라 한 번 돌고 끝나는 숙제
//  ① 문제 만들기 (PHP): 손님 × 검색어 × 날 = 문제 1개 - 그 손님이 목록에서 본 상품과 고른 점수 (결제 3 / 장바구니·견적 2 / 클릭 1 / 안 고름 0)
//     교재 = 시험지 전 최대 90일, 시험지 = 지난 7일 (교재에 안 씀) / 재료는 SearchLtr (손님 검색과 같은 코드)
//     한 손님이 같은 검색어로 여러 날 찾았으면 그 문제들 무게를 나눠 합이 1 (한 사람 1표)
//     답 베끼기 방지: 자리 보정 점수 재료는 문제가 속한 주가 시작되기 전 기록으로만 다시 계산 (SearchRank::build)
//  ② 학습·채점 (파이썬): python/ltr/train.py → model_new.json(새 모델), report.json(채점표), check.csv(PHP 계산 맞춰 볼 정답지)
//  ③ 합격 판정 (PHP): 지금 쓰는 순서(지금 모델, 없으면 ES 순서)보다 나을 때만 교체 / 지금 모델이 ES 순서보다 못하면 내림
//  모델을 손님 검색에 쓸지는 .env SEARCH_LTR (끄면 바로 ES 순서) / 파일은 storage/app/ltr, 결과는 schedule_logs + storage/logs/scheduler/search-ltr
class SearchLtrTrain extends Command {
    protected $signature   = 'search:ltr-train
                                {--until= : 이 날 0시를 기준으로 (기본 오늘 0시) - 시험지 = 그 전 7일, 교재 = 그 전 최대 90일}
                                {--dry-run : 학습·채점까지만 하고 모델은 바꾸지 않음}';
    protected $description = '검색 순서 학습 (AI 검색 2-5 ②) - 지난 기록으로 XGBoost 학습 → 지난주 기록으로 모의고사 → 통과하면 모델 교체';

    const EXAM_DAYS  = 7;
    const MIN_TRAIN  = 300;     //  교재 문제가 이보다 적으면 이번 주는 건너뜀
    const MIN_EXAM   = 200;     //  시험 문제가 이보다 적으면 채점을 믿기 어려워 건너뜀
    const PASS_GAIN  = 1.01;    //  주 점수(자리 덕 보정 채점)가 지금 순서보다 1% 이상 높아야 합격
    const PASS_PLAIN = 0.99;    //  그냥 채점이 지금 순서보다 1% 넘게 낮으면 불합격 (지금 모델이 ES 순서보다 이만큼 못하면 내림)
    const WORSE_GAP  = 0.1;     //  많이 찾는 검색어 30개 중 점수가 0.1 넘게 떨어진 검색어가
    const MAX_WORSE  = 3;       //  3개보다 많으면 불합격 (평균은 좋아져도 "비커"가 망가지면 안 됨)
    const MATCH_TOL  = 1e-3;    //  PHP 계산과 파이썬 계산 차이 허용 (float 계산 순서 차이만큼)

    public function handle() {
        ini_set('memory_limit', '2G');
        $until = $this->option('until') ? Carbon::parse($this->option('until'))->startOfDay() : today();
        $dir   = SearchLtrModel::path('work');
        $label = 'search:ltr-train ' . $until->copy()->subDay()->format('m/d') . '까지';

        try {
            if (!is_dir($dir))
                mkdir($dir, 0755, true);
            foreach (glob("{$dir}/*") as $f)
                unlink($f);

            //  ① 문제 만들기
            $this->info("① 문제 만들기 ({$until->copy()->subDays(SearchRank::DAYS)->toDateString()} ~ {$until->copy()->subDay()->toDateString()})");
            $s = $this->export($until, $dir);
            $size = "교재 {$s['train']}문제({$s['train_rows']}줄)·시험지 {$s['exam']}문제({$s['exam_rows']}줄), 검색어 {$s['keywords']}개";
            $this->line("   {$size}");
            if ($s['train'] < self::MIN_TRAIN || $s['exam'] < self::MIN_EXAM) {
                $msg = "{$label} - {$size} → 기록이 아직 적어 이번 주는 건너뜀 (교재 " . self::MIN_TRAIN . '·시험지 ' . self::MIN_EXAM . '문제 이상 필요)';
                \Log::channel('search-ltr')->info($msg);
                $this->warn($msg);
                return 0;
            }

            //  ② 학습·채점 (파이썬)
            $this->info('② 학습·채점 (파이썬)');
            $report = $this->train($dir);
            $this->line("   나무 {$report['train']['rounds']}그루, {$report['seconds']}초");

            //  ③ 합격 판정
            $this->info('③ 합격 판정');
            $new = SearchLtrModel::fromJson("{$dir}/model_new.json", $until->format('Ymd'));
            if ($new->features !== SearchLtr::names())
                throw new \RuntimeException('새 모델의 재료 이름이 지금 코드와 다름');
            [$checked, $diff] = $this->sameAsPython($new, "{$dir}/check.csv");
            $msg = $this->judge($label, $size, $report, $new, $checked, $diff);
        } catch (\Throwable $e) {
            \Log::channel('search-ltr')->error("{$label} - 실패: " . $e->getMessage());
            $this->error($e->getMessage());
            return 1;
        }

        $this->info($msg);
        return 0;
    }

    //  ① 문제 만들기 → train.csv(교재), exam.csv(시험지), meta.json - 줄 = 문제 번호, 무게, 고른 점수, 본 자리, 검색어 번호, 재료들
    private function export(Carbon $until, string $dir): array {
        $from     = $until->copy()->subDays(SearchRank::DAYS)->toDateTimeString();
        $to       = $until->toDateTimeString();
        $examFrom = $until->copy()->subDays(self::EXAM_DAYS)->toDateString();
        $where    = 'created_at >= ? AND created_at < ? AND sl_mode IS NULL AND sl_total > 0 AND sl_alt IS NULL';     //  AI 보정으로 바꿔 찾은 검색은 뺌
        $select   = "SELECT sl_id, sl_keyword_norm AS kw, COALESCE(sl_uuid, ip) AS visitor, DATE(created_at) AS d, sl_page, sl_gd_ids
                     FROM la_user_behavior_search WHERE {$where}";

        //  고른 점수 [검색 번호][상품] - SearchRank와 같은 규칙 (결제 전·취소 주문은 안 셈)
        $acts = [];
        foreach (DB::select("
            SELECT e.sle_sl_id AS sl, e.sle_gd_id AS gd, e.sle_action AS act, o.od_id AS paid
            FROM la_user_behavior_search_events e
            JOIN la_user_behavior_search l ON l.sl_id = e.sle_sl_id
            LEFT JOIN la_shop_order o ON e.sle_action = 'purchase' AND o.od_id = e.sle_ref_id
                                     AND o.od_step NOT IN ('0', '60', '61')
            WHERE l.created_at >= ? AND l.created_at < ? AND e.created_at < ? AND l.sl_mode IS NULL", [$from, $to, $to]) as $e) {
            if ($e->act === 'purchase' && !$e->paid)
                continue;
            $gd = (int) $e->gd;
            $acts[$e->sl][$gd] = max($acts[$e->sl][$gd] ?? 0, SearchRank::POINTS[$e->act] ?? 0);
        }

        //  문제 = 날 + 손님 + 검색어 - 고른 상품이 있는 문제만 (1번째: 어떤 문제인지, 2번째: 그 문제의 모든 쪽에서 본 상품)
        $groups = [];
        foreach (DB::cursor($select, [$from, $to]) as $r)
            if (isset($acts[$r->sl_id]) && !SearchLtr::isCatno($r->kw))
                $groups["{$r->d}\t{$r->visitor}\t{$r->kw}"] = ['pos' => [], 'label' => []];
        foreach (DB::cursor($select, [$from, $to]) as $r) {
            if (!isset($groups[$key = "{$r->d}\t{$r->visitor}\t{$r->kw}"]))
                continue;
            $g    = &$groups[$key];
            $base = (max(1, (int) $r->sl_page) - 1) * SearchRank::PER_PAGE;
            foreach (json_decode((string) $r->sl_gd_ids, true) ?: [] as $i => $gd)
                $g['pos'][(int) $gd] = min($g['pos'][(int) $gd] ?? PHP_INT_MAX, $base + $i + 1);
            foreach ($acts[$r->sl_id] ?? [] as $gd => $pt)
                $g['label'][$gd] = max($g['label'][$gd] ?? 0, $pt);
            unset($g);
        }
        unset($acts);
        ksort($groups);     //  날짜순 (파이썬이 교재 마지막 15%를 학습 횟수 정하기용으로 씀)

        //  검색어마다 ES에 한 번 물어 재료 - 손님 검색과 같은 쿼리 (개인화 없음), 1~50등 + 그 밖에서 손님이 본 상품
        $kwNeed = [];
        foreach ($groups as $key => $g) {
            if (!array_filter(array_intersect_key($g['label'], $g['pos'])))     //  본 목록에서 고른 상품이 없음 (PICK에서만 고름 등)
                continue;
            $kw = explode("\t", $key)[2];
            $kwNeed[$kw] = array_merge($kwNeed[$kw] ?? [], array_keys($g['pos']));
        }

        $es    = new GoodsElasticSearch;
        $byKw  = [];
        $bar   = $this->output->createProgressBar(count($kwNeed));
        foreach ($kwNeed as $kw => $need) {
            $kw    = (string) $kw;
            $query = SearchLtr::withNamed($es->buildQuery($kw, null, GoodsElasticSearch::customerFilters(), GoodsElasticSearch::specFunctions($kw)), $kw);
            $res   = $es->search(['size' => SearchLtr::TOP, 'query' => $query, '_source' => SearchLtr::SOURCE, 'track_total_hits' => true])->asArray();
            $docs  = SearchLtr::docs($res['hits']['hits']);
            $top   = $docs ? reset($docs)['score'] : 0;
            if ($missing = array_values(array_diff(array_unique($need), array_keys($docs))))
                $docs += SearchLtr::docs($es->search([
                    'size'    => count($missing),
                    'query'   => ['bool' => ['must' => [$query], 'filter' => [['ids' => ['values' => array_map('strval', $missing)]]]]],
                    '_source' => SearchLtr::SOURCE,
                    'track_total_hits' => false,
                ])->asArray()['hits']['hits'], SearchLtr::TOP + 1);      //  50등 밖 → 등수 51 (지금 검색에 안 맞거나 판매 중지된 상품은 빠짐)
            $byKw[$kw] = [$docs, $top, (int) $res['hits']['total']['value']];
            $bar->advance();
        }
        $bar->finish();
        $this->newLine();

        //  최종 문제 - 재료가 있는 본 상품 2개 이상 + 고른 상품 1개 이상
        $final = [];
        $votes = [];
        foreach ($groups as $key => $g) {
            [$d, $visitor, $kw] = explode("\t", $key);
            $docs = array_intersect_key($byKw[$kw][0] ?? [], $g['pos']);
            if (count($docs) < 2 || !array_filter(array_intersect_key($g['label'], $docs)))
                continue;
            $set     = $d >= $examFrom ? 'exam' : 'train';
            $final[] = [$set, $d, $visitor, $kw, $docs, $g];
            $votes[$set][$visitor][$kw] = ($votes[$set][$visitor][$kw] ?? 0) + 1;
        }
        unset($groups);

        //  자리 보정 점수 - 주마다 그 주가 시작되기 전 기록으로 (0 = 시험 주)
        $kwSet = array_flip(array_map('strval', array_keys($byKw)));
        $srBy  = [];
        $srOf  = function (int $week, string $kw) use (&$srBy, $until, $kwSet) {
            if (!isset($srBy[$week])) {
                $srBy[$week] = [];
                foreach (SearchRank::build($until->copy()->subDays(self::EXAM_DAYS * ($week + 1)))['rows'] as $r)
                    if (isset($kwSet[$r['sr_keyword']]))
                        $srBy[$week][$r['sr_keyword']][$r['sr_gd_id']] = $r;
            }
            return $srBy[$week][$kw] ?? [];
        };

        //  파일 쓰기 - 문제마다 본 자리 순서로
        $head  = implode(',', array_merge(['qid', 'weight', 'label', 'pos', 'kw'], SearchLtr::names())) . "\n";
        $files = ['train' => fopen("{$dir}/train.csv", 'w'), 'exam' => fopen("{$dir}/exam.csv", 'w')];
        $stats = ['train' => 0, 'exam' => 0, 'train_rows' => 0, 'exam_rows' => 0];
        $kwIds = [];
        foreach ($files as $fh)
            fwrite($fh, $head);
        foreach ($final as [$set, $d, $visitor, $kw, $docs, $g]) {
            $week  = intdiv($until->timestamp - Carbon::parse($d)->timestamp - 1, self::EXAM_DAYS * 86400);
            $rows  = SearchLtr::rows($kw, $docs, $byKw[$kw][1], $byKw[$kw][2], $srOf($week, $kw), Carbon::parse($d)->setTime(12, 0)->timestamp);
            $qid   = ++$stats[$set];
            $w     = 1 / $votes[$set][$visitor][$kw];
            $kwId  = $kwIds[$kw] ??= count($kwIds);
            $order = array_keys($docs);
            usort($order, fn($a, $b) => $g['pos'][$a] <=> $g['pos'][$b]);
            foreach ($order as $gd) {
                $vals = array_map(fn($v) => $v === null ? 'nan' : self::num($v), $rows[$gd]);
                fwrite($files[$set], implode(',', array_merge([$qid, self::num($w), $g['label'][$gd] ?? 0, $g['pos'][$gd], $kwId], $vals)) . "\n");
                $stats["{$set}_rows"]++;
            }
        }
        foreach ($files as $fh)
            fclose($fh);

        //  채점용 자리 곡선 (자리별 클릭률) + 재료 울타리
        $curve = SearchRank::build($until)['curve']['list'];
        file_put_contents("{$dir}/meta.json", json_encode([
            'until'    => $until->toDateString(),
            'features' => SearchLtr::names(),
            'monotone' => array_values(SearchLtr::FEATURES),
            'ctr'      => (object) $curve,
            'keywords' => array_keys($kwIds),
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        return $stats + ['keywords' => count($kwIds)];
    }

    //  ② 파이썬 학습 숙제 - web01은 /opt/4science-ltr 파이썬 (SEARCH_LTR_PYTHON), 가장 낮은 우선순위로
    private function train(string $dir): array {
        $cmd = [(string) config('search.ltr.python'), base_path('python/ltr/train.py'), '--dir', $dir];
        if (SearchLtrModel::current())
            array_push($cmd, '--current', SearchLtrModel::path('model.json'));
        if (PHP_OS_FAMILY === 'Linux')
            $cmd = array_merge(['nice', '-n', '19'], $cmd);

        $p = new Process($cmd, base_path(), null, null, 3600);
        $p->run();
        if (!$p->isSuccessful())
            throw new \RuntimeException('파이썬 학습 실패 (exit ' . $p->getExitCode() . '): ' . mb_substr(trim($p->getErrorOutput() ?: $p->getOutput()), -800));
        return json_decode(file_get_contents("{$dir}/report.json"), true, 512, JSON_THROW_ON_ERROR);
    }

    //  PHP 나무 계산 = 파이썬 계산인지 (check.csv: 재료들 + 파이썬 점수) → [맞춰 본 줄 수, 가장 큰 차이]
    private function sameAsPython(SearchLtrModel $model, string $file): array {
        $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        array_shift($lines);
        $rows = $py = [];
        foreach ($lines as $i => $line) {
            $v       = str_getcsv($line);
            $py[$i]  = (float) array_pop($v);
            $rows[$i] = array_map(fn($x) => strtolower($x) === 'nan' ? null : (float) $x, $v);
        }
        $max = 0.0;
        foreach ($model->predict($rows) as $i => $p)
            $max = max($max, abs($p - $py[$i]) / max(1, abs($py[$i])));
        return [count($rows), $max];
    }

    //  ③ 합격 판정 - 기준 = 지금 모델과 ES 순서 중 더 나은 쪽 (지금 모델이 ES보다 못한데 그보다 조금 나은 새 모델로 바뀌는 일 없게)
    private function judge(string $label, string $size, array $report, SearchLtrModel $new, int $checked, float $diff): string {
        $n      = $report['ndcg'];
        $hasCur = SearchLtrModel::current() && !empty($n['current']);
        $base   = $hasCur && $n['current']['ips'] > $n['es']['ips'] ? 'current' : 'es';
        $worse  = array_values(array_filter($report['keywords'], fn($k) => $k['new'] < $k[$base] - self::WORSE_GAP));
        $fails  = array_keys(array_filter([
            '주 점수 부족'    => $n['new']['ips'] < $n[$base]['ips'] * self::PASS_GAIN,
            '그냥 채점 하락'  => $n['new']['plain'] < $n[$base]['plain'] * self::PASS_PLAIN,
            '나빠진 검색어 ' . count($worse) . '개' => count($worse) > self::MAX_WORSE,
            'PHP 계산 다름'   => !$checked || $diff > self::MATCH_TOL,
        ]));

        $fmt   = fn($x) => $x ? sprintf('%.3f', $x['ips']) . '(' . sprintf('%.3f', $x['plain']) . ')' : '-';
        $gain  = ($n['new']['ips'] / max(1e-9, $n[$base]['ips']) - 1) * 100;
        $score = "채점 자리 보정(그냥): ES {$fmt($n['es'])} · 지금 모델 {$fmt($hasCur ? $n['current'] : null)} · 새 모델 {$fmt($n['new'])}"
               . sprintf(' (%s 대비 %+.1f%%)', $base === 'current' ? '지금 모델' : 'ES 순서', $gain)
               . ', 나빠진 검색어 ' . count($worse) . "개, PHP 계산 차이 " . sprintf('%.1e', $diff) . " ({$checked}줄)";
        $dry   = $this->option('dry-run') ? ' [연습 - 모델 안 바꿈]' : '';
        $sw    = config('search.ltr.on') ? 'SEARCH_LTR 켜짐 - 다음 검색부터 적용' : 'SEARCH_LTR 꺼짐 - 켜야 손님 검색에 적용';

        if (!$fails) {
            if (!$dry)
                SearchLtrModel::install($new, SearchLtrModel::path('work/model_new.json'));
            $msg = "{$label} - {$size} / {$score} → 합격: 새 모델 {$new->version} (나무 {$new->treeCount()}그루) 교체, {$sw}{$dry}";
        } elseif ($hasCur && $n['current']['ips'] < $n['es']['ips'] * self::PASS_PLAIN) {
            if (!$dry)
                SearchLtrModel::uninstall();
            $msg = "{$label} - {$size} / {$score} → 불합격(" . implode(', ', $fails) . "), 지금 모델도 ES 순서보다 못해 내림 - ES 순서로 돌아감{$dry}";
        } else
            $msg = "{$label} - {$size} / {$score} → 불합격(" . implode(', ', $fails) . '), ' . ($hasCur ? '지금 모델 계속 사용' : 'ES 순서 그대로') . $dry;

        \Log::channel('search-ltr')->info($msg);
        if ($worse)
            \Log::channel('search-ltr-detail')->info('나빠진 검색어: ' . json_encode($worse, JSON_UNESCAPED_UNICODE));
        \Log::channel('search-ltr-detail')->info('중요한 재료: ' . json_encode($report['importance'], JSON_UNESCAPED_UNICODE));
        return $msg;
    }

    //  숫자 → 파일 글자 (float32에 충분한 9자리)
    private static function num($v): string {
        return is_int($v) ? (string) $v : sprintf('%.9g', $v);
    }
}
