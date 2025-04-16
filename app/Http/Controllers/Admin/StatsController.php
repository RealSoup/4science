<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class StatsController extends Controller {
    public function user(Request $req) {
        $user = DB::table('users')
            ->selectRaw("
                COUNT(*) sign_up,
                COUNT(case when sex='male' then 1 end) as male,
                COUNT(case when sex='female' then 1 end) as female
            ")     
            ->groupBy('label')
            ->orderBy('label');
        if ($req->filled('month')) {
            $user = $user
                // ->selectRaw(" date_format(created_at, '%m-%d') label ")
                ->selectRaw(" DAY(created_at) label ")
                ->whereYear('created_at', $req->year)
                ->whereMonth('created_at', $req->month);
        } else if ($req->filled('year')) {
            $user = $user
                ->selectRaw(" MONTH(created_at) label ")
                ->whereYear('created_at', $req->year);
        } else {
            $user = $user->selectRaw(" YEAR(created_at) label ");
        }
        $user = $user->get();
        // dd($user);
        $data = array();
        $data['label'] = $user->pluck('label');
        $data['sign_up'] = $user->pluck('sign_up');
        $data['male'] = $user->pluck('male');
        $data['female'] = $user->pluck('female');
        return response()->json($data);
    }

    public function order(Request $req) {
        $order = DB::table('shop_order')
            ->selectRaw("SUM(od_all_price) price")
            ->where('od_step', '>=', '20')
            ->where('od_step', '<', '60')
            ->groupBy('label')
            ->orderBy('label');
        if ($req->filled('month')) {
            $order = $order
                ->selectRaw(" date_format(created_at, '%m-%d') label ")
                // ->selectRaw(" DAY(created_at) label ")
                ->whereYear('created_at', $req->year)
                ->whereMonth('created_at', $req->month);
        } else if ($req->filled('year')) {
            $order = $order
                ->selectRaw(" date_format(created_at, '%Y-%m') label ")
                ->whereYear('created_at', $req->year);
        } else {
            $order = $order->selectRaw(" YEAR(created_at) label ");
        }
        $order = $order->get();
        return response()->json($order);
    }

    public function goods(Request $req) {
        $order = DB::table('shop_order')
            ->leftJoin('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
            ->select('odm_gm_name', 'odm_gm_catno', 'odm_gd_id')
            ->selectRaw(" COUNT(*) all_order,
                          SUM(la_shop_order_model.odm_ea) all_ea,
                          SUM(la_shop_order_model.odm_price*la_shop_order_model.odm_ea) all_price ")
            ->where('od_step', '>=', '20')
            ->where('od_step', '<', '60')
            ->groupBy('odm_gm_code')
            ->havingRaw("odm_gm_code <> '' AND odm_gm_code <> '-' AND odm_gm_catno <> '' AND odm_gm_catno <> '-'" );

        if ($req->filled('month')) {
            $order = $order
                // ->selectRaw(" date_format(created_at, '%m-%d') label ")
                // ->selectRaw(" DAY(created_at) label ")
                ->whereYear('created_at', $req->year)
                ->whereMonth('created_at', $req->month);
        } else if ($req->filled('year')) {
            $order = $order
                // ->selectRaw(" date_format(created_at, '%Y-%m') label ")
                ->whereYear('created_at', $req->year);
        } else {
            // $order = $order->selectRaw(" YEAR(created_at) label ");
        }
        // ->reorder('email', 'desc')
        // echo_query($order->reorder('all_ea', 'desc')->limit(1000));
        $rst['by_allPrice'] = $order->orderBy('all_price', 'desc')->limit(30)->get();
        $rst['by_allEa'] = $order->reorder('all_ea', 'desc')->get();
        $rst['by_allOrder'] = $order->reorder('all_order', 'desc')->get();
        return response()->json($rst);
    }

    public function userOrder(Request $req) {
        $order = DB::table('shop_order')
            ->join('users', 'shop_order.created_id', '=', 'users.id')
            ->select('users.name', 'users.id')
            ->selectRaw("SUM(od_all_price) price")
            ->where('od_step', '>=', '20')
            ->where('od_step', '<', '60')
            ->groupBy('users.id')
            ->orderBy('price', 'desc');
        if ($req->filled('month')) {
            $order = $order
                // ->selectRaw(" date_format(created_at, '%m-%d') label ")
                // ->selectRaw(" DAY(created_at) label ")
                ->whereYear('shop_order.created_at', $req->year)
                ->whereMonth('shop_order.created_at', $req->month);
        } else if ($req->filled('year')) {
            $order = $order
                // ->selectRaw(" date_format(created_at, '%Y-%m') label ")
                ->whereYear('shop_order.created_at', $req->year);
        } else {
            // $order = $order->selectRaw(" YEAR(created_at) label ");
        }
        $order = $order->limit(30)->get();
        return response()->json($order);
    }

    public function userAttend(Request $req) {
        $list = DB::table('user_attend')
            ->join('users', 'user_attend.ua_id', '=', 'users.id')
            ->select('users.name', 'users.id')
            ->selectRaw("count(*) cnt")
            ->whereYear('user_attend.ua_date', '2024')
            ->whereMonth('user_attend.ua_date', '8')
            ->groupBy('user_attend.ua_id')
            ->orderBy('cnt', 'desc')
            ->when($req->onlyCustomer=='Y', fn ($q, $v) => $q->where('users.level', '<=', 20))
            ->limit(30)
            ->get();
        return response()->json($list);
    }

    public function schKeyword(Request $req) {
        $list = DB::table('search_keyword')
            ->leftjoin('users', 'search_keyword.sk_uid', '=', 'users.id')
            ->select('search_keyword.sk_keyword')
            ->selectRaw("count(*) cnt")
            ->groupBy('search_keyword.sk_keyword')
            ->orderBy('cnt', 'desc');
        if ($req->filled('month')) {
            $list = $list->whereYear('search_keyword.created_at', $req->year)
                        ->whereMonth('search_keyword.created_at', $req->month);
        } else if ($req->filled('year')) {
            $list = $list->whereYear('search_keyword.created_at', $req->year);
        }
        // echo_query($list->limit(30));
        $list = $list->limit(30)->get();
  
        return response()->json($list);
    }
    
}
