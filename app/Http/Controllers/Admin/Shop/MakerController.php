<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Maker;
use App\Http\Requests\SaveMakerRequest;
use Session;
use Illuminate\Support\Facades\DB;

class MakerController extends Controller {

    protected $maker;
	protected $params;

    public function __construct(Maker $maker, Request $req) {
        $this->maker = $maker;
    }

	public function index(Request $req) {
		$data = $req->input();
		if ($req->filled('mk_name'))   $this->maker = $this->maker->SchMkName($req->mk_name);
        if ($req->filled('shop_mode')) $this->maker = $this->maker->whereNotNull('mk_desc')->where('mk_desc', '!=', '');
        

        $this->maker = $this->maker->orderBy('mk_name');
        if ($req->filled('type') && $req->type == 'all')    $this->maker = $this->maker->get();
        else $this->maker = $this->maker->paginate();
		$data['list'] = $this->maker;        
        return response()->json($data);
    }

    public function store(SaveMakerRequest $req) {
        $this->maker = $this->maker_paramImplant($this->maker, $req);
        $this->maker->created_id = auth()->user()->id;
        if ($this->maker->save())
            return response()->json($this->maker->toArray(), 200);
    }

    public function edit(Request $req, $mk_id) {
        $data = $this->maker->find($mk_id);
        $data->fileInfo;
        
        return response()->json($data);   
    }

    public function update(Request $req, $mk_id) {
        $maker = $this->maker->find($mk_id);
        $maker = $this->maker_paramImplant($maker, $req);
        $maker->updated_id = auth()->user()->id;
        $rst = $maker->save();

        DB::table('infos')->where('key', 'update_key_maker_shop')->update(['val' => uniqid()]);

        if ($rst) return response()->json('success', 200);
        else return response()->json(["message"=>"Fail"], 500);
    }

    // 제조사 저장/수정 공통 필드 매핑 (store, update 공용)
    public function maker_paramImplant($maker, $req) {
        $maker->mk_name         = $req->filled('mk_name') ? trim($req->mk_name) : $maker->mk_name;
        $maker->mk_desc         = $req->filled('mk_desc') ? $req->mk_desc : '';
        $maker->mk_currency     = $req->filled('mk_currency') ? $req->mk_currency : 'KRW';
        $maker->mk_customs_rate = $req->filled('mk_customs_rate') ? $req->mk_customs_rate : 0;
        $maker->mk_margin_rate  = $req->filled('mk_margin_rate') ? $req->mk_margin_rate : 0;
        $maker->ip              = $req->ip();
        return $maker;
    }
    
    public function destroy($mk_id) {
		if(Maker::destroy($mk_id)) return response()->json('success', 200);
		else return response()->json("Fail", 500);
    }
}
