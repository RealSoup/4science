<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class GoodsOptionChild extends Model {
    protected $table = 'shop_goods_option_child';
    protected $primaryKey = 'goc_id';
    protected $fillable = ['goc_go_id', 'goc_name', 'goc_price']; // 수정가능 필드 입력
    public $timestamps = false;
    protected $appends = ['show', 'goc_price_add_vat'];

    public function getShowAttribute() { return false; }
    public function getGocPriceAddVatAttribute() { return floor($this->goc_price*1.1); }

    public function goodsOption() { return $this->belongsTo(GoodsOption::class, 'goc_go_id'); }

    public function scopeGo_id($query, $go_id) { return $query->where('goc_go_id', $go_id); }

    public function getGocNm($goc_id) { return self::select("goc_name")->find($goc_id)->goc_name; }
}
