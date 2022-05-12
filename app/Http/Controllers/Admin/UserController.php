<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use DB;

class UserController extends Controller {
    public function index(User $user, Request $req) {
        $data['user'] = $user->paginate(10);
        $data['user']->appends($req->all())->links();

        $data['option'] = $user->getOption();
        return response()->json($data);
    }

    public function edit(Request $req, $id) {
        $user = User::find($id);
        $user->option = $user->getOption();
        $user->mng_list = User::whereHas('userMng', function ($query) {
                                $query->where('um_status', 'Y');
                            })->get();

        if ($user->level > 19) {
            $user->userMng;
            $user->userMng->mng_info = $user->userMng->getMngInfo();
        }

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
            'name' => $req->filled('name') ? $req->name : '',            
            'sex' => $req->filled('sex') ? $req->sex : 'male',
            'hp' => $req->filled('hp') ? $req->hp : '',
            'tel' => $req->filled('tel') ? $req->tel : '',
            'fax' => $req->filled('fax') ? $req->fax : '',
            'level' => $req->filled('level') ? $req->level : 0,
            'group' => $req->filled('group') ? $req->group : '일반',
            'birth' => $req->filled('birth') ? $req->birth : '',
            'job' => $req->filled('job') ? $req->job : '',
            'office' => $req->filled('office') ? $req->office : '',
            'department' => $req->filled('department') ? $req->department : '',
            'grade' => $req->filled('grade') ? $req->grade : '',
            'tutor' => $req->filled('tutor') ? $req->tutor : '',
            'offer' => $req->filled('offer') ? $req->offer : '',
            'offer_lab' => $req->filled('offer_lab') ? $req->offer_lab : '',
            'interest' => $req->filled('interest') ? $req->interest : '',
            'interest_etc' => $req->filled('interest_etc') ? $req->interest_etc : '',
            'join_route' => $req->filled('join_route') ? $req->join_route : '',
            'receive_sms' => $req->filled('receive_sms') ? $req->receive_sms : 'Y',
            'receive_mail' => $req->filled('receive_mail') ? $req->receive_mail : 'Y',
        ]);        
        return response()->json("success", 200);
    }
}
