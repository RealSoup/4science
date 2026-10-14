<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\{DB, Storage};
use PhpOffice\PhpSpreadsheet\IOFactory;
use App\Models\Shop\Goods;

//  재료/웨이퍼 Alfa Aesar 상품 교체 (일회성)
//  1) 재료/웨이퍼(29) 안의 Alfa Aesar 상품 소프트 삭제 (관리자 삭제와 동일하게 deleted_at만 채움)
//  2) 엑셀 카테2~4가 없으면 생성
//  3) Base # 기준으로 상품 1개 + 모델 여러 개 등록, 대표 카테고리·이미지 연결
//  4) 검색 색인 반영 (삭제 상품은 is_deleted, 새 상품은 추가)
//  --dry-run: 실제로 모두 넣어 본 뒤 되돌림 (DB 그대로, 검색 색인 손대지 않음)
class ImportWaferGoods extends Command {
    protected $signature   = 'goods:import-wafer
                                {file : 엑셀 경로 (절대경로 또는 storage/app 기준)}
                                {--dry-run : 넣어 본 뒤 되돌림 - 건수·새 카테고리만 확인}
                                {--user= : created_id/updated_id에 넣을 관리자 회원번호}';
    protected $description = '재료/웨이퍼 Alfa Aesar 상품 삭제 후 엑셀로 새로 등록 (일회성)';

    const CA01      = 29;
    const CA01_NAME = '재료/웨이퍼';
    const DEL_MAKER = 'Alfa Aesar';

    //  엑셀 열 번호 (A=0)
    const C_CA2 = 2, C_CA3 = 3, C_CA4 = 4, C_GD_NAME = 5, C_GM_NAME = 6, C_BASE = 7, C_CODE = 8, C_SPEC = 9,
          C_UNIT = 11, C_PRICE = 12, C_KEYWORD = 13, C_BRAND = 14, C_DLVY = 16, C_IMG = 17, C_MNG = 18, C_DESC = 19;

    protected $userId;
    protected $cateCache = [];      //  "부모번호|이름" => ca_id
    protected $newCates  = [];      //  새로 만든 카테고리 경로

