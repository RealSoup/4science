<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Order;
use Illuminate\Support\Facades\Redis;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use DB;

//  배송 관리: 박스(배송건) 단위로 한진택배 업로드 엑셀을 만들고, 한진 회신 엑셀의 운송장번호를 상품별 배송정보에 등록
class DlvyMngController extends Controller {

    const DLVY_COM     = '한진택배';     //  Order::$orderConfig['delivery_com'] 키와 같아야 배송조회 링크가 동작
    const XLS_FARE     = 'B';           //  G열 운임 (한진 양식 기본값)
    const XLS_PAY      = '신용';         //  H열 구분 (한진 양식 기본값)
    const XLS_ITEM     = '과학기자재';   //  I열 상품명
    const HIDE_STEPS   = ['60', '61'];  //  주문취소, 결제실패는 항상 제외 (od_step은 ENUM이라 문자로 비교)
    const DONE_STEP    = '50';          //  배송완료

    //  접근 가능 회원번호는 config/dlvy.php (.env DLVY_MNG_IDS)
    public static function allowed() {
        return in_array(intval(auth()->id()), config('dlvy.mng_ids'));
    }

    private function checkPermission() {
        if (!self::allowed()) abort(403, '배송 관리 권한이 없습니다.');
    }

    public function index(Request $req) {
        $this->checkPermission();

        $orders = Order::select('od_id', 'od_no', 'od_name', 'od_step', 'od_mng', 'od_orderer', 'od_receiver', 'od_receiver_hp', 'od_addr1', 'od_addr2', 'created_at')
            ->whereNotIn('od_step', self::HIDE_STEPS)
            ->when($req->exclude_done == '1',  fn ($q) => $q->where('od_step', '<>', self::DONE_STEP))
            ->when($req->od_step,              fn ($q, $v) => $q->where('od_step', strval($v)))
            ->when($req->startDate,            fn ($q, $v) => $q->StartDate($v))
            ->when($req->endDate,              fn ($q, $v) => $q->EndDate($v))
            ->when($req->od_mng,               function ($q, $v) {
                if ($v == 'no') return $q->whereNull('od_mng');
                else return $q->where('od_mng', $v);
            })
            //  송장이 하나도 없는 상품(MODEL)이 남은 주문만
            //  whereHas(EXISTS)는 MySQL이 주문상품 전체(44만)를 materialize 해서 느림 -> 스칼라 서브쿼리로 주문 행마다 인덱스 조회
            ->when($req->no_dlvy == '1',       function ($q) {
                $p = DB::getTablePrefix();
                return $q->whereRaw("0 < (SELECT COUNT(*) FROM {$p}shop_order_model m
                    LEFT JOIN {$p}shop_order_dlvy_info d ON d.oddi_odm_id = m.odm_id AND d.oddi_dlvy_num <> ''
                    WHERE m.odm_od_id = {$p}shop_order.od_id AND m.odm_type = 'MODEL' AND d.oddi_id IS NULL)");
            });

        if ($req->filled('keyword')) {
            $txt = $req->keyword;
            switch ($req->mode) {
                case 'gm_name':
                    $orders->whereHas('orderModel', fn ($q) => $q->where(fn ($q) => $q->where('odm_gd_name', 'like', "%{$txt}%")->orWhere('odm_gm_name', 'like', "%{$txt}%")));
                break;
                case 'od_orderer':  $orders->where('od_orderer', 'like', "%{$txt}%"); break;
                case 'od_addr1':    $orders->where(fn ($q) => $q->where('od_addr1', 'like', "%{$txt}%")->orWhere('od_addr2', 'like', "%{$txt}%")); break;
                default:            $orders->where('od_id', intval($txt)); break;
            }
        }

        $list_size = in_array(intval($req->list_size), [20, 50, 100]) ? intval($req->list_size) : 20;
        $data['list'] = $orders->latest('od_id')->paginate($list_size);

        //  하위 상품 + 배송정보는 한 번에 조회 (OrderModel의 appends(이미지 등)를 피하려고 쿼리빌더 사용)
        $od_ids = $data['list']->pluck('od_id');
        $items = DB::table('shop_order_model')
            ->leftJoin('shop_order_purchase_at', 'odpa_id', '=', 'odm_odpa_id')
            ->select('odm_id', 'odm_od_id', 'odm_gd_name', 'odm_gm_name', 'odm_gm_code', 'odm_gm_catno', 'odm_ea', 'odpa_pa_id')
            ->whereIn('odm_od_id', $od_ids)->where('odm_type', 'MODEL')
            ->orderBy('odm_id')->get();
        $dlvy = DB::table('shop_order_dlvy_info')
            ->select('oddi_id', 'oddi_odm_id', 'oddi_dlvy_com', 'oddi_dlvy_num')
            ->whereIn('oddi_odm_id', $items->pluck('odm_id'))
            ->whereNotNull('oddi_dlvy_num')->where('oddi_dlvy_num', '<>', '')
            ->get()->groupBy('oddi_odm_id');
        foreach ($items as $it) $it->dlvy = $dlvy->get($it->odm_id, collect())->values();
        $items = $items->groupBy('odm_od_id');

        foreach ($data['list'] as $od) {
            $od->items = $items->get($od->od_id, collect())->values();
            if ($od->od_name == '' && count($od->items)) {
                $od->od_name = $od->items[0]->odm_gd_name;
                if (count($od->items) > 1) $od->od_name .= "외 [".(count($od->items)-1)."]";
            }
        }

        $data['steps'] = collect(Order::$orderConfig['step'])->except(self::HIDE_STEPS);
        $data['mng_on'] = json_decode(Redis::get('UserMngOn'));
        $data['mng_off'] = json_decode(Redis::get('UserMngOff'));
        return response()->json($data);
    }

