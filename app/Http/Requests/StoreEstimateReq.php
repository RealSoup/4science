<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEstimateReq extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'eq_name'       => 'required',
            'eq_department' => 'required',
            'eq_email'      => 'required|email',
            'eq_hp'         => 'required',
            'eq_1depth'     => 'required_without:lists',
        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'eq_name.required'       => '요청자 이름을 입력해 주세요.',
            'eq_department.required' => '요청자 소속을 입력해 주세요.',
            'eq_email.required'      => '요청자 이메일을 입력해 주세요.',
            'eq_email.email'         => '이메일 형식이 올바르지 않습니다.',
            'eq_hp.required'         => '요청자 휴대폰 번호를 입력해 주세요.',
            'eq_1depth.required_without'     => '견적 분야를 선택해주세요',
        ];
    }
}
