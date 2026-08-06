<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop\{Goods};

class SpaController extends Controller {

    protected $goods;

	public function __construct( Goods $gd ) { $this->goods = $gd; }

    public function index(Request $request) {
        $meta = $this->getMeta($request);  // [추가]
        return view("spa", [
            'auth_user' => auth()->user(),
            'meta'      => $meta,           // [추가]
        ]);
    }

    private function getMeta(Request $request) {
        $path = $request->path();

        // 상품 페이지: shop/goods/{id}
        if (preg_match('/^shop\/goods\/(\d+)$/', $path, $m)) {
            $goods = $this->goods->find($m[1]);

            if ($goods) {
                $title       = $goods->gd_name . ' | 4science';
                $description = mb_substr(strip_tags($goods->gd_name), 0, 160) . ' - 4science 과학기자재 쇼핑몰';
                $image       = $goods->image_src[0] ? 'https://4science.net/' . ltrim($goods->image_src[0], '/') : 'https://4science.net/storage/common/logo/logo.png';

                return compact('title', 'description', 'image');
            }
        }

        // 기본값
        return [
            'title'       => '4science | 과학기자재 전문 쇼핑몰',
            'description' => '연구기관, 대학, 기업을 위한 과학기자재 전문 쇼핑몰 4science입니다.',
            'image'       => 'https://4science.net/storage/common/logo/logo.png',
        ];
    }
}