    //  박스 목록 -> 한진 업로드 엑셀 (헤더 없음, 박스 1개 = 1행)
    //  boxes: [ { items: [ { odm_id, ea } ] } ]
    public function export(Request $req) {
        $this->checkPermission();
        $req->validate([
            'boxes'                => 'required|array|min:1',
            'boxes.*.items'        => 'required|array|min:1',
            'boxes.*.items.*.odm_id' => 'required|integer',
            'boxes.*.items.*.ea'   => 'required|integer|min:1',
        ]);

        $odm_ids = collect($req->boxes)->pluck('items')->flatten(1)->pluck('odm_id')->unique();
        $odms = DB::table('shop_order_model')->select('odm_id', 'odm_od_id')
            ->whereIn('odm_id', $odm_ids)->where('odm_type', 'MODEL')->get()->keyBy('odm_id');
        if (count($odms) != count($odm_ids)) abort(500, '없는 주문상품이 포함되어 있습니다.');

        //  주소, 연락처, 담당자는 화면 값이 아니라 DB 값 사용
        $orders = Order::with('mng:id,name')
            ->select('od_id', 'od_mng', 'od_receiver', 'od_receiver_hp', 'od_addr1', 'od_addr2')
            ->whereIn('od_id', $odms->pluck('odm_od_id')->unique())->get()->keyBy('od_id');

        $book = new Spreadsheet();
        $sheet = $book->getActiveSheet();
        $r = 1;
        foreach ($req->boxes as $box) {
            $ea = 0;
            $group = [];    //  od_id => [odm_id, ...] (박스에 담긴 순서 유지)
            foreach ($box['items'] as $it) {
                $od_id = $odms[$it['odm_id']]->odm_od_id;
                if (!in_array($it['odm_id'], $group[$od_id] ?? [])) $group[$od_id][] = $it['odm_id'];
                $ea += intval($it['ea']);
            }
            $memo = collect($group)->map(fn ($ids, $od_id) => $od_id.'['.implode(', ', $ids).']')->implode(' ');
            $od = $orders[array_key_first($group)];   //  받는 분은 박스의 첫 번째 주문 기준

            $sheet->setCellValueExplicit("A{$r}", $od->od_receiver, DataType::TYPE_STRING);
            $sheet->setCellValueExplicit("C{$r}", trim($od->od_addr1.' '.$od->od_addr2), DataType::TYPE_STRING);
            $sheet->setCellValueExplicit("D{$r}", $od->od_receiver_hp, DataType::TYPE_STRING);
            $sheet->setCellValue("F{$r}", $ea);
            $sheet->setCellValue("G{$r}", self::XLS_FARE);
            $sheet->setCellValue("H{$r}", self::XLS_PAY);
            $sheet->setCellValue("I{$r}", self::XLS_ITEM);
            $sheet->setCellValueExplicit("M{$r}", $od->mng->name ?? '', DataType::TYPE_STRING);
            $sheet->setCellValueExplicit("O{$r}", $memo, DataType::TYPE_STRING);
            $r++;
        }

        $path = storage_path('app/hanjin_'.uniqid().'.xlsx');
        (new Xlsx($book))->save($path);
        return response()->download($path, 'hanjin_'.date('Ymd_His').'.xlsx')->deleteFileAfterSend(true);
    }

