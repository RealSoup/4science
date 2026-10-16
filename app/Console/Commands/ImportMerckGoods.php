<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\{DB, Storage};
use App\Models\Shop\Goods;

//  Merck / SIGMA-ALDRICH(40) 상품 전체 교체 (해마다 가격자료가 오면 실행)
//  1) 40 카테고리 상품 완전 삭제 - 모델·카테고리 연결·이미지·장바구니·찜·관련상품·옵션까지 (예전에 소프트 삭제된 상품 포함)
//     다른 1차 카테고리에도 걸린 상품은 남기고 Merck 연결만 뺌 / 주문·견적·게시판·로그는 그대로 둠
//  2) 2차 = 엑셀 F열 (대소문자 무시) - 있으면 쓰고, 삭제된 것이면 되살리고, 없으면 만듦
//     3차 = 상품명 첫 글자 A~Z, 그 밖은 ETC - 2차와 같은 규칙, 새로 만들 땐 상품이 있는 글자만
//  3) 파일 + F열 + 제품 코드(base)가 같으면 상품 1개, 각 줄은 모델 (상품 정보는 첫 줄 기준)
//     같은 묶음 안에 상품명이 다른 줄이 섞이면 그 묶음만 상품명별로 나눔
//  4) Cat.No - 실행할 때 DB의 40-xxxxxx 마지막 번호 다음부터
//  5) 검색 색인 - 지운 상품 빼고 새 상품 넣기
//  입력: merck_xlsx2csv.py로 만든 merck_1~4.csv.gz 가 든 폴더
//  --dry-run: 실제로 모두 해 본 뒤 되돌림 (DB 그대로, 이미지 파일·검색 색인 손대지 않음)
class ImportMerckGoods extends Command {
    protected $signature   = 'goods:import-merck
                                {dir : merck_1~4.csv.gz 폴더 (절대경로 또는 storage/app 기준)}
                                {--dry-run : 해 본 뒤 되돌림 - 건수·카테고리만 확인}
                                {--user= : created_id/updated_id에 넣을 관리자 회원번호}';
    protected $description = 'Merck / SIGMA-ALDRICH 상품 전체 삭제 후 가격자료로 새로 등록';

    const CA01    = 40;
    const CATNO01 = '40';
    const LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','ETC'];

    //  CSV 열 (merck_xlsx2csv.py 출력 순서)
    const COLS = ['code', 'name', 'spec', 'unit', 'price', 'brand', 'keyword', 'img', 'desc', 'dlvy', 'mng'];

    protected $userId;
    protected $ca01Name;
    protected $cateCache = [];      //  "부모번호|소문자 이름" => [ca_id, ca_name]
    protected $newCates  = [];      //  새로 만든 카테고리 경로
    protected $restored  = [];      //  되살린 카테고리 경로

