<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserAddr;
use DB;

class UserAddrController extends Controller {
    
    public function index() { return response()->json(auth()->user()->userAddr, 200); }

    public function store(StoreUserAddr $req) {
        $uid = auth()->check() ? auth()->user()->id : 0;

        if ($req->filled('ua_def') && $req->ua_def == 'Y')
            DB::table('user_addr')->where('ua_key', $uid)->update(['ua_def' => 'N']);
        
        $id = DB::table('user_addr')->insertGetId( [
            "ua_key"    => $uid,
            "ua_def"    => $req->filled('ua_def')   ? $req->ua_def      : 'N',
            "ua_title"  => $req->filled('ua_title') ? $req->ua_title    : '',
            "ua_name"   => $req->filled('ua_name')  ? $req->ua_name     : '',
            "ua_hp"     => $req->filled('ua_hp')    ? $req->ua_hp       : '',
            "ua_zip"    => $req->filled('ua_zip')   ? $req->ua_zip      : '',
            "ua_addr1"  => $req->filled('ua_addr1') ? $req->ua_addr1    : '',
            "ua_addr2"  => $req->filled('ua_addr2') ? $req->ua_addr2    : '',
            "ua_memo"   => $req->filled('ua_memo')  ? $req->ua_memo     : '',
        ] );
        return response()->json($id, 200);
    }
    
    public function update(StoreUserAddr $req, $id) {
        $uid = auth()->check() ? auth()->user()->id : 0;
        if ($req->filled('ua_def') && $req->ua_def == 'Y')
            DB::table('user_addr')->where('ua_key', $uid)->update(['ua_def' => 'N']);
        DB::table('user_addr')->where('ua_id', $id)->update([
            "ua_def"    => $req->filled('ua_def')   ? $req->ua_def      : 'N',
            "ua_title"  => $req->filled('ua_title') ? $req->ua_title    : '',
            "ua_name"   => $req->filled('ua_name')  ? $req->ua_name     : '',
            "ua_hp"     => $req->filled('ua_hp')    ? $req->ua_hp       : '',
            "ua_zip"    => $req->filled('ua_zip')   ? $req->ua_zip      : '',
            "ua_addr1"  => $req->filled('ua_addr1') ? $req->ua_addr1    : '',
            "ua_addr2"  => $req->filled('ua_addr2') ? $req->ua_addr2    : '',
            "ua_memo"   => $req->filled('ua_memo')  ? $req->ua_memo     : '',
        ]);        
        return response()->json("success", 200);
    }

    public function destroy($id) {
		if(DB::table('user_addr')->where('ua_id', $id)->delete()) return response()->json('success', 200);
		else return response()->json("Fail", 500);
    }

    public function getEmailDomain(Request $req) { return \App\Models\User::$option['email_domain']; }
}
