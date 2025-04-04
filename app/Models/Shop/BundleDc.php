<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class BundleDc extends Model {
    protected $primaryKey = 'bd_id';
    protected $table = 'shop_bundle_dc';
    protected $guarded = [];
    protected $appends = ['bd_price_add_vat'];

    public function goodsModel() { return $this->belongsTo(GoodsModel::class); }
    public function getBdPriceAddVatAttribute() { return floor($this->bd_price*1.1); }
    public function scopeGm_id($q, $v) { return $q->where('bd_gm_id', $v); }
}
