<?php
namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderPg extends Model {
    protected $table = 'shop_order_pg';
    protected $primaryKey = 'pg_id';
    public $timestamps = false;
    protected $guarded = [];

    public static $option = [
        'cardComNm' => ['11' => 'BC카드',                  '12' => '삼성카드',
                        '14' => '신한카드',                '15' => '한미카드',
                        '16' => 'NH카드',                  '17' => '하나 SK카드',
                        '21' => '글로벌 VISA',               '22' => '글로벌 MASTER',
                        '23' => '글로벌 JCB',                '24' => '글로벌 아멕스',
                        '25' => '글로벌 다이너스',            '93' => '토스머니(포인트 100% 사용)',
                        '94' => 'SSG머니(포인트 100% 사용)',  '96' => '엘포인트(포인트 100% 사용)',
                        '97' => '카카오머니',                 '98' => '페이코(포인트 100% 사용)',
                        '01' => '외환카드',                  '03' => '롯데카드',
                        '04' => '현대카드',                  '06' => '국민카드']

    ];
    
}
