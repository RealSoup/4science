<?php

namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Maker;
use App\Http\Requests\SaveMakerRequest;
use Session;

class MakerController extends Controller {

    protected $maker;
	protected $params;

    public function __construct(Maker $maker, Request $req) {
        $this->maker = $maker;
    }

	public function index(Request $req) {
		$data = $req->input();
		if ($req->filled('mk_name'))   $this->maker = $this->maker->SchMkName($req->mk_name);

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

	public function update(SaveMakerRequest $req, $mk_id) {
		$maker = Maker::updateOrCreate(
			['mk_id' => $mk_id],
			[ 	'mk_name' => $req->mk_name,
				'created_id'    => auth()->user()->id,
	            'ip'            => $req->ip()  ]
		);
		if ($maker->mk_id) Session::flash('message', '제조사 수정 성공');
        else Session::flash('message', '제조사 수정 실패');
	   	return redirect()->route('admin.shop.maker.index');
    }

    public function destroy($mk_id) {
		if(Maker::destroy($mk_id)) Session::flash('message', '제조사 삭제 성공');
		else Session::flash('message', '제조사 삭제 실패');
        return redirect()->route('admin.shop.maker.index');
    }
}