    public function handle() {
        ini_set('memory_limit', '4096M');
        $dry = (bool) $this->option('dry-run');
        $this->userId = $this->option('user') ? (int) $this->option('user') : null;

        $dir = rtrim($this->argument('dir'), '/\\');
        if (!is_dir($dir)) $dir = storage_path('app/' . $dir);
        $files = glob($dir . '/merck_*.csv.gz');
        sort($files);
        if (!$files) {
            $this->error("merck_*.csv.gz 파일이 없습니다: {$dir}");
            return 1;
        }

        //  CSV 읽기 → 상품으로 묶기 (상세 HTML은 첫 줄 것만 보관 - 메모리 절약)
        $groups = $tmp = [];
        $warn   = ['price' => 0, 'img' => 0];
        $bad    = [];
        foreach ($files as $file) {
            $fno = preg_replace('/\D/', '', basename($file));
            $fh  = fopen('compress.zlib://' . $file, 'r');
            $hdr = fgetcsv($fh, 0, ',', '"', '');
            if ($hdr !== self::COLS) {
                $this->error(basename($file) . ' 열 이름이 다릅니다: ' . implode(',', (array) $hdr));
                return 1;
            }
            $line = 1;
            while (($v = fgetcsv($fh, 0, ',', '"', '')) !== false) {
                $line++;
                if ($v === [null]) continue;
                $r = array_combine(self::COLS, array_map([$this, 's'], array_pad($v, count(self::COLS), null)));
                if ($r['code'] === null || $r['name'] === null || $r['brand'] === null) {
                    $bad[] = basename($file) . " {$line}줄: 모델명·상품명·F열 중 빈 값 - 건너뜀";
                    continue;
                }
                if (!preg_match('/^\d+$/', (string) $r['price'])) $warn['price']++;
                if ($r['img'] === null) $warn['img']++;

                $key = $fno . '|' . mb_strtolower($r['brand']) . '|' . $this->base($r['code']);
                if (isset($tmp[$key][$r['name']])) $r['desc'] = null;
                $tmp[$key][$r['name']][] = $r;
            }
            fclose($fh);
        }

        //  예외 2) 같은 제품 코드인데 상품명이 다르면 (예: 11625-25G-F Di-tert-butyl… / 11625-2.5KG-R Sodium tetraborate…) 상품명별로 나눔
        //  상품명이 모두 같은 묶음은 그대로 상품 1개
        $split = [];
        foreach ($tmp as $key => $byName) {
            if (count($byName) > 1) $split[] = $key . ' → ' . count($byName) . '개';
            foreach ($byName as $name => $rows)
                $groups[$key . (count($byName) > 1 ? '|' . $name : '')] = $rows;
        }
        unset($tmp);
        if (!$groups) {
            $this->error('등록할 행이 없습니다.');
            return 1;
        }
        foreach ($bad as $b) $this->warn($b);
        foreach ($groups as $key => $rows) {
            if (count($rows) > 99) {
                $this->error("모델이 99개를 넘는 상품이 있습니다 (Cat.No 끝 2자리 부족): {$key} - " . count($rows) . '개');
                return 1;
            }
        }

        //  제조사 번호 - F열과 같은 이름 (대소문자 무시)
        $makers = [];
        foreach ($groups as $rows) {
            $b = mb_strtolower($rows[0]['brand']);
            if (!array_key_exists($b, $makers))
                $makers[$b] = DB::table('shop_makers')->whereRaw('LOWER(mk_name) = ?', [$b])->orderBy('mk_id')->value('mk_id');
        }
        foreach ($makers as $b => $id) {
            if (!$id) {
                $this->error("제조사를 찾을 수 없습니다: {$b}");
                return 1;
            }
        }

        $this->ca01Name = DB::table('shop_category')->where('ca_id', self::CA01)->value('ca_name');

        //  삭제 대상 - 40에 걸린 상품 전부 (소프트 삭제 포함), 다른 1차에도 걸린 상품은 연결만 뺌
        $allIds  = DB::table('shop_goods_category')->where('gc_ca01', self::CA01)->distinct()->pluck('gc_gd_id')->all();
        $keepIds = DB::table('shop_goods_category')->where('gc_ca01', '<>', self::CA01)
            ->whereIn('gc_gd_id', fn($q) => $q->select('gc_gd_id')->from('shop_goods_category')->where('gc_ca01', self::CA01))
            ->distinct()->pluck('gc_gd_id')->all();
        $delIds  = array_values(array_diff($allIds, $keepIds));

        $now     = now();
        $newIds  = [];
        $gmCnt   = 0;
        $byCa2   = [];
        $imgFiles = [];     //  서버에 저장된 이미지 (URL 아닌 것) - 커밋 뒤 지움
        $delCnt  = [];

        DB::beginTransaction();
        try {
            //  Cat.No 시작 - 지우기 전에 마지막 번호를 읽어야 옛 번호와 겹치지 않음
            $catno02 = (int) DB::table('shop_goods_model')->where('gm_catno01', self::CATNO01)->max(DB::raw('CAST(gm_catno02 AS UNSIGNED)'));
            $catnoFrom = $catno02 + 1;
            if ($catno02 + count($groups) > 999999)
                throw new \RuntimeException("Cat.No 6자리를 넘습니다 (마지막 {$catno02} + 상품 " . count($groups) . '개)');

            //  1) 완전 삭제
            foreach (array_chunk($delIds, 1000) as $ids) {
                $gmIds = DB::table('shop_goods_model')->whereIn('gm_gd_id', $ids)->pluck('gm_id')->all();
                $goIds = DB::table('shop_goods_option')->whereIn('go_gd_id', $ids)->pluck('go_id')->all();
                foreach (DB::table('file_goods')->where('fi_group', 'goods')->whereIn('fi_key', $ids)
                            ->where('fi_new', 'not like', 'http%')->get(['fi_room', 'fi_kind', 'fi_new']) as $fi) {
                    $imgFiles[] = "api_goods/{$fi->fi_room}/{$fi->fi_kind}/{$fi->fi_new}";
                    $imgFiles[] = "api_goods/{$fi->fi_room}/{$fi->fi_kind}/thumb/{$fi->fi_new}";
                }

                foreach (array_chunk($gmIds, 2000) as $gm) {
                    $this->cnt($delCnt, 'shop_wish',      DB::table('shop_wish')->whereIn('wi_gm_id', $gm)->delete());
                    $this->cnt($delCnt, 'shop_bundle_dc', DB::table('shop_bundle_dc')->whereIn('bd_gm_id', $gm)->delete());
                }
                if ($goIds) {
                    $this->cnt($delCnt, 'shop_goods_option_child', DB::table('shop_goods_option_child')->whereIn('goc_go_id', $goIds)->delete());
                    $this->cnt($delCnt, 'shop_goods_option',       DB::table('shop_goods_option')->whereIn('go_id', $goIds)->delete());
                }
                $this->cnt($delCnt, 'shop_goods_relate', DB::table('shop_goods_relate')
                    ->where(fn($q) => $q->whereIn('gr_gd_id', $ids)->orWhereIn('gr_papa_gd_id', $ids))->delete());
                $this->cnt($delCnt, 'file_goods',          DB::table('file_goods')->where('fi_group', 'goods')->whereIn('fi_key', $ids)->delete());
                $this->cnt($delCnt, 'shop_goods_attr',     DB::table('shop_goods_attr')->whereIn('ga_gd_id', $ids)->delete());
                $this->cnt($delCnt, 'shop_cart',           DB::table('shop_cart')->whereIn('ct_gd_id', $ids)->delete());
                $this->cnt($delCnt, 'shop_hash_join',      DB::table('shop_hash_join')->whereIn('gd_id', $ids)->delete());
                $this->cnt($delCnt, 'shop_listing',        DB::table('shop_listing')->whereIn('li_gd_id', $ids)->delete());
                $this->cnt($delCnt, 'search_rank',         DB::table('search_rank')->whereIn('sr_gd_id', $ids)->delete());
                $this->cnt($delCnt, 'shop_goods_category', DB::table('shop_goods_category')->whereIn('gc_gd_id', $ids)->delete());
                $this->cnt($delCnt, 'shop_goods_model',    DB::table('shop_goods_model')->whereIn('gm_gd_id', $ids)->delete());
                $this->cnt($delCnt, 'shop_goods',          DB::table('shop_goods')->whereIn('gd_id', $ids)->delete());
            }

            //  다른 1차에도 걸린 상품 - Merck 연결만 빼고, 대표 카테고리가 없어지면 남은 것 중 첫 번째를 대표로
            foreach ($keepIds as $id) {
                DB::table('shop_goods_category')->where('gc_gd_id', $id)->where('gc_ca01', self::CA01)->delete();
                if (!DB::table('shop_goods_category')->where('gc_gd_id', $id)->where('gc_prime', 'Y')->exists())
                    DB::table('shop_goods_category')->where('gc_gd_id', $id)->orderBy('gc_id')->limit(1)->update(['gc_prime' => 'Y']);
            }

            //  2), 3) 카테고리 + 상품 등록
            $buf = ['shop_goods_category' => [], 'shop_goods_model' => [], 'file_goods' => []];
            $bar = $this->output->createProgressBar(count($groups));
            foreach ($groups as $rows) {
                $f = $rows[0];  //  상품 정보는 첫 번째 줄 기준
                [$ca2, $ca2n] = $this->cate(self::CA01, $f['brand'], 2, null);
                $letter = preg_match('/^[A-Za-z]/', $f['name']) ? strtoupper($f['name'][0]) : 'ETC';
                [$ca3, $ca3n] = $this->cate($ca2, $letter, 3, "{$this->ca01Name} > {$ca2n} > {$letter}");

                $gdId = DB::table('shop_goods')->insertGetId([
                    'gd_name'     => $this->cut($f['name'], 200),
                    'gd_desc'     => $f['desc'],
                    'gd_keyword'  => $this->cut($f['keyword'], 200),
                    'gd_dlvy_at'  => $this->cut($f['dlvy'], 255),
                    'gd_enable'   => 'Y',
                    'gd_type'     => 'NON',
                    'gd_mk_id'    => $makers[mb_strtolower($f['brand'])],
                    'gd_mng_info' => $this->cut($f['mng'], 50),
                    'created_id'  => $this->userId,
                    'updated_id'  => $this->userId,
                    'created_at'  => $now,
                    'updated_at'  => $now,
                ], 'gd_id');

                $buf['shop_goods_category'][] = [
                    'gc_gd_id'     => $gdId,
                    'gc_prime'     => 'Y',
                    'gc_ca01'      => self::CA01,
                    'gc_ca01_name' => $this->ca01Name,
                    'gc_ca02'      => $ca2,
                    'gc_ca02_name' => $ca2n,
                    'gc_ca03'      => $ca3,
                    'gc_ca03_name' => $ca3n,
                    'gc_ca04'      => 0,
                    'gc_ca04_name' => null,
                ];

                //  Cat.No - 관리자 등록과 같은 규칙 (40-6자리-2자리)
                $catno02++;
                $c02 = substr('00000' . $catno02, -6);
                foreach ($rows as $k => $r) {
                    $c03 = substr('0' . ($k + 1), -2);
                    $buf['shop_goods_model'][] = [
                        'gm_gd_id'    => $gdId,
                        'gm_catno'    => self::CATNO01 . "-{$c02}-{$c03}",
                        'gm_catno01'  => self::CATNO01,
                        'gm_catno02'  => $c02,
                        'gm_catno03'  => $c03,
                        'gm_prime'    => $k == 0 ? 'Y' : 'N',
                        'gm_name'     => $this->cut($r['name'], 200),
                        'gm_code'     => $this->cut($r['code'], 50),
                        'gm_spec'     => $this->cut($r['spec'], 500),
                        'gm_unit'     => $this->cut($r['unit'], 100),
                        'gm_price'    => preg_match('/^\d+$/', (string) $r['price']) ? (int) $r['price'] : 0,
                        'gm_enable'   => 'Y',
                        'created_id'  => $this->userId,
                        'updated_id'  => $this->userId,
                        'created_at'  => $now,
                        'updated_at'  => $now,
                    ];
                    $gmCnt++;
                }

                //  이미지 - sigmaaldrich URL을 그대로 저장 (기존 Merck 상품과 같은 방식, 파일 다운로드 없음)
                if ($f['img'] !== null && mb_strlen($f['img']) <= 400) {
                    $ext = strtolower(pathinfo((string) parse_url($f['img'], PHP_URL_PATH), PATHINFO_EXTENSION));
                    $buf['file_goods'][] = [
                        'fi_group'    => 'goods',
                        'fi_key'      => $gdId,
                        'fi_room'     => (string) (intval($gdId / 1000) + 1),
                        'fi_kind'     => 'goods',
                        'fi_original' => $f['img'],
                        'fi_new'      => $f['img'],
                        'fi_seq'      => 0,
                        'fi_ext'      => substr($ext, 0, 6) ?: null,
                        'fi_size'     => 0,
                        'created_id'  => $this->userId,
                    ];
                }

                $newIds[] = $gdId;
                $byCa2[$ca2n] = ($byCa2[$ca2n] ?? 0) + 1;
                if (count($buf['shop_goods_model']) >= 2000) $this->flush($buf);
                $bar->advance();
            }
            $this->flush($buf);
            $bar->finish();
            $this->newLine();

            if ($dry) DB::rollBack();
            else      DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            $this->newLine();
            $this->error('실패 - 모두 되돌렸습니다: ' . $e->getMessage());
            return 1;
        }

        //  결과
        $this->info(($dry ? '[미리보기 - 되돌림] ' : '[완료] ') . date('Y-m-d H:i:s'));
        $this->line('삭제한 상품: ' . count($delIds) . '개 (Merck 연결만 뺀 상품: ' . count($keepIds) . '개' . ($keepIds ? ' - ' . implode(', ', $keepIds) : '') . ')');
        foreach ($delCnt as $t => $n) $this->line("  {$t}: {$n}줄");
        $this->line('서버 이미지 파일: ' . (count($imgFiles) / 2) . '개');
        $this->line('되살린 카테고리: ' . count($this->restored) . '개');
        foreach ($this->restored as $c) $this->line("  ~ {$c}");
        $this->line('새 카테고리: ' . count($this->newCates) . '개');
        foreach ($this->newCates as $c) $this->line("  + {$c}");
        $this->line('등록 상품: ' . count($newIds) . "개 / 모델: {$gmCnt}개 (상품명이 달라 나눈 묶음: " . count($split) . '개)');
        if ($this->output->isVerbose())
            foreach ($split as $s) $this->line("  / {$s}");
        foreach ($byCa2 as $c => $n) $this->line("  {$c}: {$n}개");
        $this->line('Cat.No: ' . self::CATNO01 . '-' . substr('00000' . $catnoFrom, -6) . ' ~ ' . self::CATNO01 . '-' . substr('00000' . $catno02, -6));
        if ($warn['price']) $this->warn("가격이 숫자가 아닌 모델: {$warn['price']}개 (0원으로 넣음)");
        if ($warn['img'])   $this->warn("이미지 URL이 빈 줄: {$warn['img']}개");
        if ($dry) return 0;

        $this->line('gd_id 범위: ' . min($newIds) . ' ~ ' . max($newIds));

        //  서버에 저장된 옛 이미지 파일
        foreach (array_chunk($imgFiles, 500) as $paths)
            Storage::disk('public')->delete($paths);

        //  카테고리 캐시 새로고침 (각 서버가 다음 요청 때 다시 읽음)
        if ($this->newCates || $this->restored)
            DB::table('infos')->where('key', 'update_key_cate')->update(['val' => uniqid()]);

        //  4) 검색 색인 - DB는 이미 저장됐으므로 여기서 실패해도 DB는 그대로
        try {
            $this->line('검색 색인: 지운 상품 빼는 중...');
            foreach (array_chunk($delIds, 500) as $ids)
                (new Goods)->newCollection(array_map(fn($id) => (new Goods)->forceFill(['gd_id' => $id]), $ids))->unsearchable();
            if ($keepIds)
                Goods::withTrashed()->whereIn('gd_id', $keepIds)->searchable();
            $this->line('검색 색인: 새 상품 넣는 중...');
            $bar = $this->output->createProgressBar(count($newIds));
            foreach (array_chunk($newIds, 500) as $ids) {
                Goods::whereIn('gd_id', $ids)->searchable();
                $bar->advance(count($ids));
            }
            $bar->finish();
            $this->newLine();
            $this->info('검색 색인 반영 완료');
        } catch (\Throwable $e) {
            $this->error('검색 색인 반영 실패 (DB는 저장됨): ' . $e->getMessage());
            return 1;
        }
        return 0;
    }

