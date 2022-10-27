<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller {

    public function emailCheck($email) {
        return response()->json(DB::table('users')->where('email', $email)->count(), 200);
    }

    public function auth(Request $req) {
        $u = $req->user();
        $u->userMng;
        $interest = explode(', ', $u->interest);
        if (count($interest) > 0 && $interest[0] != '') $u->interest = $interest;
        else                                            $u->interest = Array();
        if ($u->job == null)                            $u->job = '';
        return response()->json([ 'user' => $u, 'token' => csrf_token() ], 200);  ;
    }



    public function update(Request $req) {
        Validator::make($req->all(), [
            'email'                     => 'required|email',
            'name'                      => 'required',
            'sex'                       => 'required',
            'password'                  => 'required',
            'password_confirmation'     => 'required',
            'birth'                     => 'required',
            'hp'                        => 'required',
        ], [
            'email.required'                    => '이메일을 입력해주세요',
            'email.email'                       => '이메일이 형식에 맞지 않습니다',
            'name.required'                     => '이름을 입력해주세요',
            'sex.required'                      => '성별을 선택주세요',
            'password.required'                 => '비밀번호를 입력해주세요',
            'password_confirmation.required'    => '비밀번호 확인을 입력해주세요',
            'birth.required'                    => '생년월일을 입력해주세요',
            'hp.required'                       => '휴대전화 번호를 입력해주세요',
        ])->validate();

   



        $model_user = new User;
        $user = auth()->user();
        
        $user -> name =         $req -> name;
        $user -> sex =          $req -> sex;
        $user -> email =        $req -> email;
        $user -> receive_mail = $req -> receive_mail;
        $user -> birth =        $req -> birth;
        $user -> hp =           $req -> hp;
        $user -> receive_sms =  $req -> receive_sms;
        $user -> tel =          $req -> tel;
        $user -> fax =          $req -> fax;
        $user -> job =          $req -> job;
        $user -> office =       $req -> office;
        $user -> department =   $req -> department;
        $user -> grade =        $req -> grade;
        $user -> tutor =        $req -> tutor;
        $user -> offer =        $req -> offer;
        $user -> offer_lab =    $req -> offer_lab;
        $user -> interest =     $req->filled('interest') ? implode(", ", $req -> interest) : '';
        $user -> interest_etc = $req -> interest_etc;
        $user -> join_route =   $req -> join_route;

        if ( $req->filled('password') ) {
            $user->password = bcrypt($req->password);
        }

        $user->save();

        return response()->json("success", 200);
    }
}
