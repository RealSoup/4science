<?php

namespace App\Services;

//  검색 순서 학습 모델 (AI 검색 2-5 ②) - XGBoost가 만든 model.json의 나무들을 PHP로 계산
//  · 학습은 매주 web01 파이썬 숙제(search:ltr-train → python/ltr/train.py)가 하고, 여기서는 점수 계산만 함 (파이썬 서버 없음)
//  · 모의고사를 통과한 모델만 storage/app/ltr/model.json 으로 들어오고, 빨리 읽도록 model.php 사본을 같이 만듦 (OPcache가 기억)
//  · XGBoost는 숫자를 float32로 비교함 → 재료 값과 나눔 기준값을 모두 float32로 맞춘 뒤 "값 < 기준이면 왼쪽", 값이 없으면 정해 둔 방향
class SearchLtrModel {
    public string $version;     //  모델 버전 (학습 기준 날짜 Ymd) - 검색 로그 sl_ltr에 남김
    public array $features;     //  재료 이름 (학습 때 순서) - SearchLtr::names()와 같아야 씀
    private float $base;        //  기본 점수 (모든 상품에 같은 값이라 순서에는 영향 없음)
    private array $trees;       //  나무마다 [왼쪽 자식, 오른쪽 자식, 재료 번호, 기준값(잎이면 잎 점수), 값 없을 때 왼쪽?]

    private function __construct(array $m) {
        $this->version  = (string) $m['version'];
        $this->features = $m['features'];
        $this->base     = (float) $m['base'];
        $this->trees    = $m['trees'];
    }

    //  storage/app/ltr 안의 파일 경로
    public static function path(string $file = ''): string {
        return storage_path('app/ltr' . ($file !== '' ? '/' . $file : ''));
    }

    //  지금 쓰는 모델 (없거나 재료 이름이 지금 코드와 다르면 null) - 한 요청 안에서는 한 번만 읽음
    public static function current(): ?self {
        static $loaded = false, $model = null;
        if (!$loaded) {
            $loaded = true;
            $file   = self::path('model.php');
            if (is_file($file)) {
                $m     = new self(include $file);
                $model = $m->features === SearchLtr::names() ? $m : null;
            }
        }
        return $model;
    }

    //  XGBoost model.json 읽기 (gbtree, 숫자 나눔만)
    public static function fromJson(string $file, string $version): self {
        $learner = json_decode(file_get_contents($file), true, 512, JSON_THROW_ON_ERROR)['learner'];
        if (($learner['gradient_booster']['name'] ?? '') !== 'gbtree')
            throw new \RuntimeException('gbtree 모델만 읽음: ' . ($learner['gradient_booster']['name'] ?? '?'));

        $trees = [];
        foreach ($learner['gradient_booster']['model']['trees'] as $t) {
            if (array_filter($t['split_type'] ?? []))
                throw new \RuntimeException('범주형 나눔은 지원하지 않음');
            $trees[] = [
                array_map('intval', $t['left_children']),
                array_map('intval', $t['right_children']),
                array_map('intval', $t['split_indices']),
                array_map(fn($c) => self::f32((float) $c), $t['split_conditions']),    //  잎이면 잎 점수
                array_map(fn($d) => (bool) $d, $t['default_left']),
            ];
        }

        return new self([
            'version'  => $version,
            'features' => $learner['feature_names'] ?? [],
            'base'     => (float) trim((string) $learner['learner_model_param']['base_score'], '[]'),   //  "5E-1" 또는 "[5E-1]"
            'trees'    => $trees,
        ]);
    }

    //  점수 계산 - $rows: [키 => 재료 값 목록(features 순서, 없는 값 null)] → [키 => 점수] (클수록 앞)
    public function predict(array $rows): array {
        $out = [];
        foreach ($rows as $k => $row) {
            $x = [];
            foreach (array_values($row) as $v)
                $x[] = $v === null || is_nan((float) $v) ? null : self::f32((float) $v);

            $sum = 0.0;
            foreach ($this->trees as [$L, $R, $F, $C, $D]) {
                $n = 0;
                while (($left = $L[$n]) !== -1) {
                    $v = $x[$F[$n]];
                    $n = $v === null ? ($D[$n] ? $left : $R[$n]) : ($v < $C[$n] ? $left : $R[$n]);
                }
                $sum += $C[$n];
            }
            $out[$k] = $this->base + $sum;
        }
        return $out;
    }

    public function treeCount(): int {
        return count($this->trees);
    }

    //  모델 교체 - model.json(원본)·model.php(빨리 읽는 사본), 쓰던 모델은 model_prev.json으로 보관
    public static function install(self $model, string $jsonFile): void {
        if (!is_dir(self::path()))
            mkdir(self::path(), 0755, true);
        if (is_file(self::path('model.json')))
            copy(self::path('model.json'), self::path('model_prev.json'));

        $php = self::path('model.php');
        file_put_contents("{$php}.tmp", '<?php return ' . var_export([
            'version'  => $model->version,
            'features' => $model->features,
            'base'     => $model->base,
            'trees'    => $model->trees,
        ], true) . ";\n");
        copy($jsonFile, self::path('model.json'));
        rename("{$php}.tmp", $php);       //  손님 검색은 바뀌기 전 파일이나 바뀐 파일 중 하나만 읽음
        @chmod($php, 0644);
        @chmod(self::path('model.json'), 0644);
        if (function_exists('opcache_invalidate'))
            @opcache_invalidate($php, true);
    }

    //  모델 내리기 - 다음 검색부터 ES 순서 그대로 (model.json은 model_prev.json으로 보관)
    public static function uninstall(): void {
        if (is_file(self::path('model.json')))
            rename(self::path('model.json'), self::path('model_prev.json'));
        if (is_file(self::path('model.php')))
            unlink(self::path('model.php'));
    }

    //  float32로 맞춤 (XGBoost와 같은 비교를 하려고)
    public static function f32(float $v): float {
        return unpack('g', pack('g', $v))[1];
    }
}
