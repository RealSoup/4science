<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use App\Models\FileInfo;
use Carbon\Carbon;
use App\Models\Shop\ExchangeRate;

class Maker extends Model {
    protected $primaryKey = 'mk_id';
    protected $table = 'shop_makers';
    protected $fillable = ['mk_name', 'mk_desc', 'mk_currency', 'mk_customs_rate', 'mk_margin_rate', 'created_id', 'ip']; // 수정가능 필드 입력

    public function fileInfo() { return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }

    public function scopeSchMkName($query, $mk_name) { return $query->where('mk_name', 'like', "%" . $mk_name . "%"); }

    // 원가(현지통화) -> 최종 판매가(KRW) 계산: 환산가 -> 관세% -> 마진% 순차 적용
    public function calcSalePrice($costOrigin) {
        $costOrigin = floatval($costOrigin);
        if ($costOrigin <= 0) return 0;

        if ($this->mk_currency == 'KRW') return ceil($costOrigin / 100) * 100;

        $rate = ExchangeRate::current($this->mk_currency);
        if (!$rate) return null;

        // 수출입은행은 일부 통화(JPY(100), IDR(100) 등)를 "100단위당" 환율로 고시함
        // 통화코드의 괄호 숫자를 뽑아서 1단위 환율로 보정
        $unit = 1;
        if (preg_match('/\((\d+)\)/', $this->mk_currency, $m)) $unit = intval($m[1]);
        $unitRate = $rate->er_rate / $unit;

        $converted   = $costOrigin * $unitRate;
        $withCustoms = $converted * (1 + ($this->mk_customs_rate / 100));
        $final       = $withCustoms * (1 + ($this->mk_margin_rate / 100));

        return ceil($final / 100) * 100;
    }
}