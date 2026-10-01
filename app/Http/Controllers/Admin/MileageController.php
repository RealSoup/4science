<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{User, UserMileage};
use DB;

class MileageController extends Controller {
    protected $mileage;

    public function __construct(Request $req, UserMileage $ml) {
        $this->mileage = $ml;
    }

    public function index(Request $req, $id) {
        $rst = array();
        $ml = $this->mileage->with('orderModel')->Uid($id)->latest();
        if ($req->filled('limit'))
            $rst['list'] = $ml->limit($req->limit)->get();
        else {
			$rst['list'] = $ml->paginate(10);
            $rst['list']->appends($req->all())->links();
		}
        $rst['config'] = UserMileage::$config;
        return response()->json($rst, 200);
    }

    public function store(Request $req, $id) {
        $p = intval(preg_replace("/[^\d]/", "", $req->mileage));
        $ml_type = 'SV';
        if($req->type=='minus') {
            $p = $p*(-1);
            $ml_type = 'SP';
        }
        UserMileage::insert([
            "ml_uid"     => $id,
            "ml_tbl"     => 'admin',
            "ml_key"     => 0,
            "ml_type"    => "{$ml_type}",
            "ml_content" => "{$req->msg}",
            "ml_mileage" => $p,
            "ml_enable_m" => $p,
            'created_id' => auth()->check() ? auth()->user()->id : 0
        ]);
        return response()->json(['list'=>$this->index($req, $id)->original['list'], 'mileage'=>$this->enable($id)], 200);
    }

    public function update(Request $req, $id) {
        return DB::transaction(function () use ($req, $id) {
            $ml = $this->mileage->lockForUpdate()->findOrFail($id);
            if ($ml->ml_type !== 'REQ' || !in_array($req->ml_type, ['OK', 'NO']))
                return response()->json(['message' => '대기 상태만 승인/반려할 수 있습니다.'], 422);

            $need = -$ml->ml_mileage;

            if ($req->ml_type == 'OK') {
                if ($this->enable($ml->ml_uid) < 0)
                    return response()->json(['message' => '가용 마일리지가 마이너스입니다. 다른 대기 건을 먼저 확인하세요.'], 422);
                $rows = $this->mileage->Uid($ml->ml_uid)->Enable()
                            ->where('ml_enable_m', '>', 0)
                            ->orderBy('created_at')->orderBy('ml_id')
                            ->lockForUpdate()->get();

                if ($rows->sum('ml_enable_m') < $need)
                    return response()->json(['message' => '유효 마일리지가 부족합니다. (만료 등)'], 422);

                $remain = $need;
                foreach ($rows as $v) {
                    $use = min($v->ml_enable_m, $remain);
                    DB::table('user_mileage')->where('ml_id', $v->ml_id)
                        ->update(['ml_type' => 'SP', 'ml_enable_m' => $v->ml_enable_m - $use]);
                    if (($remain -= $use) <= 0) break;
                }
            }

            $ml->ml_type = $req->ml_type;
            $ml->ml_enable_m = 0;
            $ml->updated_id = auth()->user()->id;
            $ml->save();
            return response()->json('success', 200);
        });
    }

    public function enable($id) {
        return $this->mileage->enableMileage($id);
    }
}
