<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{EngReform};
use DB;

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
        $eng = $eng->latest()->paginate(10);
        return response()->json($eng, 200);
    }

    public function edit(Request $req, $er_id) {
        return response()->json(EngReform::find($er_id), 200);
    }
}