    //  한진 회신 엑셀 미리보기
    public function preview(Request $req) {
        $this->checkPermission();
        return response()->json($this->parseReturnFile($req));
    }

    //  한진 회신 엑셀 등록: 같은 상품에 같은 운송장이 이미 있으면 건너뜀, 빈 배송정보 행이 있으면 먼저 채움
    public function store(Request $req) {
        $this->checkPermission();
        $parsed = $this->parseReturnFile($req);

        $cnt = ['insert' => 0, 'update' => 0, 'skip' => 0, 'error' => 0];
        DB::transaction(function () use ($parsed, &$cnt) {
            $odm_ids = collect($parsed['rows'])->pluck('items')->flatten(1)->where('status', 'new')->pluck('odm_id')->unique();
            //  송장번호가 비어있는 배송정보 행 (주문 상태 변경 시 firstOrCreate로 생긴 행)
            $empty = DB::table('shop_order_dlvy_info')->select('oddi_id', 'oddi_odm_id')
                ->whereIn('oddi_odm_id', $odm_ids)
                ->where(fn ($q) => $q->whereNull('oddi_dlvy_num')->orWhere('oddi_dlvy_num', ''))
                ->orderBy('oddi_id')->get()->groupBy('oddi_odm_id')->map(fn ($g) => $g->pluck('oddi_id')->all())->all();
            $now = \Carbon\Carbon::now();

            foreach ($parsed['rows'] as $row) {
                foreach ($row['items'] as $it) {
                    if ($it['status'] != 'new') { $cnt[$it['status'] == 'dup' ? 'skip' : 'error']++; continue; }
                    $val = ['oddi_dlvy_com' => self::DLVY_COM, 'oddi_dlvy_num' => $row['dlvy_num'], 'oddi_dlvy_created_at' => $now];
                    if (!empty($empty[$it['odm_id']])) {
                        DB::table('shop_order_dlvy_info')->where('oddi_id', array_shift($empty[$it['odm_id']]))->update($val);
                        $cnt['update']++;
                    } else {
                        DB::table('shop_order_dlvy_info')->insert($val + ['oddi_odm_id' => $it['odm_id']]);
                        $cnt['insert']++;
                    }
                }
            }
        });
        return response()->json(['cnt' => $cnt]);
    }