    //  부모 아래 같은 이름(대소문자 무시)의 카테고리 - 살아 있는 것 → 삭제된 것 되살림 → 없으면 생성
    //  3차(A~Z, ETC)는 정해진 순서, 2차는 맨 뒤 순서
    protected function cate($papa, $name, $depth, $path) {
        $key = $papa . '|' . mb_strtolower($name);
        if (isset($this->cateCache[$key])) return $this->cateCache[$key];

        $path = $path ?? "{$this->ca01Name} > {$name}";
        $row  = DB::table('shop_category')->where('ca_papa', $papa)->whereRaw('LOWER(ca_name) = ?', [mb_strtolower($name)])
            ->orderByRaw('deleted_at IS NOT NULL')->orderBy('ca_id')->first(['ca_id', 'ca_name', 'deleted_at']);
        if ($row) {
            if ($row->deleted_at) {
                DB::table('shop_category')->where('ca_id', $row->ca_id)->update(['deleted_at' => null, 'updated_id' => $this->userId]);
                $this->restored[] = $path;
            }
            return $this->cateCache[$key] = [(int) $row->ca_id, $row->ca_name];
        }

        if ($depth == 3) {
            $seq = array_search($name, self::LETTERS);
        } else {
            $seq = DB::table('shop_category')->where('ca_papa', $papa)->max('ca_seq');
            $seq = is_null($seq) ? 0 : $seq + 1;
        }
        $id = DB::table('shop_category')->insertGetId([
            'ca_papa'    => $papa,
            'ca_depth'   => $depth,
            'ca_seq'     => $seq,
            'ca_name'    => $name,
            'created_id' => $this->userId,
        ], 'ca_id');
        $this->newCates[] = $path;
        return $this->cateCache[$key] = [(int) $id, $name];
    }

