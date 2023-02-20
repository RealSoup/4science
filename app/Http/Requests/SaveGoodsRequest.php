<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
class SaveGoodsRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        /*
        $gm_code = array();
        if ($this->method() == 'PUT') {
            foreach ($this->gm_id as $key => $value)
                $gm_code = Arr::collapse([$gm_code,['gm_code.'.$key =>'required|unique:shop_goods_model,gm_code,'.$value.',gm_id']]);
        } else
            $gm_code = ['gm_code.*' =>'required|unique:shop_goods_model,gm_code'];
        */

        return [
            'goods_category'         => 'required|array|min:1',
            'gd_name'                => 'required',//|regex:/^[가-힣a-zA-Z0-9_\-\(\) ]+$/',
            'gd_desc'                => 'required',
            'gd_mk_id'               => 'required',
            'gd_dlvy_at'             => 'required',

            'goods_model'            => 'required|array|min:1',
            'goods_model.*.gm_name'  => 'required',
            'goods_model.*.gm_code'  => 'required',
            'goods_model.*.gm_spec'  => 'required',
            'goods_model.*.gm_unit'  => 'required',
            'goods_model.*.gm_price' => 'required|integer',
            'goods_model.*.gm_prime'  => 'min:1',

        ];
    }

    // 에러 메세지
    public function messages() {
        return [
            'goods_model.required'            => '모델을 등록하세요',
            'goods_model.*.gm_name.required'  => '모델 제품명을 입력하세요',
            'goods_model.*.gm_code.required'  => '모델명을 입력하세요',
            'goods_model.*.gm_spec.required'  => '스펙을 입력하세요',
            'goods_model.*.gm_unit.required'  => '판매단위를 입력하세요',
            'goods_model.*.gm_price.required' => '가격을 입력하세요',
            'goods_model.*.gm_price.integer'  => '가격은 숫자만 입력하세요',

            'goods_category.required'         => '카테고리를 설정해주세요.',
            'goods_category.min'              => '카테고리를 설정해주세요.',
            'gd_name.required'                => '상품명을 입력하세요.',
            'gd_desc.required'                => '상품설명을 입력하세요.',
            'gd_mk_id.required'               => '제조사를 선택해주세요.',
            'gd_dlvy_at.required'             => '납기일을 입력하세요.',
        ];
    }
}
