<?php
namespace App\Http\Controllers\Shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\Listing;

class ListingController extends Controller {   
	public function index($code) {
        $rst = Listing::with('goods')->code($code)->get();
        return response()->json($rst, 200);
    }
}
