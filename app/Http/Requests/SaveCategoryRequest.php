<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveCategoryRequest extends FormRequest {
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
            // 'ca_name'	=> 'required|unique:shop_category|regex:/^[가-힣a-zA-Z0-9 ]+$/'
            'ca_name'	=> 'required'
        ];
    }

     // 에러 메세지
    public function messages() {
        return [
            'ca_name.required' => '카테고리명은 필수입력값입니다.',
            'ca_name.unique' => '이미 등록된 카테고리입니다. 다른 카테고리을 입력해 주세요.',
 			'ca_name.regex' => '특수문자가 검출 되었습니다. 특수 문자는 입력 불가능합니다.'
        ];
    }
}
