<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Maker;
use App\Models\Shop\ExchangeRate;
use Illuminate\Support\Facades\DB;
use ZipArchive;

class GoodsPriceExcelController extends Controller {

    const CHUNK_SIZE      = 2000;    // DB 처리 단위
    const FILE_SPLIT_SIZE = 500000;  // 파일 분할 기준 (건)

    // 팀장 이상 또는 최고관리자만 허용
    private function checkPermission() {
        $user = auth()->user();
        $um = $user->userMng;
        $can = $user->is_super || !is_null($um->um_responsibility) || intval($um->um_position) >= 4;
        if (!$can) abort(403, '팀장 이상 또는 최고관리자만 사용할 수 있습니다.');
    }

    // 제조사별 가격 정보 CSV 다운로드 (50만 건 넘으면 여러 파일로 나눠 zip)
    public function export(Request $req) {
        $this->checkPermission();
        $req->validate(['mk_id' => 'required|integer']);

        $maker = Maker::findOrFail($req->mk_id);
        $fileName = preg_replace('/[^A-Za-z0-9가-힣_-]/u', '_', $maker->mk_name) . '_price_' . date('Ymd');

        $tmpDir = storage_path('app/tmp_price_excel_' . uniqid());
        mkdir($tmpDir, 0755, true);

        $partNo = 1;
        $rowInPart = 0;
        $fp = null;
        $filePaths = [];

        $openNewPart = function() use (&$fp, &$partNo, &$filePaths, $tmpDir, $fileName) {
            if ($fp) fclose($fp);
            $path = "{$tmpDir}/{$fileName}_{$partNo}.csv";
            $fp = fopen($path, 'w');
            fwrite($fp, "\xEF\xBB\xBF"); // 엑셀 한글 깨짐 방지 BOM
            fputcsv($fp, ['gd_id', 'gm_id', '상품명', '제품명', 'CATNO', '모델명', '판매가', '원가']);
            $filePaths[] = $path;
            $partNo++;
        };
        $openNewPart();

        DB::table('shop_goods_model as gm')
            ->join('shop_goods as g', 'g.gd_id', '=', 'gm.gm_gd_id')
            ->where('g.gd_mk_id', $req->mk_id)
            ->where('g.gd_enable', 'Y')
            ->whereNull('g.deleted_at')
            ->select('g.gd_id', 'gm.gm_id', 'g.gd_name', 'gm.gm_name', 'gm.gm_catno', 'gm.gm_code', 'gm.gm_price', 'gm.gm_price_origin')
            ->orderBy('gm.gm_id')
            ->chunkById(self::CHUNK_SIZE, function($rows) use (&$fp, &$rowInPart, $openNewPart) {
                foreach ($rows as $row) {
                    if ($rowInPart >= self::FILE_SPLIT_SIZE) {
                        $openNewPart();
                        $rowInPart = 0;
                    }
                    fputcsv($fp, [$row->gd_id, $row->gm_id, $row->gd_name, $row->gm_name, $row->gm_catno, $row->gm_code, $row->gm_price, $row->gm_price_origin]);
                    $rowInPart++;
                }
            }, 'gm.gm_id', 'gm_id');

        if ($fp) fclose($fp);

        if (count($filePaths) == 1)
            return response()->download($filePaths[0], basename($filePaths[0]))->deleteFileAfterSend(true);

        $zipPath = "{$tmpDir}/{$fileName}.zip";
        $zip = new ZipArchive();
        $zip->open($zipPath, ZipArchive::CREATE);
        foreach ($filePaths as $path) $zip->addFile($path, basename($path));
        $zip->close();

        foreach ($filePaths as $path) @unlink($path);   // 추가 — zip에 이미 담겼으니 원본 조각은 바로 삭제

        return response()->download($zipPath, basename($zipPath))->deleteFileAfterSend(true);
    }

