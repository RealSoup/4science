<?php

//  손님 검색 (Elasticsearch) 설정 - AI 검색
//  인덱스·동의어 세트 이름은 고정 (App\Services\GoodsElasticSearch::INDEX, SYNONYM_SET)
return [

    //  ES 접속 정보 - ES를 부르는 곳은 모두 이 값만 씀 (코드에서 env()를 직접 읽으면 설정 캐시 때 비어 버림)
    'es' => [
        'host'     => env('ELASTICSEARCH_HOST', 'http://localhost:9200'),
        'user'     => env('ELASTICSEARCH_USER', 'elastic'),
        'password' => env('ELASTICSEARCH_PASSWORD', ''),
    ],

    //  규격 가산점 ("비커 500ml"에서 규격·속성이 맞는 상품에 더하는 점수, 0 = 끄기)
    'spec_weight' => (int) env('SEARCH_SPEC_WEIGHT', 5000),

    //  자리 보정 가산점 (AI 검색 2-5) - 검색어별로 손님이 자리에 비해 많이 고른 상품에 더하는 최대 점수, 0 = 끄기
    //  점수표(la_search_rank)는 매일 밤 search:update-score가 채움 / 숫자는 켜기 전 시험(앞 기간으로 점수 → 뒤 기간 클릭으로 채점)으로 정함
    'rank_weight' => (int) env('SEARCH_RANK_WEIGHT', 0),

    //  검색 순서 학습 (AI 검색 2-5 ②, XGBoost) - 매주 일요일 search:ltr-train이 학습하고, 지난주 기록 모의고사를 통과한 모델만 storage/app/ltr에 둠
    //  on    : 인기상품순 검색어 검색의 ES 1~50등을 그 모델로 다시 줄 세움 (통과한 모델이 없으면 ES 순서 그대로), 끄면 바로 원래 순서
    //          SEARCH_RANK_WEIGHT(자리 보정 가산점)를 켜면 쉼 - ES 점수가 학습 때와 달라지므로 둘 중 하나만
    //  python: 학습 숙제를 돌릴 파이썬 (web01은 /opt 아래 따로 둔 3.12 - 시스템 파이썬 3.6은 안 씀, python/ltr/requirements.txt)
    'ltr' => [
        'on'     => (bool) env('SEARCH_LTR', false),
        'python' => env('SEARCH_LTR_PYTHON', '/opt/4science-ltr/venv/bin/python'),
    ],

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