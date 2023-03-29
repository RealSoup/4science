<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEstimateReply extends FormRequest {
    public function authorize() { return true; }

    public function rules() {
        return [
            'estimate_req.eq_name'       => 'required',
            'estimate_req.eq_department' => 'required',
            'estimate_req.eq_email'      => 'required|email',
            'estimate_req.eq_hp'         => 'required',

            'estimate_model'            => 'required|array|min:1',
            'estimate_model*em_name'  => 'required',
            'estimate_model*em_code'  => 'required',
            'estimate_model*em_ea'  => 'required',
            'estimate_model*em_price'  => 'required',
            'estimate_model*em_spec'  => 'required',

            'er_dlvy_at' => 'required',
            'er_effective_at' => 'required',
        ];
    }

    public function messages() {    // 에러 메세지
        return [
            'eq_name.required'       => '요청자 이름을 입력해 주세요.',
            'eq_department.required' => '요청자 소속을 입력해 주세요.',
            'eq_email.required'      => '요청자 이메일을 입력해 주세요.',
            'eq_email.email'         => '이메일 형식이 올바르지 않습니다.',
            'eq_hp.required'         => '요청자 휴대폰 번호를 입력해 주세요.',

            'estimate_model.required'            => '상품을 등록하세요',
            'estimate_model*em_name.required' => '상품명을 입력하세요',
            'estimate_model*em_code.required' => '모델명을 입력하세요',
            'estimate_model*em_ea.required' => '수량을 입력하세요',
            'estimate_model*em_price.required' => '판매단가을 입력하세요',
            'estimate_model*em_spec.required' => '제품 정보를 입력하세요',

            'er_dlvy_at.required'         => '납품기일을 입력해 주세요.',
            'er_effective_at.required'         => '견젹 유효기간을 입력해 주세요.',
        ];
    }
}
