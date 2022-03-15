<?php

namespace App\Models\Shop;

// use App\Events\GoodsModelDeleted;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class GoodsModel extends Model {
    protected $primaryKey = 'gm_id';
    protected $table = 'shop_goods_model';
    protected $fillable = ['gm_gd_id', 'gm_catno01', 'gm_catno02', 'gm_catno03', 'gm_name', 'gm_code', 'gm_spec', 'gm_unit', 'gm_enable', 'gm_price', 'created_id', 'updated_id', 'ip']; // 수정가능 필드 입력
    protected $appends = ['gm_catno', 'ct_check_opt', 'gm_price_add_vat'];

    public function goods() { return $this->belongsTo(Goods::class, 'gm_gd_id'); }
    public function bundleDc() { return $this->hasMany(BundleDc::class, "bd_gm_id"); }

    public function getGmCatnoAttribute() { return $this->gm_catno01.'-'.$this->gm_catno02.'-'.$this->gm_catno03; }
    public function getCtCheckOptAttribute() { return 'Y'; }
    public function getGmPriceAddVatAttribute() { return ($this->gm_price>0) ? intval($this->gm_price*1.1) : '견적가'; }

    public function scopeGd_id($query, int $gd_id) { return $query->where('gm_gd_id', $gd_id); }
    public function scopeGm_id($query, $gm_id) {
        if ( count($gm_id) > 1) return $query->whereIn('gm_id', $gm_id);
        else return $query->where('gm_id', $gm_id);
    }
    public function scopeName($query, $name) { return $query->where('gm_name', 'like', "%" . $name . "%"); }
    public function scopeCode($query, $code) { return $query->where('gm_code', 'like', "%" . $code . "%"); }
    public function scopeSpec($query, $spec) { return $query->where('gm_spec', 'like', "%" . $spec . "%"); }
    public function scopeEnable($query) { return $query->where('gm_enable', 'Y'); }
    public function scopeCatno01($query, $id) { return $query->where('gm_catno01', $id); }



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

}