    //  운송장번호, 메모2(od_id[odm_id, ...] od_id[...]) 열을 헤더명으로 찾아 행별 등록 가능 여부 판단
    private function parseReturnFile(Request $req) {
        $req->validate(['file' => 'required|file|mimes:xlsx,xls']);
        $book = IOFactory::load($req->file('file')->getRealPath());
        $data = $book->getActiveSheet()->toArray(null, false, false, false);

        $head = array_map(fn ($v) => trim(strval($v)), $data[0] ?? []);
        $c_num  = array_search('운송장번호', $head);
        $c_memo = array_search('메모2', $head);
        $c_name = array_search('받으시는 분', $head);
        if ($c_num === false || $c_memo === false) abort(500, '첫 행에서 운송장번호, 메모2 열을 찾을 수 없습니다.');

        //  파일 전체의 odm 정보, 기존 송장을 한 번에 조회
        $memos = [];
        foreach (array_slice($data, 1) as $i => $line) {
            preg_match_all('/(\d+)\s*\[([\d,\s]+)\]/', strval($line[$c_memo] ?? ''), $m, PREG_SET_ORDER);
            $memos[$i] = $m;
        }
        $all_odm = collect($memos)->flatten(1)->map(fn ($m) => preg_split('/\D+/', $m[2], -1, PREG_SPLIT_NO_EMPTY))->flatten()->map(fn ($v) => intval($v))->unique();
        $odms = DB::table('shop_order_model')->select('odm_id', 'odm_od_id', 'odm_type', 'odm_gd_name', 'odm_gm_name')
            ->whereIn('odm_id', $all_odm)->get()->keyBy('odm_id');
        $exists = DB::table('shop_order_dlvy_info')->select('oddi_odm_id', 'oddi_dlvy_num')
            ->whereIn('oddi_odm_id', $all_odm)->whereNotNull('oddi_dlvy_num')->get()
            ->map(fn ($d) => $d->oddi_odm_id.'_'.$d->oddi_dlvy_num)->flip()->all();

        $rows = [];
        foreach (array_slice($data, 1) as $i => $line) {
            $raw_num = $line[$c_num] ?? '';
            if (is_float($raw_num)) $raw_num = sprintf('%.0f', $raw_num);
            $dlvy_num = preg_replace('/\D/', '', strval($raw_num));
            $memo = trim(strval($line[$c_memo] ?? ''));
            if ($dlvy_num === '' && $memo === '') continue;   //  빈 행

            $row = ['line' => $i + 2, 'dlvy_num' => $dlvy_num, 'memo' => $memo, 'name' => $c_name !== false ? strval($line[$c_name] ?? '') : '', 'msg' => '', 'items' => []];
            if ($dlvy_num === '')       $row['msg'] = '운송장번호 없음';
            else if (!count($memos[$i])) $row['msg'] = '메모2 형식 오류';

            foreach ($memos[$i] as $m) {
                $od_id = intval($m[1]);
                foreach (preg_split('/\D+/', $m[2], -1, PREG_SPLIT_NO_EMPTY) as $odm_id) {
                    $odm_id = intval($odm_id);
                    $odm = $odms[$odm_id] ?? null;
                    $it = ['od_id' => $od_id, 'odm_id' => $odm_id, 'name' => $odm ? ($odm->odm_gm_name ?: $odm->odm_gd_name) : '', 'status' => 'new', 'msg' => ''];
                    if ($row['msg'])                                        { $it['status'] = 'error'; $it['msg'] = $row['msg']; }
                    else if (!$odm || $odm->odm_type != 'MODEL')            { $it['status'] = 'error'; $it['msg'] = '없는 주문상품'; }
                    else if ($odm->odm_od_id != $od_id)                     { $it['status'] = 'error'; $it['msg'] = '주문번호 불일치'; }
                    else if (isset($exists["{$odm_id}_{$dlvy_num}"]))       { $it['status'] = 'dup';   $it['msg'] = '이미 등록된 송장'; }
                    else $exists["{$odm_id}_{$dlvy_num}"] = true;           //  같은 파일 안의 중복 행 방지
                    $row['items'][] = $it;
                }
            }
            if (!count($row['items'])) $row['items'][] = ['od_id' => 0, 'odm_id' => 0, 'name' => '', 'status' => 'error', 'msg' => $row['msg'] ?: '메모2 형식 오류'];
            $rows[] = $row;
        }

        $items = collect($rows)->pluck('items')->flatten(1);
        return [
            'rows' => $rows,
            'cnt'  => ['new' => $items->where('status', 'new')->count(), 'dup' => $items->where('status', 'dup')->count(), 'error' => $items->where('status', 'error')->count()],
        ];
    }
}
