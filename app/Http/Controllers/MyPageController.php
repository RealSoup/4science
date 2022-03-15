<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MyPageController extends Controller {
    
    public function index() {
        $data['order'] = auth()->user()->order->take(5);
        $data['estimateReq'] = auth()->user()->estimateReq->take(5);
        foreach ($data['estimateReq'] as $v)
            $v->estimateReply;
        return response()->json($data, 200);
    }

    public function print($code) {
        return view('print', ['code'=>$code]);
    }
}
