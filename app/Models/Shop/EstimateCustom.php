<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimateCustom extends Model {
    use HasFactory;
    public $timestamps = false;
    protected $table = 'shop_estimate_custom';
    protected $primaryKey = 'ec_id';
    protected $guarded = [];

    
}
