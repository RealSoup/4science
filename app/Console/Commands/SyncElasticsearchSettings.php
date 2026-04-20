<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SyncElasticsearchSettings extends Command
{
    protected $signature = 'scout:sync-settings';
    protected $description = 'Elasticsearch 인덱스 설정 동기화';

    public function handle()
    {
        $client = app(\Elastic\Elasticsearch\Client::class);

        $this->info('Elasticsearch 인덱스 설정 적용 중...');

        // 기존 인덱스 삭제 후 재생성
        if ($client->indices()->exists(['index' => 'shop_goods'])->asBool()) {
            $client->indices()->delete(['index' => 'shop_goods']);
            $this->info('기존 인덱스 삭제 완료');
        }

        $client->indices()->create([
            'index' => 'shop_goods',
            'body'  => [
                'settings' => [
                    'similarity' => [
                        'no_idf' => [
                            'type' => 'BM25',
                            'b'    => 0,
                            'k1'   => 1.2,
                        ],
                    ],
                    'analysis' => [
                        'normalizer' => [
                            'lowercase_normalizer' => [
                                'type'   => 'custom',
                                'filter' => ['lowercase'],  // 소문자 통일만
                            ],
                        ],
                        'char_filter' => [
                            'special_chars' => [
                                'type'        => 'pattern_replace',
                                'pattern'     => '[()]',
                                'replacement' => ' ',
                            ],
                        ],
                        'filter' => [
                            'synonym_filter' => [
                                'type'          => 'synonym',
                                'synonyms_path' => 'synonyms_final.txt',
                                'updateable'    => true,
                            ],
                        ],
                        'tokenizer' => [
                            'nori_tokenizer' => [
                                'type'            => 'nori_tokenizer',
                                'decompound_mode' => 'mixed',
                                'user_dictionary_rules' => [ '줄자루 줄 자루', ],   // 줄자루 = 줄 + 자루 로 강제 분리
                            ],
                        ],
                        'analyzer' => [
                            'korean' => [           // 일반 텍스트용 (한글 형태소)
                                'type'      => 'custom',
                                'tokenizer' => 'nori_tokenizer',
                                'filter'    => ['lowercase'],
                            ],
                            'korean_search' => [
                                'type'      => 'custom',
                                'tokenizer' => 'nori_tokenizer',
                                'filter'    => ['lowercase', 'synonym_filter'],
                            ],
                            'korean_exact' => [     // 정밀 검색용 (쪼개지 않음)
                                'type'      => 'custom',
                                'tokenizer' => 'whitespace',  // 공백만으로 분리
                                'filter'    => ['lowercase'],
                                'char_filter' => ['special_chars'],
                            ],
                        ],
                    ],
                ],
                'mappings' => [
                    'properties' => [
                        'gd_name'      => ['type' => 'text', 'analyzer' => 'korean', 'search_analyzer' => 'korean_search', 'similarity' => 'no_idf', 'fields'   => [ 'keyword' => ['type' => 'keyword', 'normalizer' => 'lowercase_normalizer'], 'exact'   => ['type' => 'text', 'analyzer' => 'korean_exact'], ], ],
                        'gm_name'      => ['type' => 'text', 'analyzer' => 'korean', 'similarity' => 'no_idf', 'fields'   => [ 'keyword' => ['type' => 'keyword', 'normalizer' => 'lowercase_normalizer'], 'exact'   => ['type' => 'text', 'analyzer' => 'korean_exact'], ], ],
                        'mk_name'      => ['type' => 'text', 'analyzer' => 'korean_exact', 'similarity' => 'no_idf', 'fields' => [ 'keyword' => ['type' => 'keyword', 'normalizer' => 'lowercase_normalizer'], 'exact' => ['type' => 'text', 'analyzer' => 'korean_exact'], ], ],
                        'gd_keyword'   => ['type' => 'text', 'analyzer' => 'korean', 'similarity' => 'no_idf'],
                        'gm_name_all'  => ['type' => 'text', 'analyzer' => 'korean', 'similarity' => 'no_idf'],
                        'gm_code'      => ['type' => 'keyword', 'normalizer' => 'lowercase_normalizer'],
                        'gm_catno'     => ['type' => 'keyword'],
                        'gm_code_all'  => ['type' => 'text', 'fields' => ['keyword' => ['type' => 'keyword', 'normalizer' => 'lowercase_normalizer']]],
                        'gm_catno_all' => ['type' => 'text', 'fields' => ['keyword' => ['type' => 'keyword']]],
                        'gd_seq'       => ['type' => 'integer'],
                        'gd_rank'      => ['type' => 'integer'],
                        'gd_view_cnt'  => ['type' => 'integer'],
                        'gm_price'     => ['type' => 'integer'],
                        'purchase_score' => ['type' => 'float'],
                        'gd_enable'    => ['type' => 'keyword'],
                        'gd_type'      => ['type' => 'keyword'],
                        'gd_mk_id'     => ['type' => 'integer'],
                        'gc_ca01'      => ['type' => 'integer'],
                        'gc_ca02'      => ['type' => 'integer'],
                        'gc_ca03'      => ['type' => 'integer'],
                        'gc_ca04'      => ['type' => 'integer'],
                    ],
                ],
            ],
        ]);

        $this->info('✅ 인덱스 설정 완료!');
        $this->info('재인덱싱 시작...');

        $this->call('scout:import', ['model' => 'App\Models\Shop\Goods']);

        $this->info('✅ 모든 작업 완료!');
    }
}