<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SitemapController extends Controller {

    const PER_PAGE = 50000;

    public function index() {
        $total = DB::table('shop_goods')
            ->whereNull('deleted_at')
            ->where('gd_enable', 'Y')
            ->count();

        $pages = ceil($total / self::PER_PAGE);

        $content = view('sitemap.index', compact('pages'))->render();
        return response($content, 200)->header('Content-Type', 'application/xml');
    }

    public function goods($page) {
        $goods = cache()->remember("sitemap_goods_{$page}", 60*60*24, function() use ($page) {
            return DB::table('shop_goods')
                ->select('gd_id', 'updated_at')
                ->whereNull('deleted_at')
                ->where('gd_enable', 'Y')
                ->orderBy('gd_id')
                ->offset(($page - 1) * self::PER_PAGE)
                ->limit(self::PER_PAGE)
                ->get();
        });

        $content = view('sitemap.goods', compact('goods'))->render();
        return response($content, 200)->header('Content-Type', 'application/xml');
    }
}