<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserBehaviorService;

class BehaviorController extends Controller {
    public function log(Request $request) {
        $request->validate([
            'action' => 'required|in:view,revisit,search,cart,estimate,purchase,dwell',
            'target' => 'nullable|string|max:100',
        ]);

        $uuid   = $request->cookie('tracking_uuid');
        $userId = auth()->id();

        if (!$uuid) return response()->json(['ok' => false]);

        (new UserBehaviorService)->log($uuid, $userId, $request->action, $request->target);

        return response()->json(['ok' => true]);
    }
}