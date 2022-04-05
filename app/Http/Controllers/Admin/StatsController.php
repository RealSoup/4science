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
        // dd($order);
        $data = array();
        $data['label'] = $order->pluck('label');
        $data['price'] = $order->pluck('price');
        return response()->json($data);
    }
}
