<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\SearchLogService;

//  검색 결과 행동 기록 (AI 검색 1단계)
class SearchLogController extends Controller {
    public function click(Request $req) {
        $slId     = (int) $req->search_id;
        $gdId     = (int) $req->gd_id;
        $position = (int) $req->position;

        if ($slId > 0 && $gdId > 0 && $position > 0 && $position <= 10000)
            SearchLogService::click($req, $slId, $gdId, $position);

        return response()->json(['ok' => true]);
    }
}