    public function handle() {
        $dry = (bool) $this->option('dry-run');
        $this->userId = $this->option('user') ? (int) $this->option('user') : null;

        //  엑셀 읽기 → Base #로 묶기
        $path = $this->argument('file');
        if (!is_file($path)) $path = storage_path('app/' . $path);
        if (!is_file($path)) {
            $this->error("파일이 없습니다: {$path}");
            return 1;
        }
        $sheet = IOFactory::load($path)->getActiveSheet()->toArray(null, true, false, false);
        array_shift($sheet);    //  제목 줄

        $groups = [];
        foreach ($sheet as $r) {
            $base = $this->s($r[self::C_BASE] ?? null);
            if ($base === null) continue;   //  빈 줄
            $groups[$base][] = $r;
        }
        if (!$groups) {
            $this->error('등록할 행이 없습니다.');
            return 1;
        }

        //  제조사 번호
        $makers = [];
        foreach ($groups as $rows) {
            $b = $this->s($rows[0][self::C_BRAND]);
            if (!array_key_exists($b, $makers))
                $makers[$b] = DB::table('shop_makers')->where('mk_name', $b)->value('mk_id');
        }
        $delMkId = DB::table('shop_makers')->where('mk_name', self::DEL_MAKER)->value('mk_id');
        foreach (array_merge($makers, [self::DEL_MAKER => $delMkId]) as $b => $id) {
            if (!$id) {
                $this->error("제조사를 찾을 수 없습니다: {$b}");
                return 1;
            }
        }

        //  이미지 파일 존재 확인 (없어도 등록은 진행, 경고만)
        $imgs = [];
        foreach ($groups as $rows) {
            $p = $this->s($rows[0][self::C_IMG]);
            if ($p !== null) $imgs[$p] = true;
        }
        foreach (array_keys($imgs) as $p) {
            $fi = $this->img($p);
            if (!$fi)
                $this->warn("이미지 경로 형식이 다릅니다(연결 안 함): {$p}");
            else if (!Storage::disk('public')->exists("api_goods/{$fi['fi_room']}/goods/{$fi['fi_new']}"))
                $this->warn("이미지 파일이 서버에 없습니다(연결은 함): {$p}");
        }

        //  삭제 대상 - 등록 전에 뽑아야 새로 넣은 상품이 섞이지 않음
        $delIds = DB::table('shop_goods as g')
            ->join('shop_goods_category as gc', 'gc.gc_gd_id', '=', 'g.gd_id')
            ->where('gc.gc_ca01', self::CA01)
            ->where('g.gd_mk_id', $delMkId)
            ->whereNull('g.deleted_at')
            ->distinct()->pluck('g.gd_id')->all();

        $now    = now();
        $newIds = [];
        $gmCnt  = 0;
        $byMk   = [];

        DB::beginTransaction();
        try {
            //  1) 기존 Alfa Aesar 상품 소프트 삭제
            foreach (array_chunk($delIds, 1000) as $ids)
                DB::table('shop_goods')->whereIn('gd_id', $ids)->update(['deleted_at' => $now, 'updated_id' => $this->userId]);

            //  2), 3) 카테고리 확인·생성 + 상품 등록
            $catno01 = (string) self::CA01;
            $catno02 = (int) DB::table('shop_goods_model')->where('gm_catno01', $catno01)->max(DB::raw('CAST(gm_catno02 AS UNSIGNED)'));
            $firstCatno = null;

            foreach ($groups as $base => $rows) {
                $f = $rows[0];  //  상품 정보는 첫 번째 행 기준
                $ca2n = $this->s($f[self::C_CA2]);
                $ca3n = $this->s($f[self::C_CA3]);
                $ca4n = $this->s($f[self::C_CA4]);
                $ca2 = $this->cate(self::CA01, $ca2n, 2, self::CA01_NAME . " > {$ca2n}");
                $ca3 = $ca3n !== null ? $this->cate($ca2, $ca3n, 3, self::CA01_NAME . " > {$ca2n} > {$ca3n}") : 0;
                $ca4 = ($ca3 && $ca4n !== null) ? $this->cate($ca3, $ca4n, 4, self::CA01_NAME . " > {$ca2n} > {$ca3n} > {$ca4n}") : 0;

                $mkId = $makers[$this->s($f[self::C_BRAND])];
                $gdId = DB::table('shop_goods')->insertGetId([
                    'gd_name'     => $this->s($f[self::C_GD_NAME]),
                    'gd_desc'     => $this->s($f[self::C_DESC]),
                    'gd_keyword'  => $this->s($f[self::C_KEYWORD]),
                    'gd_dlvy_at'  => $this->s($f[self::C_DLVY]),
                    'gd_enable'   => 'Y',
                    'gd_type'     => 'NON',
                    'gd_mk_id'    => $mkId,
                    'gd_mng_info' => $this->s($f[self::C_MNG]),
                    'created_id'  => $this->userId,
                    'updated_id'  => $this->userId,
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ], 'gd_id');

                DB::table('shop_goods_category')->insert([
                    'gc_gd_id'     => $gdId,
                    'gc_prime'     => 'Y',
                    'gc_ca01'      => self::CA01,
                    'gc_ca01_name' => self::CA01_NAME,
                    'gc_ca02'      => $ca2,
                    'gc_ca02_name' => $ca2n,
                    'gc_ca03'      => $ca3,
                    'gc_ca03_name' => $ca3 ? $ca3n : null,
                    'gc_ca04'      => $ca4,
                    'gc_ca04_name' => $ca4 ? $ca4n : null,
                ]);

                //  Cat.No - 관리자 등록과 같은 규칙 (29-6자리-2자리)
                $catno02++;
                $c02 = substr('00000' . $catno02, -6);
                foreach ($rows as $k => $r) {
                    $c03   = substr('0' . ($k + 1), -2);
                    $price = $r[self::C_PRICE];
                    $price = ($price === null || $price === '') ? 0 : (int) round((float) str_replace(',', '', $price));
                    DB::table('shop_goods_model')->insert([
                        'gm_gd_id'    => $gdId,
                        'gm_catno'    => "{$catno01}-{$c02}-{$c03}",
                        'gm_catno01'  => $catno01,
                        'gm_catno02'  => $c02,
                        'gm_catno03'  => $c03,
                        'gm_prime'    => $k == 0 ? 'Y' : 'N',
                        'gm_name'     => $this->s($r[self::C_GM_NAME]),
                        'gm_code'     => $this->s($r[self::C_CODE]),
                        'gm_spec'     => $this->s($r[self::C_SPEC]),
                        'gm_unit'     => $this->s($r[self::C_UNIT]),
                        'gm_price'    => $price,
                        'gm_enable'   => 'Y',
                        'created_id'  => $this->userId,
                        'updated_id'  => $this->userId,
                        'created_at'  => $now,
                        'updated_at'  => $now,
                    ]);
                    $gmCnt++;
                }
                if (!$firstCatno) $firstCatno = "{$catno01}-{$c02}";

                //  이미지 - 서버에 이미 있는 파일을 가리키는 행만 추가 (파일 복사 없음)
                $p = $this->s($f[self::C_IMG]);
                if ($p !== null && ($fi = $this->img($p))) {
                    DB::table('file_goods')->insert(array_merge($fi, [
                        'fi_group'   => 'goods',
                        'fi_key'     => $gdId,
                        'fi_kind'    => 'goods',
                        'fi_seq'     => 0,
                        'fi_size'    => 0,
                        'created_id' => $this->userId,
                    ]));
                }

                $newIds[] = $gdId;
                $byMk[$this->s($f[self::C_BRAND])] = ($byMk[$this->s($f[self::C_BRAND])] ?? 0) + 1;
            }

            if ($dry) DB::rollBack();
            else      DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->error('실패 - 모두 되돌렸습니다: ' . $e->getMessage());
            return 1;
        }

        //  결과
        $this->info(($dry ? '[미리보기 - 되돌림] ' : '[완료] ') . date('Y-m-d H:i:s'));
        $this->line('삭제한 Alfa Aesar 상품: ' . count($delIds) . '개');
        $this->line('새 카테고리: ' . count($this->newCates) . '개');
        foreach ($this->newCates as $c) $this->line("  + {$c}");
        $this->line('등록 상품: ' . count($newIds) . "개 / 모델: {$gmCnt}개");
        foreach ($byMk as $b => $n) $this->line("  {$b}: {$n}개");
        $this->line("Cat.No: {$firstCatno}-01 ~ {$catno01}-{$c02}-xx");
        if ($dry) return 0;

        $this->line('gd_id 범위: ' . min($newIds) . ' ~ ' . max($newIds));

        //  카테고리 캐시 새로고침 (각 서버가 다음 요청 때 다시 읽음)
        if ($this->newCates)
            DB::table('infos')->where('key', 'update_key_cate')->update(['val' => uniqid()]);

        //  4) 검색 색인 - DB는 이미 저장됐으므로 여기서 실패해도 DB는 그대로
        try {
            foreach (array_chunk($delIds, 500) as $ids)
                Goods::withTrashed()->whereIn('gd_id', $ids)->searchable();
            foreach (array_chunk($newIds, 500) as $ids)
                Goods::whereIn('gd_id', $ids)->searchable();
            $this->info('검색 색인 반영 완료');
        } catch (\Throwable $e) {
            $this->error('검색 색인 반영 실패 (DB는 저장됨): ' . $e->getMessage());
            return 1;
        }
        return 0;
    }

