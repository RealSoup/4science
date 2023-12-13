<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserAddr extends FormRequest {
    public function authorize() { return auth()->check(); }

    public function rules() {
        return [
            'ua_title'  => 'required',
            'ua_name'   => 'required',
            'ua_zip'    => 'required',
            'ua_addr1'  => 'required',
            'ua_addr2'  => 'required',
            'ua_hp'    => 'required',
        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'ua_title.required' => '배송지명을 입력해주세요',
            'ua_name.required'  => '수취인을 입력해주세요',
            'ua_zip.required'   => '우편번호가 없습니다',
            'ua_addr1.required' => '주소를 검색해주세요',
            'ua_addr2.required' => '상세주소를 입력해주세요',
            'ua_hp.required'   => '휴대폰 번호를 입력해주세요',
        ];
    }
}
