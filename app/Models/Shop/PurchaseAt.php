<?php
namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class PurchaseAt extends Model {
    protected $primaryKey = 'pa_id';
    protected $table = 'shop_purchase_at';
    protected $guarded = [];
    protected $appends = ['pa_price_add_vat'];
    public $timestamps = false;

    // protected static function boot() {
    //     parent::boot();
    //     static::addGlobalScope('pa_enable', function (Builder $builder) {
    //         $builder->where('pa_enable', 'Y');
    //     });
    // }
    public function getPaPriceAddVatAttribute() { return (int)($this->pa_price*1.1); }
    public function scopeSchPaName($query, $pa_name) { return $query->where('pa_name', 'like', "%".$pa_name."%"); }
    // public function scopeEnable($query) { return $query->where('pa_enable', 'Y'); }

}
