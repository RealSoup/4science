<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods};

class RentalController extends Controller {   
    protected $goods;
	public function __construct( Goods $gd ) { $this->goods = $gd; }
	public function index(Request $req) {
        $qry = $this->goods->search($req, 0, 100)->addSelect('shop_goods.gd_desc')->get();
        return response()->json($qry, 200);
    }
}