    // 수정된 CSV 업로드 -> gm_price_origin 반영, 외화 상품은 최신 환율로 자동 재계산
    public function import(Request $req) {
        $this->checkPermission();
        $req->validate(['file' => 'required|file']);

        $ext = strtolower($req->file('file')->getClientOriginalExtension());
        if ($ext !== 'csv') {
            return response()->json(['message' => 'CSV 파일만 업로드 가능합니다.'], 422);
        }

        $handle = fopen($req->file('file')->getRealPath(), 'r');
        fgetcsv($handle); // 헤더 스킵

        $updated = 0;
        $touchedIds = [];
        $buffer = [];

        while (($row = fgetcsv($handle)) !== false) {
            $gm_id = intval($row[1] ?? 0);
            if (!$gm_id) continue;

            $priceRaw  = $row[6] ?? null;
            $originRaw = $row[7] ?? null;

            $buffer[] = [
                'gm_id'           => $gm_id,
                'gm_price'        => ($priceRaw  === null || $priceRaw  === '') ? null : floatval($priceRaw),
                'gm_price_origin' => ($originRaw === null || $originRaw === '') ? null : floatval($originRaw),
            ];

            if (count($buffer) >= self::CHUNK_SIZE) {
                $updated += $this->flushPrices($buffer);
                $touchedIds = array_merge($touchedIds, array_column($buffer, 'gm_id'));
                $buffer = [];
            }
        }
        if ($buffer) {
            $updated += $this->flushPrices($buffer);
            $touchedIds = array_merge($touchedIds, array_column($buffer, 'gm_id'));
        }
        fclose($handle);

        // 외화 제조사 상품은 방금 반영한 gm_price를 무시하고 gm_price_origin 기준으로 다시 계산
        $this->recalcTouched($touchedIds);

        return response()->json(['updated' => $updated], 200);
    }

    // gm_price / gm_price_origin 둘 다 파일값으로 우선 반영 (국내 통화 상품은 이 값이 최종값)
    private function flushPrices($buffer) {
        if (empty($buffer)) return 0;

        $priceRows  = array_filter($buffer, fn($b) => $b['gm_price'] !== null);
        $originRows = array_filter($buffer, fn($b) => $b['gm_price_origin'] !== null);

        $updates = [];
        if ($priceRows) {
            $case = "CASE gm_id ";
            foreach ($priceRows as $b) $case .= "WHEN {$b['gm_id']} THEN " . floatval($b['gm_price']) . " ";
            $case .= "ELSE gm_price END";           // 값 없는 행은 기존 판매가 유지
            $updates['gm_price'] = DB::raw($case);
        }
        if ($originRows) {
            $case = "CASE gm_id ";
            foreach ($originRows as $b) $case .= "WHEN {$b['gm_id']} THEN " . floatval($b['gm_price_origin']) . " ";
            $case .= "ELSE gm_price_origin END";    // 값 없는 행은 기존 원가 유지
            $updates['gm_price_origin'] = DB::raw($case);
        }
        if (empty($updates)) return 0;

        $ids = array_column($buffer, 'gm_id');
        return DB::table('shop_goods_model')->whereIn('gm_id', $ids)->update($updates);
    }

    // 업로드로 건드린 gm_id 중 외화 제조사 상품만 골라 최신 환율로 재계산
    private function recalcTouched(array $gmIds) {
        if (empty($gmIds)) return;

        $prefix = DB::getTablePrefix();

        foreach (array_chunk($gmIds, self::CHUNK_SIZE) as $idChunk) {
            $currencies = DB::table('shop_goods_model as gm')
                ->join('shop_goods as g', 'g.gd_id', '=', 'gm.gm_gd_id')
                ->join('shop_makers as mk', 'mk.mk_id', '=', 'g.gd_mk_id')
                ->whereIn('gm.gm_id', $idChunk)
                ->where('mk.mk_currency', '!=', 'KRW')
                ->distinct()
                ->pluck('mk.mk_currency');

            foreach ($currencies as $currency) {
                $rate = ExchangeRate::current($currency);
                if (!$rate) continue;

                $unit = 1;
                if (preg_match('/\((\d+)\)/', $currency, $m)) $unit = intval($m[1]);
                $unitRate = $rate->er_rate / $unit;

                DB::table('shop_goods_model as gm')
                    ->join('shop_goods as g', 'g.gd_id', '=', 'gm.gm_gd_id')
                    ->join('shop_makers as mk', 'mk.mk_id', '=', 'g.gd_mk_id')
                    ->whereIn('gm.gm_id', $idChunk)
                    ->where('mk.mk_currency', $currency)
                    ->where('gm.gm_price_origin', '>', 0)
                    ->update([
                        'gm.gm_price' => DB::raw(
                            "CEIL(({$prefix}gm.gm_price_origin * " . floatval($unitRate) . " * (1 + {$prefix}mk.mk_customs_rate/100) * (1 + {$prefix}mk.mk_margin_rate/100)) / 100) * 100"
                        ),
                    ]);
            }
        }
    }
}