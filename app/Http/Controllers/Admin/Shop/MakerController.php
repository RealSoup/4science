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
        $this->maker->mk_name = trim($req->mk_name);
        $this->maker->created_id = auth()->user()->id;
        $this->maker->ip = $req->ip();
        if ($this->maker->save())
            return response()->json($this->maker->toArray(), 200);         
    }

    public function edit(Request $req, $mk_id) {
        $data = $this->maker->find($mk_id);
        $data->fileInfo;
        
        return response()->json($data);   
    }

	public function update(Request $req, $mk_id) {
        DB::table('shop_makers')->where('mk_id', $mk_id)->update([
            'mk_name'       => $req->filled('mk_name') ? $req->mk_name : '',
            'mk_desc'       => $req->filled('mk_desc') ? $req->mk_desc : '',
            'updated_id'    => auth()->user()->id,
            'ip'            => $req->ip() 
        ]);
		return response()->json('success', 200);
    }
    
    public function destroy($mk_id) {
		if(Maker::destroy($mk_id)) return response()->json('success', 200);
		else return response()->json("Fail", 500);
    }
}
