<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreGiftCard;
use App\Models\{Mileage, User};
use DB;

class MileageController extends Controller {
    protected $mileage;

    public function __construct(Request $req, Mileage $ml) {
        $this->mileage = $ml;
    }

    public function index(Request $req) {
        $id = 0;
        if($req->filled('id')) $id = $req->id;
        else $id = auth()->user()->id;
        $po = $this->mileage->Uid($id)->latest();
        $po = $po->paginate(10);
        $po->appends($req->all())->links();
        return response()->json($po, 200);
    }
    public function enable() {
        $data = auth()->user()->mileage()->where([
            ['created_at', '>', date("Y-m-d", strtotime("-1 years"))],
            ['ml_mileage', '>', 0],
        ])->sum('ml_enable_m');
        return response()->json($data, 200);
    }

    public function store(StoreGiftCard $req) {
        Mileage::insert([
            "ml_uid"      => auth()->check() ? auth()->user()->id : 0,
            "ml_content"  => '신세계 상품권 '.$req->type.'만원||'.$req->ea.'||'.$req->name.'||'.$req->hp,
            "ml_mileage"    => $req->type == '5' ? -50000 : -100000,
            // "ml_enable_p" => $req->type == '5' ? -50000 : -100000,
            'created_id'  => auth()->check() ? auth()->user()->id : 0
        ]);
        return response()->json("success", 200);
    }

    public function update(Request $req, $id) {
        DB::table('Mileage')->where('ml_id', $id)->update([
            "ml_key" => $req->filled('ml_key') ? $req->ml_key : 0,
            "updated_id"  => auth()->check() ? auth()->user()->id : 0
        ]);        
        return response()->json("success", 200);
    }
}
