<?php
namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderPurchaseAt extends Model {
    protected $primaryKey = 'odpa_id';
    protected $table = 'shop_order_purchase_at';
    protected $guarded = [];
    protected $appends = ['odpa_dlvy_p_add_vat', 'dlvy_all_chk', 'indeterminate'];
    public $timestamps = false;

    public function getOdpaDlvyPAddVatAttribute() { return floor($this->odpa_dlvy_p*1.1); }
    public function getDlvyAllChkAttribute() { return FALSE; }
    public function getIndeterminateAttribute() { return FALSE; }

    public function orderModel() { return $this->hasMany(OrderModel::class, "odm_odpa_id"); }//->orderBy('gm_order'); }
}
