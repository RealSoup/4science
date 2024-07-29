<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop\{OrderModel};
use App\Events\{Mileage};
use DB;

class EventController extends Controller {

    public function rankingSales(Request $req) {
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
            ->where('od_type', '<>', 'buy_temp')
            ->where('od_step', '>=', '20')
            ->where('od_step', '<', '60')
            ->whereYear('shop_order.created_at', '2024')
            ->whereMonth('shop_order.created_at', '7')
            ->groupBy('users.id')
            ->orderBy('price', 'desc')
            ->limit(20)
            ->get();
      
        foreach ($rst as $k => $v) {
            if (mb_strlen($v->name, 'utf-8') == 2) 
                $v->name = mb_substr($v->name, 0, 1, 'utf-8')."*";
            else
                $v->name = mb_substr($v->name, 0, 1, 'utf-8').str_repeat("*",mb_strlen($v->name, 'utf-8')-2).mb_substr($v->name, -1, 1, 'utf-8');
            // preg_replace("/(^.)./u", "$1*", $v->name);
            // $email = explode('@', $v->email);
            // $v->email = str_pad(substr($email[0], 0, 2), strlen($email[0]), "*")."@".$email[1];
        }
        return response()->json($rst);
    }

    public function attendIndex(Request $req) {
        $rst = Array();
        if (auth()->check()) {
            $rst['data'] = DB::table('user_attend')
                ->where('ua_id', auth()->user()->id)
                ->whereYear('ua_date', $req->year)
                ->whereMonth('ua_date', $req->month)
                ->groupBy(DB::raw("DATE(ua_date)"))
                ->orderBy('ua_date')
                ->pluck('ua_date');

            $rst['sum_mileage'] = array_reduce($rst['data']->toArray(), fn($carry, $el) => 
                $carry + (
                    in_array( date('w', strtotime($el)), ['0', '6'] ) ? 200 : 100
                )
            , 0);
        }
        return response()->json($rst);
    }

    public function attendStore(Request $req) {
        $rst = 'Exist';
        $today = '2024-07-31';
        if ( !auth()->check() )
            $rst = 'login required';
        else if (DB::table('user_attend')->where('ua_id', auth()->user()->id)->whereDate('ua_date', DB::raw('CURDATE()'))->doesntExist()) {
        // if (DB::table('user_attend')->where('ua_id', auth()->user()->id)->whereDate('ua_date', $today)->doesntExist()) {
            $rst = DB::table('user_attend')->insert([ 'ua_id' => auth()->user()->id ]);
            // $rst = DB::table('user_attend')->insert([ 'ua_id' => auth()->user()->id, 'ua_date'=> date('Y-m-d H:i:s', strtotime($today)) ]);
            $p = in_array(date('w', strtotime("Now")), ['0', '6']) ? 200 : 100;
            // $p = in_array(date('w', strtotime($today)), ['0', '6']) ? 200 : 100;
            event(new Mileage("insert", auth()->user()->id, 'users', auth()->user()->id, 'SV', '출석 체크', $p));
            if (date('Y-m-t') == date("Y-m-d")) {
            // if ('2024-07-31' == $today) {
                $r = DB::table('user_attend')->where('ua_id', auth()->user()->id)->groupBy(DB::raw("DATE(ua_date)"))->pluck('ua_date');
                if (count($r) === intval(date('t'))) {
                    event(new Mileage("insert", auth()->user()->id, 'users', auth()->user()->id, 'SV', 'ALL 출석', 1000));
                    $rst = 'Perfect Attendance';
                }
            }
        }
        return response()->json($rst);
    }

}