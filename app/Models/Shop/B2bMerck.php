<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class B2bMerck extends Model {
    protected $table = 'shop_b2b_merck';
    protected $primaryKey = 'bm_id';
    public $timestamps = false;
    protected $guarded = [];

    public function b2bMerckModel() { return $this->hasMany(B2bMerckModel::class, "bmm_bm_id"); }
    public function b2bMerckConfirmation() { return $this->hasOne(B2bMerckConfirmation::class, 'bmc_orderid', 'bm_orderid'); }

}
