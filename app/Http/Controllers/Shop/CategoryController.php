<?php

namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveCategory;
use App\Models\Shop\Category;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\SaveCategoryRequest;
use Illuminate\Support\Facades\Cache;
use Session;
use DB;

class CategoryController extends Controller {
	protected $category;
	protected $params;
	public function __construct(Category $category, Request $req) {
        $this->category = $category;
    }

	public function index(Request $req, int $ca_id=0) {
		$this->params['categorys'] = $this->category->getCate($ca_id);
		return response()->json($this->params);
    }
	public function indexAll(Request $req) {
		if (!Cache::has('categoryAll'))
			Cache::put('categoryAll', $this->cateTree());
		return response()->json(Cache::get('categoryAll'));
    }
	public function cateTree(int $ca_id=0, int $depth=1) {
		$ca = $this->category->select('ca_id', 'ca_papa', 'ca_name', 'ca_seq')->ca_papa($ca_id)->oldest('ca_seq')->get()->toArray();
		if ($depth < 4) {
			foreach ($ca as $key => $val)
				$ca[$key]['sub'] = $this->cateTree($val['ca_id'], $depth+1);
		}
		return $ca;
    }

}
