<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveMakerRequest extends FormRequest {

    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'mk_name'	=> 'required|unique:shop_makers|regex:/^[가-힣a-zA-Z0-9_\-\(\) ]+$/'
        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'mk_name.required' => '제조사를 입력해 주세요.',
            'mk_name.unique' => '이미 등록된 제조사입니다. 다른 제조사을 입력해 주세요.',
			'mk_name.regex' => '특수문자가 검출 되었습니다. 특수문자는 _-() 만 가능합니다.'
        ];
    }
}
