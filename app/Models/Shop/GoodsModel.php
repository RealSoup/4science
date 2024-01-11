<?php

namespace App\Models\Shop;

// use App\Events\GoodsModelDeleted;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use DB;

class GoodsModel extends Model {
    protected $primaryKey = 'gm_id';
    protected $table = 'shop_goods_model';    
    protected $appends = ['gm_catno', 'gm_price_add_vat'];
    protected $guarded = [];

    public function goods() { return $this->belongsTo(Goods::class, 'gm_gd_id'); }
    public function bundleDc() { return $this->hasMany(BundleDc::class, "bd_gm_id"); }

    public function getGmCatnoAttribute() { return $this->gm_catno01.'-'.$this->gm_catno02.'-'.$this->gm_catno03; }
    public function getGmPriceAddVatAttribute() { return ($this->gm_price>0) ? intval($this->gm_price*1.1) : $this->gm_price; }

    public function scopeGd_id($query, int $gd_id) { return $query->where('gm_gd_id', $gd_id); }
    public function scopeGm_id($query, $gm_id) {
        if ( count($gm_id) > 1) return $query->whereIn('gm_id', $gm_id);
        else return $query->where('gm_id', $gm_id);
    }
    public function scopeName($q, $v) { return $q->where('gm_name', 'like', "{$v}%"); }
    public function scopeCode($q, $v) { return $q->where('gm_code', 'like', "{$v}%"); }
    public function scopeSpec($q, $v) { return $q->where('gm_spec', 'like', "{$v}%"); }
    public function scopeEnable($query) { return $query->where('gm_enable', 'Y'); }
    public function scopeCatno01($q, $v) { return $q->where('gm_catno01', $v); }
    public function scopeCatno02($q, $v) { return $q->where('gm_catno02', $v); }
    public function scopePrime($q) { return $q->where('gm_prime', 'Y'); }



    function bundleCheck ($ea) {
        $p = $this->gm_price;
        if ($this->bundleDc()->exists()) { // 묶음할인이 있다면 적용
            foreach($this->bundleDc as $dc){
                if ($ea < $dc->bd_ea)      { break; }
                else if ($ea == $dc->bd_ea){ $p = $dc->bd_price; break; }
                else if ($ea > $dc->bd_ea) { $p = $dc->bd_price; }
            }
        }
        return $p;
    }

    public static function minus_limit_ea ($od_id) {    //  재고 상품 구매시 수량 감소 
        $odm_list = DB::table('shop_order')
            ->select('shop_order_model.odm_gm_id', 'shop_order_model.odm_ea')
            ->join('shop_order_model', 'shop_order.od_id', '=', 'shop_order_model.odm_od_id')
            ->where('od_id', $od_id)
            ->get();          
        foreach ($odm_list as $odm) {
            $gm = self::find($odm->odm_gm_id);
            if ($gm->gm_limit_ea && intval($gm->gm_limit_ea) < 999999) 
                $gm->decrement('gm_limit_ea', $odm->odm_ea);
        }
    }
}
