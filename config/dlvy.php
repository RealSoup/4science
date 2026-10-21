<?php

return [
    //  배송 관리(한진 송장 엑셀) 접근 가능 회원번호, 쉼표로 구분
    'mng_ids' => array_map('intval', array_filter(explode(',', env('DLVY_MNG_IDS', '77182,130')))),
];
