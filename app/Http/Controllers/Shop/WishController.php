<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Wish, Goods};

class WishController extends Controller {
	public function index() {
        foreach ($rst = auth()->user()->wish as $w) {
            $w->goodsModel->goods;
        }    
		return response()->json($rst, 200);
    }
}
