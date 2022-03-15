<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimateOption extends Model {
    use HasFactory;
    public $timestamps = false;
    protected $table = 'shop_estimate_option';
    protected $primaryKey = 'eo_id';
    protected $appends = ['eo_check_opt'];
    protected $guarded = [];

    public function getEoCheckOptAttribute() { return 'Y'; }

    public function scopeEmId($query, $id) { return $query->where('eo_em_id', $id); }
}
