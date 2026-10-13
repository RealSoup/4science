<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreGiftCard;
use App\Models\{User, UserMileage};
use DB;

class MileageController extends Controller {
    protected $mileage;

    public function __construct(Request $req, UserMileage $ml) {
        $this->mileage = $ml;
    }

    public function index(Request $req) {
        $rst = array();
        $uid = auth()->user()->id;
        $ml = $this->mileage->with('orderModel')->Uid($uid)->latest()->orderByDesc('ml_id');
        $rst['list'] = $ml->paginate(10);
        $rst['list']->appends($req->all())->links();
        $rst['config'] = UserMileage::$config['voucher'];

        // 소멸 예정 요약
        $enable = (int)$this->mileage->enableMileage($uid);
        $soon   = (int)$this->mileage->Uid($uid)->ExpiringWithin(30)->sum('ml_enable_m');
        $first  = $this->mileage->Uid($uid)->Enable()->where('ml_enable_m', '>', 0)->min('created_at');
        $rst['expire'] = [
            'soon_m'    => max(0, min($soon, $enable)),   // 가용 마일리지보다 크게 보이지 않도록 제한
            'next_date' => $first ? \Carbon\Carbon::parse($first)->addYearNoOverflow()->format('Y-m-d') : null,
        ];
        return response()->json($rst, 200);
    }

    public function enable() { return $this->mileage->enableMileage(auth()->user()->id); }
    
    public function store(StoreGiftCard $req) {
        $uid = auth()->user()->id;
        $p   = intval(-UserMileage::$config['voucher'][$req->type]['point'] * $req->ea);
        if ($p >= 0) return response()->json(['message' => '잘못된 요청입니다.'], 403);

        return DB::transaction(function () use ($req, $uid, $p) {
            User::where('id', $uid)->lockForUpdate()->first();   // 동시 신청 방지

            if ($this->mileage->enableMileage($uid) < -$p)
                return response()->json(['message' => '마일리지가 모자릅니다.'], 403);

            UserMileage::insert([
                "ml_uid"      => $uid,
                "ml_tbl"      => 'voucher',
                "ml_key"      => 0,
                "ml_type"     => 'REQ',
                "ml_content"  => "{$req->type}||{$req->ea}||{$req->name}||{$req->hp}",
                "ml_mileage"  => $p,
                "ml_enable_m" => $p,
                'created_id'  => $uid,
            ]);
            return response()->json($this->enable(), 200);
        });
    }

    // public function update(Request $req, $id) {
    //     DB::table('Mileage')->where('ml_id', $id)->update([
    //         "ml_key" => $req->filled('ml_key') ? $req->ml_key : 0,
    //         "updated_id"  => auth()->check() ? auth()->user()->id : 0
    //     ]);        
    //     return response()->json("success", 200);
    // }
}
