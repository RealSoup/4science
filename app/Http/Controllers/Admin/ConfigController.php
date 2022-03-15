<?php

namespace App\Http\Controllers\Admin;

use App\Models\Config;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Cache;

class ConfigController extends Controller {
    public function index() {
        $cfg = Config::all()->keyBy('key');
        foreach ($cfg as $v) {
            $v->var = json_decode($v->var);
        }
        return response()->json($cfg);
    }

    public function update(Request $req, Config $config) {
        if ($req->filled('site')) $config->updateOrCreate(['key' => 'site'], ['var' => json_encode($req->site)]);
        if ($req->filled('biz')) $config->updateOrCreate(['key' => 'biz'], ['var' => json_encode($req->biz)]);
        if ($req->filled('bank')) $config->updateOrCreate(['key' => 'bank'], ['var' => json_encode($req->bank)]);
        Cache::forget("site");   Cache::put('site', $req->site);
        Cache::forget("biz");   Cache::put('biz', $req->biz);
        Cache::forget("bank");  Cache::put('bank', $req->bank);
    }

}
