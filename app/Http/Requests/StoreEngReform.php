<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEngReform extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'er_name'	=> 'required',
            'er_email'	=> 'required|email',
            'er_hp'	=> 'required',
            'er_depart'	=> 'required',

            'er_type'	=> 'required',
            'er_dlvy_at'	=> 'required',
            'er_format'	=> 'required',

            'er_use'	=> 'required',
            'er_branch'	=> 'required',
            'er_editor'	=> 'required',
            'er_eng_style'	=> 'required',
            'file_info_work' => 'required|array|min:1'
        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'er_name.required'      => '이름을 입력해 주세요.',
            'er_email.required'     => '이메일을 입력해 주세요.',
            'er_email.email'        => '이메일 형식이 올바르지 않습니다.',
            'er_hp.required'        => '휴대전화를 입력해 주세요.',
            'er_depart.required'    => '소속을 입력해 주세요.',

            'er_type.required'      => '교정 서비스를 선택해 주세요.',
            'er_dlvy_at.required'   => '납기일을 입력해 주세요.',
            'er_format.required'    => '포맷팅 여부를 선택해 주세요.',
            'er_use.required'       => '문서의 용도를 선택해 주세요.',
            'er_branch.required'    => '학문 분야를 선택해 주세요.',
            'er_editor.required'    => '에디터를 선택해 주세요.',
            'er_eng_style.required' => '문체스타일을 선택해 주세요.',
            'file_info_work.required'      => '작업문서를 첨부해 주세요.',
            'file_info_work.min'           => '작업문서를 :min 개 이상 첨부해 주세요.',
        ];
    }
}
