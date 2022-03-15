<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreGiftCard;
use App\Models\Point;

class PointController extends Controller {
    public function index(Request $req) {
        $po = auth()->user()->point()->latest();
        $po = $po->paginate(10);
        $po->appends($req->all())->links();
        return response()->json($po, 200);
    }
    public function enable() {
        $data = auth()->user()->point()->where([
            ['created_at', '>', date("Y-m-d", strtotime("-1 years"))],
            ['po_point', '>', 0],
        ])->sum('po_enable_p');
        return response()->json($data, 200);
    }

    public function store(StoreGiftCard $req) {
        Point::insert([
            "po_uid"      => auth()->check() ? auth()->user()->id : 0,
            "po_content"  => '신세계 상품권 '.$req->type.'만원||'.$req->ea.'||'.$req->name.'||'.$req->hp,
            "po_point"    => $req->type == '5' ? -50000 : -100000,
            // "po_enable_p" => $req->type == '5' ? -50000 : -100000,
            'created_id'  => auth()->check() ? auth()->user()->id : 0
        ]);
        return response()->json("success", 200);
    }
}
