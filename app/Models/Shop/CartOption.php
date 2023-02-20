<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class CartOption extends Model {
    protected $table = 'shop_cart_option';
    protected $primaryKey = 'co_id';
    public $timestamps = false;
    protected $fillable = ['co_ct_id', 'co_go_id', 'co_goc_id', 'co_ea'];

    public function option() { return $this->hasOne(Option::class, 'go_id', 'co_go_id'); }
    // public function optionChild() { return $this->hasOne(OptionChild::class, 'goc_id', 'co_goc_id'); }


}
