<?php

namespace App\Exports;


use Maatwebsite\Excel\Concerns\{FromCollection, WithHeadings, WithStyles};
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use App\Models\Shop\{Order, OrderModel};
use App\Models\{UserMng};
use DB;

class OrderListExport implements FromCollection, WithHeadings, WithStyles {
    protected $req;
    function __construct($req) { $this->req = $req; }
	
	public function headings(): array {
        return [
			'회원번호',
			'이메일',
			'글번호',
			'주문번호',
			'주문상품',
			'결제금액',
			'담당자',
			'소속',
			'주문자',
			'결제수단',
			'진행현황'
        ];
    }

	public function styles(Worksheet $sheet) {

		$sheet_style = [
            'A1:J1' => [
                'font' => ['size' => 12, 'bold' => true],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                    'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                ],
				'fill' => [
					'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
					'startColor' => [ 'argb' => 'FFc0ffba' ],
				],
            ],
		];
        return $sheet_style;
    }

    public function collection() {
        $config_pay_method = Order::$orderConfig['pay_method'];
        $pay_method_query_str = "case ";
        foreach ($config_pay_method as $k => $v)
            $pay_method_query_str .= "when od_pay_method = '".$k."' then '".$v."' ";
        $pay_method_query_str .= " end";

		$config_od_step = Order::$orderConfig['step'];
        $od_step_query_str = "case ";
        foreach ($config_od_step as $k => $v)
            $od_step_query_str .= "when od_step = '".$k."' then '".$v['name']."' ";
        $od_step_query_str .= " end";

        $req = $this->req;
        $orders = Order::with('orderExtraInfo')
        ->select("od_orderer_email", "created_id", "od_id", "od_no", "od_name", "od_all_price",
			DB::raw("(SELECT name FROM la_users WHERE id = od_mng) AS mng_nm"),
            "od_company", "od_orderer", 
            DB::raw($pay_method_query_str),
			DB::raw($od_step_query_str)
        )
		->when($req->startDate,     fn ($q, $v) => $q->StartDate($v))
        ->when($req->endDate,		fn ($q, $v) => $q->EndDate($v))
		->when($req->od_type,		fn ($q, $v) => $q->where('od_type', $v))
		->when($req->od_pay_method,	fn ($q, $v) => $q->where('od_pay_method', $v))
		->when($req->od_step,		fn ($q, $v) => $q->where('od_step', $v))
        ->when($req->od_mng,		function ($q, $v) {
			if ($v == 'no') return $q->whereNull('od_mng');
			else return $q->where('od_mng', $v);
		});

		if (!empty($req['startPrice'])) { 	$orders = $orders->where('od_all_price', '>=', preg_replace('/\D/', '', $req['startPrice'])); }
		if (!empty($req['endPrice'])) { 	$orders = $orders->where('od_all_price', '<=', preg_replace('/\D/', '', $req['endPrice'])); }
        if (!empty($req['um_group'])) {
			$group = UserMng::Group($req['um_group'])->pluck('um_user_id');
			$orders = $orders->whereIn('od_mng', (count($group) ? $group : ['']));
		}
		if (!empty($req['sale_env']))	$orders = $orders->where('od_sale_env', $req['sale_env']);
        if (!empty($req['keyword'])){
			$txt = $req['keyword'];
            switch ($req['mode']) {
				case 'od_orderer':		$orders = $orders->where('od_orderer', 'like', "%$txt%"); break;
				case 'orderer_email':	$orders = $orders->where('od_orderer_email', 'like', "%$txt%"); break;
				case 'orderer_hp':		$orders = $orders->where('od_orderer_hp', 'like', "%$txt%"); break;
				case 'od_company':		$orders = $orders->where('od_company', 'like', "%$txt%"); break;
				case 'od_no':			$orders = $orders->where('od_no', $txt); break;
				case 'od_id':			$orders = $orders->where('od_id', $txt); break;
				case 'od_receiver':		$orders = $orders->where('od_receiver', 'like' , "%$txt%"); break;
				case 'od_addr1':		$orders = $orders->where('od_addr1', 'like' , "%$txt%"); break;
				case 'oex_depositor':
					$ids = $this->orderExtraInfo::where('oex_depositor', 'like' , "%$txt%")->pluck('oex_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'gm_name':
					$ids = OrderModel::where('odm_gm_name', 'like', "%{$txt}%")->pluck('odm_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'gm_code':
					$ids = OrderModel::where('odm_gm_code', 'like', "%{$txt}%")->pluck('odm_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'catno':
					$ids = OrderModel::where('odm_gm_catno', 'like', "{$txt}%")->pluck('odm_od_id');
					$orders = $orders->whereIn('od_id', (count($ids) ? $ids : ['']));
				break;
				case 'u_id':			$orders = $orders->where('created_id', $txt); break;				
            }
        }
		// echo_query($orders);
        return $orders->get();
    }
}
