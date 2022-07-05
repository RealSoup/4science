<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{Mileage, User};
use DB;

class MileageController extends Controller {
    protected $mileage;

    public function __construct(Request $req, Mileage $ml) {
        $this->mileage = $ml;
    }

    public function index(Request $req) {
        $id = 0;
        $ml = $this->mileage;
        if ($req->filled('writer')) $ml = $ml->Uid($req->writer);
        if ($req->filled('ml_type')) $ml = $ml->Type($req->ml_type);
        if ($req->filled('ml_key')) $ml = $ml->Key($req->ml_key);
        $ml = $ml->latest();
        if ($req->filled('limit'))
            $ml = $ml->limit($req->limit)->get();
        else {
			$ml = $ml->paginate(10);
            $ml->appends($req->all())->links();
		}


        
        return response()->json($ml, 200);
    }

    public function update(Request $req, $id) {
        DB::table('Mileage')->where('ml_id', $id)->update([
            "ml_key" => $req->filled('ml_key') ? $req->ml_key : 0,
            "updated_id"  => auth()->check() ? auth()->user()->id : 0
        ]);        
        return response()->json("success", 200);
    }

    public function getRequesterVoucher(Request $req) {
        $ml = $this->mileage->with('user');
        if ($req->filled('ml_type')) $ml = $ml->Type($req->ml_type);
        if ($req->filled('ml_key')) $ml = $ml->Key($req->ml_key);
        $ml = $ml->latest()->get();
        return response()->json($ml, 200);
    }
}
