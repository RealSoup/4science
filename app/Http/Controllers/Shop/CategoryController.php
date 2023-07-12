<?php

namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveCategory;
use App\Models\Shop\Category;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\SaveCategoryRequest;
use Illuminate\Support\Facades\Redis;
use Session;
use DB;
use Cache;

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
	public function indexAll(Request $req) { return response(Redis::get('categoryAll'))->header('Content-Type', 'application/json'); }
}
