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

    //  속성 칸(attr_volume 등) 사용 스위치 (.env SEARCH_ATTR=true) - 규격 칸이 있는 인덱스에서만
    //  켜기 전에: la_shop_goods_attr 테이블 + php artisan search:extract-attrs --es (칸 만들고 값 채우기)
    //  꺼져 있으면 상품 저장 시 속성 칸을 만들지 않음 (테이블 없는 서버에서도 안전)
    'attr' => (bool) env('SEARCH_ATTR', false),

    //  동의어 - 인덱스마다 둘 중 하나 (관리자 동의어 화면이 지금 인덱스 쪽을 편집)
    //  synonym_sets : ES 안에 저장 (동의어 API) - 저장하면 바로 반영, 폴더 연결 필요 없음
    //  synonym_files: ES 서버 config 폴더의 txt (SYNONYM_FILE_PATH와 같은 폴더)
    'synonym_sets'  => ['shop_goods_v2' => 'shop_goods_v2'],
    'synonym_files' => ['shop_goods' => 'synonyms_final.txt'],
    
    //  AI 검색어 통역 - 모든 AI 호출은 App\Services\SearchAi 한 곳에서
    //  "약한 검색" = 결과가 low건 이하이거나, 검색어가 그대로 들어간 상품이 없음 (비슷한 글자로만 잡힘)
    //  fill : 약한 검색어를 대기 목록에 모으고 1분마다 AI에 물어 수첩(la_search_ai) 채우기 - 손님 화면 영향 없음
    //  boost: 약한 검색에 영문 자판 규칙(qlzj→비커)·수첩의 바꾼 말(메탄올→methanol)로 함께 찾아 보여주기 + 안내 문구
    //  끄면 바로 멈춤 (운영은 설정 캐시를 안 써서 .env 저장 즉시 반영)
    'ai' => [
        'fill'        => (bool) env('SEARCH_AI_FILL', false),
        'boost'       => (bool) env('SEARCH_AI_BOOST', false),
        'low'         => (int) env('SEARCH_AI_LOW', 3),
        'provider'    => env('SEARCH_AI_PROVIDER', 'openai'),        //  openai / anthropic
        'model'       => env('SEARCH_AI_MODEL', 'gpt-4o-mini'),      //  비교 시험(4단계) 후 결정
        'temperature' => env('SEARCH_AI_TEMPERATURE'),               //  비우면 안 보냄 (생각하는 모델은 temperature를 받지 않음)
        'timeout'     => (int) env('SEARCH_AI_TIMEOUT', 30),         //  AI 한 번 기다리는 최대 초 - 1분 작업에서만 기다림, 손님 검색과 무관
        'daily_limit' => (int) env('SEARCH_AI_DAILY_LIMIT', 3000),   //  하루 최대 호출 수 - 봇이 이상한 검색어를 쏟아내도 비용 상한
        'per_run'     => 40,                                          //  1분 작업 한 번에 물어볼 최대 개수
        'keys'        => ['openai' => env('OPENAI_API_KEY'), 'anthropic' => env('ANTHROPIC_API_KEY')],
    ],
];