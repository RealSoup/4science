<?php
//  쿼리 출력
if (! function_exists('echo_query')) {
    function echo_query($obj) {
        dd(array_reduce($obj->getBindings(), function($sql, $binding){
            return preg_replace('/\?/', is_numeric($binding) ? $binding : "'".$binding."'" , $sql, 1);
        }, $obj->toSql()));
    }
}

if (! function_exists('isImg')) {
    function isImg ($type) {
        return preg_match("/(jpg|png|gif|bmp|jpeg)/", $type);
    }
}

// if (! function_exists('getModelPrice')) {
//     function getModelPrice ($model) {
//         if ($model->bundleDc()->exists()) { // 묶음할인이 있다면 적용
//             foreach($model->bundleDc as $dc){
//                 if ($model->ea < $dc->bd_ea)      { break; }
//                 else if ($model->ea == $dc->bd_ea){ $model->gm_price = $dc->bd_price; break; }
//                 else if ($model->ea > $dc->bd_ea) { $model->gm_price = $dc->bd_price; }
//             }
//         }
//         return $model->gm_price;
//     }
// }


if (! function_exists('rrp')) { //  RECOMMENDED RETAIL PRICE     권장 소비자가격
    function rrp($price, $comma=0) {    //  가격 + 부가세
        $price = $price+surtax($price);
        return $comma ? number_format($price) : $price;
    }
}

if (! function_exists('surtax')) { //  부가세 계산
    function surtax($price, $comma=0) {
        $price = $price*0.1;
        return $comma ? number_format($price) : $price;
    }
}

// if (! function_exists('price_calculator')) { //  가격 계산
//     function price_calculator($price) {
//         $price['surtax_p'] = surtax($price['goods_p']+$price['option_p'], 0);
//         $price['goods_p'] = rrp($price['goods_p'], 0);
//         $price['option_p'] = rrp($price['option_p'], 0);
//         $price['dlvy_p'] = rrp($price['dlvy_p'], 0);
//         $price['total_p'] = $price['goods_p']+$price['option_p'];
//         $price['final_p'] = $price['total_p']+$price['dlvy_p'];
//         return $price;
//     }
// }

if (! function_exists('noImg')) { //  이미지 없을때 대체 이미지
    function noImg($thumb=false) {
        return "/img/common/noimage".($thumb ? "_thumb" : "").".jpg";
    }
}