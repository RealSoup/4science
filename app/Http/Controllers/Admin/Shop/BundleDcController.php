<?php

namespace App\Http\Controllers\Admin\shop;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shop\BundleDc;

class BundleDcController extends Controller {
    public function findGmId($id) {
        return response()->json(BundleDc::Gm_id($id)->get(), 200);
    }
}
