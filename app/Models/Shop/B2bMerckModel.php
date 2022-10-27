<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class B2bMerckModel extends Model {
    protected $table = 'shop_b2b_merck_model';
    protected $primaryKey = 'bmm_id';
    public $timestamps = false;
    protected $guarded = [];

}
