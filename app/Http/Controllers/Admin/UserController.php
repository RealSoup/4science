<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{User, UserMng};
use Cache;
use DB;

class UserController extends Controller {
    public function index(User $user, Request $req) {
        $data['option'] = User::$option;

        if ($req->filled('startDate'))  $user = $user->StartDate($req->startDate);
        if ($req->filled('endDate'))    $user = $user->EndDate($req->endDate);
        if ($req->filled('group'))      $user = $user->Group($req->group);
        if ($req->filled('level'))      $user = $user->Level($req->level);
        if ($req->filled('keyword')){
            switch ($req->keyword_type) {
                case 'name':        $user = $user->Name($req->keyword); break;
                case 'email':       $user = $user->Email($req->keyword); break;
                case 'office':      $user = $user->Office($req->keyword); break;
                case 'department':  $user = $user->Department($req->keyword); break;
                case 'tutor':       $user = $user->Tutor($req->keyword); break;
                case 'tel':         $user = $user->Tel($req->keyword); break;
                case 'hp':          $user = $user->Hp($req->keyword); break;
            }
        }

        $data['user'] = $user->latest()->paginate(20);
        $data['user']->appends($req->all())->links();

        
        return response()->json($data);
    }

    public function edit(Request $req, $id) {
        $user = User::with('UserMng')->find($id);
        $user->option = User::$option;
        $user->mng_list = User::whereHas('userMng', function ($query) { $query->where('um_status', 'Y'); })->get();
        $um = new UserMng;
        $user->mng_info = $um->getMngInfo();
        return response()->json($user, 200);
    }

    public function list(User $us, Request $req) {
        switch ($req->type) {
            case 'name':        $us = $us->Name($req->key); break;
            case 'email':       $us = $us->Email($req->key); break;
            case 'department':  $us = $us->Department($req->key); break;
            case 'hp':          $us = $us->Hp($req->key); break;
            default: return response()->json('검색 자료 부족', 500); break;
        }
        return response()->json($us->get(), 200);
    }

    public function update(Request $req, $id) {
        DB::table('users')->where('id', $id)->update([
            'email' => $req->filled('email') ? $req->email : '',
            'name' => $req->filled('name') ? $req->name : '',
            'sex' => $req->filled('sex') ? $req->sex : 'male',
            'hp' => $req->filled('hp') ? $req->hp : '',
            'tel' => $req->filled('tel') ? $req->tel : '',
            'fax' => $req->filled('fax') ? $req->fax : '',
            'level' => $req->filled('level') ? $req->level : 1,
            'group' => $req->filled('group') ? $req->group : '일반',
            'birth' => $req->filled('birth') ? $req->birth : '',
            'job' => $req->filled('job') ? $req->job : '',
            'office' => $req->filled('office') ? $req->office : '',
            'department' => $req->filled('department') ? $req->department : '',
            'grade' => $req->filled('grade') ? $req->grade : '',
            'tutor' => $req->filled('tutor') ? $req->tutor : '',
            'offer' => $req->filled('offer') ? $req->offer : '',
            'offer_lab' => $req->filled('offer_lab') ? $req->offer_lab : '',
            'interest' => $req->filled('interest') ? implode(", ", $req->interest) : '',
            'interest_etc' => $req->filled('interest_etc') ? $req->interest_etc : '',
            'join_route' => $req->filled('join_route') ? $req->join_route : '',
            'receive_sms' => $req->filled('receive_sms') ? $req->receive_sms : 'Y',
            'receive_mail' => $req->filled('receive_mail') ? $req->receive_mail : 'Y',
            'mng' => $req->filled('mng') ? $req->mng : 0,
        ]);
        
        if ( $req->level > 20 ) {
            DB::table('user_mng')->updateOrInsert(
            [   'um_user_id' => $id ],
            [   'um_status'         => array_key_exists('um_status', $req->user_mng) ? $req->user_mng['um_status'] : 'Y',
                'um_position'       => array_key_exists('um_position', $req->user_mng) ? $req->user_mng['um_position'] : 1,
                'um_group'          => array_key_exists('um_group', $req->user_mng) ? $req->user_mng['um_group'] : 'etc',
                'um_responsibility' => array_key_exists('um_responsibility', $req->user_mng) ? $req->user_mng['um_responsibility'] : NULL, ]);
            Cache::forget("UserMng");
        }
        return response()->json("success", 200);
    }
}