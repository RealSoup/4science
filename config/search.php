<?php

//  손님 검색 (Elasticsearch) 설정 - AI 검색
return [

    //  지금 손님이 쓰는 검색 인덱스 = 간판 (.env SEARCH_INDEX, 비우면 shop_goods)
    //  손님·관리자 검색, 상품 수정 반영, 가격 일괄 변경, 인기도 점수, 동의어 관리가 모두 이 인덱스를 따름
    //  바꾼 뒤 php artisan config:clear / 되돌리기: shop_goods (되돌리기 전 search:copy로 최신 상품 정보 복사)
    'index' => env('SEARCH_INDEX', 'shop_goods'),

    //  규격 칸(spec_all)이 있는 인덱스 - 상품 수정 시 규격 칸도 채우고, 손님 검색에 규격 가산점
    'spec_indexes' => ['shop_goods_v2'],

    //  규격 가산점 (0 = 끄기) - search:compare로 정한 값
    'spec_weight' => (int) env('SEARCH_SPEC_WEIGHT', 5000),

    //  동의어 - 인덱스마다 둘 중 하나 (관리자 동의어 화면이 지금 인덱스 쪽을 편집)
    //  synonym_sets : ES 안에 저장 (동의어 API) - 저장하면 바로 반영, 폴더 연결 필요 없음
    //  synonym_files: ES 서버 config 폴더의 txt (SYNONYM_FILE_PATH와 같은 폴더)
    'synonym_sets'  => ['shop_goods_v2' => 'shop_goods_v2'],
    'synonym_files' => ['shop_goods' => 'synonyms_final.txt'],
];