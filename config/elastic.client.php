<?php

return [
    'hosts' => [
        env('ELASTICSEARCH_HOST', 'http://localhost:9200'),
    ],
    'basicAuthentication' => [
        env('ELASTICSEARCH_USER', 'elastic'),
        env('ELASTICSEARCH_PASSWORD', ''),
    ],
    'httpClientOptions' => [
        'verify' => false,
    ],
];