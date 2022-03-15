<?php

namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Maker;

class MakerController extends Controller {

	public function index() {
        return response()->json(Maker::all(), 200);
    }

}
