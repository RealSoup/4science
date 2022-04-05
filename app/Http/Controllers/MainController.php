<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShowWindow;
use Illuminate\Support\Facades\Cache;
use DB;

class MainController extends Controller {
    public function index(Request $request) {
        $rst = Array();
        foreach (Cache::get('categoryAll') as $ca) {
            $rst[$ca['ca_id']] = ShowWindow::with('goods')
            ->where('sw_type', 'ca_best')
            ->where('sw_group', $ca['ca_id'])
            ->orderBy('sw_seq')
            ->get();
        }
        return response()->json($rst);
    }
}
