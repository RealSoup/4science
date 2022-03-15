<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveOrderRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        return [
            'od_zip'	=> 'required|size:5',
            'od_addr2'	=> 'required',
            'od_addr1'	=> 'required',
        ];
    }
    // 에러 메세지
    public function messages() {
        return [
            'od_zip.required' => '우편번호가 필요합니다.',
            'od_zip.size' => '우편번호는 5자리입니다.',
            'od_addr1.required' => '주소가 필요합니다.',
			'od_addr2.required' => '상세주소가 필요합니다.'
        ];
    }
}
