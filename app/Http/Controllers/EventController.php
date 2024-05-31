<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop\{OrderModel};
use DB;

class EventController extends Controller {

    public function rankingSales(Request $req) {
        
        
        
        /*
        $order = Order::with('orderModel')
            ->leftJoin('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
            ->select('odm_gm_code', 'odm_gm_catno', 'od_id')
            ->selectRaw(" COUNT(*) all_order,
                          SUM(la_shop_order_model.odm_ea) all_ea,
                          SUM(la_shop_order_model.odm_price*la_shop_order_model.odm_ea) all_price ")
            ->where('od_step', '>=', '20')
            ->where('od_step', '<', '60')
            ->groupBy('odm_gd_id')
            ->havingRaw("odm_gm_code <> '' AND odm_gm_code <> '-' AND odm_gm_catno <> '' AND odm_gm_catno <> '-' AND odm_gd_id > 0" )
            ->whereYear('shop_order.created_at', '2023')
            ->orderBy('all_order', 'desc')
            ->limit(30)
            ->get();
        */

        $rst = OrderModel::rightJoin('shop_order', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
            ->select('odm_gm_code', 'odm_gm_catno', 'odm_gd_id', 'odm_gd_name')
            ->selectRaw(" COUNT(*) all_order,
                          SUM(la_shop_order_model.odm_ea) all_ea,
                          SUM(la_shop_order_model.odm_price*la_shop_order_model.odm_ea) all_price ")
            ->where('od_step', '>=', '20')
            ->where('od_step', '<', '60')
            ->groupBy('odm_gd_id')
            ->havingRaw("odm_gm_code <> '' AND odm_gm_code <> '-' AND odm_gm_catno <> '' AND odm_gm_catno <> '-' AND odm_gd_id > 0" )
            ->whereYear('shop_order.created_at', '2024')
            ->orderBy('all_order', 'desc')
            ->limit(30)
            ->get();
        return response()->json($rst);
    }

    public function rankingBuyer(Request $req) {
        
        $rst = DB::table('shop_order')
            ->join('users', 'shop_order.created_id', '=', 'users.id')
            ->select('users.name', 'users.id')
            ->selectRaw("SUM(od_all_price) price")
            ->where('od_step', '>=', '20')
            ->where('od_step', '<', '60')
            ->whereYear('shop_order.created_at', '2024')
            ->whereMonth('shop_order.created_at', '5')
            ->groupBy('users.id')
            ->orderBy('price', 'desc')
            ->limit(20)
            ->get();
        return response()->json($rst);
    }

}