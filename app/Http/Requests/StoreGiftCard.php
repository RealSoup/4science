<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGiftCard extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'type'  => 'required',
            'ea'    => 'required|integer',
            'name'  => 'required',
            'hp'    => 'required',
        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'type.required' => '상품권을 선택해주세요',
            'ea.required'   => '수량을 입력해주세요',
            'ea.integer'    => '숫자만 입력해주세요',
            'name.required' => '수령인을 입력해주세요',
            'hp.required'   => '휴대전화 번호를 입력해주세요',
        ];
    }
}
