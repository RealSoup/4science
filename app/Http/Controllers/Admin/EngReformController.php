<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{EngReform};
use DB;
use Cache;

class EngReformController extends Controller {

    public function __construct() {
        // $this->middleware('auth');
    }

    public function index(Request $req) {
        $eng = EngReform::with('user');
        if ($req->startDate)    $eng = $eng->StartDate($req->startDate.' 00:00:00');
        if ($req->endDate)      $eng = $eng->EndDate($req->endDate.' 23:59:59');
        if ($req->er_step)      $eng = $eng->Step($req->er_step);
        if ($req->keyword){
            switch ($req->mode) {
                case 'er_name':   $eng = $eng->Name($req->keyword); break;
                case 'er_demand': $eng = $eng->Demand($req->keyword); break;
                case 'er_email':  $eng = $eng->Email($req->keyword); break;
                case 'er_tel':    $eng = $eng->Tel($req->keyword); break;
                case 'er_hp':     $eng = $eng->Hp($req->keyword); break;
            }
        }        
        $data['list'] = $eng->latest()->paginate(10);
		$data['mng_off'] = Cache::get('UserMngOff');
        return response()->json($data, 200);
    }

    public function edit(Request $req, $er_id) {
        $data['con'] = EngReform::find($er_id);
        $data['con']->fileInfo;
        //  배열값을 넘겨줘야 하는데 values 함수 안쓰면 Object가 넘어온다.
        $data['con']->file_info_cplt = $data['con']->fileInfo->where('fi_kind', 'cplt')->values();
        $data['con']->mng;
        $data['option'] = EngReform::$option;
        return response()->json($data, 200);
    }

    public function update(Request $req, $er_id) {
        $rst = DB::table('eng_reform')->where('er_id', $er_id)->update([ 
            'er_step'       => $req->filled('er_step') ? $req->er_step : 'ING', 
            'updated_id'    => auth()->user()->id,
        ]);
		return response()->json($rst);
    }
}