    //  모델명(SKU) → 제품 코드
    //  기본: 첫 하이픈 앞 (00010-25G → 00010, 04163-500G-F → 04163)
    //  첫 부분이 영문뿐이고 하이픈 2개 이상: 두 번째 하이픈 앞 (C-016-1ML → C-016, LPG-501-10MG → LPG-501)
    //  예외 1) 영문-숫자뿐인 코드: 전체 (C-14001 - PromoCell, 포장단위 없음)
    protected function base($code) {
        $p = explode('-', $code);
        if (preg_match('/^[A-Za-z]+$/', $p[0])) {
            if (count($p) == 2 && preg_match('/^\d+$/', $p[1])) return $code;
            if (count($p) >= 3) return $p[0] . '-' . $p[1];
        }
        return $p[0];
    }

    //  모아 둔 카테고리 연결·모델·이미지 한꺼번에 넣기
    protected function flush(array &$buf) {
        foreach ($buf as $table => $rows) {
            foreach (array_chunk($rows, 1000) as $chunk)
                DB::table($table)->insert($chunk);
            $buf[$table] = [];
        }
    }

    protected function cnt(array &$c, $table, $n) {
        $c[$table] = ($c[$table] ?? 0) + $n;
    }

    //  글자 수 제한 (DB 칸 길이)
    protected function cut($v, $len) {
        return $v === null ? null : mb_substr($v, 0, $len);
    }

    //  앞뒤 공백 제거, 빈 값은 null
    protected function s($v) {
        if ($v === null) return null;
        $v = trim((string) $v);
        return $v === '' ? null : $v;
    }
}
