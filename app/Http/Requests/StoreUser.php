<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUser extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'name'                      => 'required',
            'sex'                       => 'required',
            'email'                     => 'required|email|unique:users',
            'password'                  => 'required',
            'password_confirmation'     => 'required',
            'birth'                     => 'required',
            'hp'                        => 'required',
        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'name.required'                     => '이름을 입력해주세요',
            'sex.required'                      => '성별을 선택주세요',
            'email.required'                    => '이메일을 입력해주세요',
            'email.email'                       => '이메일이 형식에 맞지 않습니다',
            'email.unique'                      => '이미 등록된 이메일입니다.',
            'password.required'                 => '비밀번호를 입력해주세요',
            'password_confirmation.required'    => '비밀번호 확인을 입력해주세요',
            'birth.required'                    => '생년월일을 입력해주세요',
            'hp.required'                       => '휴대전화 번호를 입력해주세요',
        ];
    }
}
