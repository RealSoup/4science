<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseAtRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'pa_name'	=> 'required|unique:shop_purchase_at|regex:/^[가-힣a-zA-Z0-9 ]+$/',
            'pa_price'	=> 'required|integer'
        ];
    }

     // 에러 메세지
    public function messages() {
        return [
            'pa_name.required' => '매입처명은 필수입력값입니다.',
            'pa_name.unique' => '이미 등록된 매입처명입니다. 다른 매입처을 입력해 주세요.',
 			'pa_name.regex' => '특수문자가 검출 되었습니다. 특수 문자는 입력 불가능합니다.',
            'pa_price.required' => '운송비는 필수입력값입니다.',
            'pa_price.integer' => '운송비는 숫자만 입력가능합니다.'
        ];
    }
}