    //  부모 아래 같은 이름의 카테고리를 찾고, 없으면 맨 뒤 순서로 생성
    protected function cate($papa, $name, $depth, $path) {
        $key = "{$papa}|{$name}";
        if (isset($this->cateCache[$key])) return $this->cateCache[$key];

        $id = DB::table('shop_category')->where('ca_papa', $papa)->where('ca_name', $name)->whereNull('deleted_at')->value('ca_id');
        if (!$id) {
            $seq = DB::table('shop_category')->where('ca_papa', $papa)->max('ca_seq');
            $id  = DB::table('shop_category')->insertGetId([
                'ca_papa'    => $papa,
                'ca_depth'   => $depth,
                'ca_seq'     => is_null($seq) ? 0 : $seq + 1,
                'ca_name'    => $name,
                'created_id' => $this->userId,
            ], 'ca_id');
            $this->newCates[] = $path;
        }
        return $this->cateCache[$key] = (int) $id;
    }

    //  storage/api_goods/{room}/goods/{파일명} → file_goods 컬럼
    protected function img($path) {
        if (!preg_match('#api_goods/([^/]+)/goods/([^/]+)$#', $path, $m)) return null;
        return [
            'fi_room'     => $m[1],
            'fi_original' => $m[2],
            'fi_new'      => $m[2],
            'fi_ext'      => strtolower(pathinfo($m[2], PATHINFO_EXTENSION)),
        ];
    }

    //  앞뒤 공백 제거, 빈 값은 null
    protected function s($v) {
        if ($v === null) return null;
        $v = trim((string) $v);
        return $v === '' ? null : $v;
    }
}