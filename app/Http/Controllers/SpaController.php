<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SpaController extends Controller {

    public function __construct() {
        // $this->middleware('auth');
    }

    public function index(Request $request) {
        return view("spa", [ 'auth_user' => auth()->user() ]);
    }
}
