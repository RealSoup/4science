<?php

namespace App\Exports;

use App\Models\Shop\Order;
use Maatwebsite\Excel\Concerns\{FromCollection, WithHeadings, WithStyles};
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use DB;

class OrderListExport implements FromCollection, WithHeadings, WithStyles {
    protected $req;
    function __construct($req) { $this->req = $req; }
	
	public function headings(): array {
        return [
			'글번호',
			'주문번호',
			'주문상품',
			'결제금액',
			'담당자',
			'소속',
			'주문자',
			'회원번호',
			'결제수단'
        ];
    }

	public function styles(Worksheet $sheet) {

		$sheet_style = [
            'A1:I1' => [
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
        $order_config = Order::$orderConfig['pay_method'];
        $pay_method_query_str = "case ";
        foreach ($order_config as $k => $v)
            $pay_method_query_str .= "when od_pay_method = '".$k."' then '".$v."' ";
        $pay_method_query_str .= " end";

        $req = $this->req;
        $orders = Order::with('orderExtraInfo')
        ->select("od_id", "od_no", "od_name", "od_all_price",
			DB::raw("(SELECT name FROM la_users WHERE id = od_mng) AS mng_nm"),
            "od_company", "od_orderer", "created_id", 
            DB::raw($pay_method_query_str)
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

		if (isset($data['startPrice'])) { 	$orders = $orders->where('od_all_price', '>=', preg_replace('/\D/', '', $data['startPrice'])); }
		if (isset($data['endPrice'])) { 	$orders = $orders->where('od_all_price', '<=', preg_replace('/\D/', '', $data['endPrice'])); }
        if (isset($data['um_group'])) {
			$group = UserMng::Group($data['um_group'])->pluck('um_user_id');
			$orders = $orders->whereIn('od_mng', (count($group) ? $group : ['']));
		}
		if (isset($data['sale_env']))	$orders = $orders->where('od_sale_env', $data['sale_env']);
        if (isset($data['keyword'])){
			$txt = $data['keyword'];
            switch ($data['mode']) {
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
		
        return $orders->get();
    }
}
