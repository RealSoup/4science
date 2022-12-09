<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Outlet, Goods};

class OutletController extends Controller {
	public function index(Outlet $ol, Goods $gd, $code, $type, $group) {
        // if ($type == 'outlet') {
        //     $data = $ol->Code($code)->Group($group)->get();

        //     foreach ($data as $v) {
        //         $rst[] = $v->goods;
        //     }
        // } else {
        //     if ($code == 'pipette') {
        //         switch ($group) {
        //             case 1:
        //                 $rst = $gd->joinGoodsCate()->ca01(93)->ca02(95)->ca03(100)->ca04(104)->get();
        //             break;
        //         }
        //     }
        // }
        $rst = $gd->joinGoodsCate()->ca01(28)->ca02(3390)->ca03(3391)->get();

		return response()->json($rst, 200);
    }
}
