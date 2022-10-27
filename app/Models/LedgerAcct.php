<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LedgerAcct extends Model {
    use SoftDeletes;
    protected $primaryKey = 'lga_id';
    protected $table = 'ledger_acct';
    protected $guarded = [];
    protected $appends = ['lga_check', 'show_menu', 'is_edit'];
    public static $config = [
        'step'=>[
            'W'     => [ 'name' => '매출 대기', 'keyword' => 'wait'],
            'S'     => [ 'name' => '결제 예정', 'keyword' => 'soon'],
            'P'     => [ 'name' => '매출',      'keyword' => 'pay'],
            'POd'   => [ 'name' => '매출내역',  'keyword' => 'pay'],
            'PTx'   => [ 'name' => '매출장',    'keyword' => 'pay'],
        ],
        'pay_type'=>[
            'wait' => [ 'TAX'   => '세금계산서',
                        'RPAY'  => '원격결제',
                        'CARD'  => '온라인카드',
                        'CASH'  => '현금영수증',
                        'MEMB'  => '회원',
                        'PSYS'  => 'PSYS',
                        'NOT'   => '미발급',
                        'CXL'   => '거래 취소', ],
            'soon' => [ 'TAX'   => '세금계산서',
                        'RPAY'  => '원격결제', 
                        'PSYS'  => 'PSYS',
                        'CASH'  => '현금영수증',
                        'NOT'   => '미발급', ],
            'pay_tx'=> ['TAX'   => '세금계산서',
                        'CARD'  => '카드',
                        'CASH'  => '현금영수증',
                        'CBC'   => '건별',],
        ],
        'no_pay'=>[ '' => '',
                    'N' => '미결',
                    'C' => '카드', ],
        'kind' => [ 'K' => 'KICC', 
                    'R' => '단말기', 
                    'S' => '전표' ],
        'card_com' => [ 'INI' => '이니시스',
                        'ALL' => '올앳',
                        'BC' => '비씨카드',
                        'SH' => '신한카드',
                        'KB' => '국민카드',
                        'SS' => '삼성카드', ],
    ];

    public function getLgaCheckAttribute() { return false; }
    public function getShowMenuAttribute() { return false; }
    public function getIsEditAttribute() { return false; }
}