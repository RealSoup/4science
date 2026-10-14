<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods};

class RentalController extends Controller {
    protected $goods;
	public function __construct( Goods $gd ) { $this->goods = $gd; }

    //  렌탈 상품 목록 - 우선순위(gd_seq) → 순위(gd_rank) → 조회수 순, 삭제 상품 제외
	public function index(Request $req) {
        $list = $this->goods->with(['maker', 'goodsModel', 'goodsModelPrime'])
            ->where('gd_type', 'REN')
            ->orderBy('gd_seq')->orderBy('gd_rank')->orderBy('gd_view_cnt')
            ->limit(100)->get()
            ->each(fn($g) => $g->mk_name = $g->maker->mk_name ?? '');     //  화면은 mk_name 사용
        return response()->json($list, 200);
    }
}
