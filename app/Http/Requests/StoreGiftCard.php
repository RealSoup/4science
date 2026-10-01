<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGiftCard extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'type'  => 'required|in:1,2',
            'ea'    => 'required|integer|min:1|max:100',
            'name'  => 'required',
            'hp'    => 'required',
        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'type.required' => '상품권을 선택해주세요',
            'type.in'       => '올바른 상품권을 선택해주세요',
            'ea.required'   => '수량을 입력해주세요',
            'ea.integer'    => '숫자만 입력해주세요',
            'ea.min'        => '수량은 1개 이상 입력해주세요',
            'ea.max'        => '수량은 100개 이하로 입력해주세요',
            'name.required' => '수령인을 입력해주세요',
            'hp.required'   => '휴대전화 번호를 입력해주세요',
        ];
    }
}
