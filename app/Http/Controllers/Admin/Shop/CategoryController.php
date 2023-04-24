<?php

namespace App\Http\Controllers\Admin\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveCategoryRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use App\Models\Shop\Category;
use Session;
use DB;

class CategoryController extends Controller {
	protected $category;
	protected $params;
	public function __construct(Category $category, Request $req) { $this->category = $category; }
	/*
		카테고리를 캐쉬화 하는 함수는 
		App\Http\Controllers\Shop\CategoryController\indexAll()
		여기 있다.
	*/
	// public function indexInit(Request $req) {
	// 	$this->params['ca_id'] = array();	//	View에서 Loop 돌릴때 선택된 카테고리 배열이 필요하다.
	// 	$this->params['ca_id'][] = $this->params['ca_id01'] = $req->ca_id01 ?? NULL;
	// 	$this->params['ca_id'][] = $this->params['ca_id02'] = $req->ca_id02 ?? NULL;
	// 	$this->params['ca_id'][] = $this->params['ca_id03'] = $req->ca_id03 ?? NULL;
	// 	$this->params['ca_id'][] = $this->params['ca_id04'] = $req->ca_id04 ?? NULL;
	// 	$this->params['categorys'] = $this->category->getSltCate($this->params['ca_id']);
	// 	// $this->params['categorys'] = $this->category->getSltCate($ca_id);
	// 	return response()->json($this->params);
    // }


	public function show(Request $req, $ca_id) {
		$hasChild = false;
		if($req->filled('type') && $req->type == 'hasChild')
			$hasChild = true;
		$data = $this->category->getCate($ca_id, $hasChild);
		return response()->json($data, 200);
	}

    public function store(SaveCategoryRequest $req) {
		$this->category->ca_name = trim($req->ca_name);
		$this->category->ca_papa = $req->filled('ca_papa') ? trim($req->ca_papa) : 0;
		$this->category->ca_seq  = $req->filled('ca_seq') ? trim($req->ca_seq) : 0;
		$this->category->ca_tel  = $req->filled('ca_tel') ? trim($req->ca_tel) : NULL;
		if ($this->category->save()) {
			return response()->json(["msg"=>"success", 'ca_id'=>$this->category->ca_id], 200);
		}
    }

    public function update(Request $req, $ca_id) {
		$cate = $this->category->find($ca_id);
		$cate->ca_name = trim($req->ca_name);
		$cate->ca_tel  = trim($req->ca_tel);
		$cate->save();
		return response()->json('success', 200);
    }

	public function setSeq(Request $req) {
		$ca_siblings = $this->category->getCate($req->ca_papa);
		$ca_extract = $ca_siblings->pull($req->old_ca_seq);
		$ca_siblings->splice($req->ca_seq, 0, [$ca_extract]);
		foreach($ca_siblings as $seq => $val){
			$val->ca_seq = $seq;
			$val->save();
		}
		return response()->json('success', 200);
	}

	public function destroy($ca_id) {
		$msg = "카테고리 삭제";
		$resCode = 500;
		if ($this->category->cateChildCount($ca_id)){
			$msg = "하위 카테고리가 있습니다.";
			$resCode = 500;
		} else {
			if ($this->category->destroy($ca_id))
				$resCode = 200;
			else
				$msg = "카테고리 삭제 실패";
		}
		return response()->json(["msg"=>$msg], $resCode);
    }

	public function getName($ca_id) {
		if ($ca = $this->category->find($ca_id))
			return $ca->ca_name;
	}

	public function rewrite() {
		$k = uniqid();
		DB::table('shop_category')->where('ca_id', 1)->update(['ca_name' => $k]);
		$this->category->writeCateJsonFile();
	}
	
}
