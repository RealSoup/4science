<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimateOption extends Model {
    use HasFactory;
    public $timestamps = false;
    protected $table = 'shop_estimate_option';
    protected $primaryKey = 'eo_id';
    protected $appends = ['eo_check_opt', 'gain_mileage'];
    protected $guarded = [];

    public function getEoCheckOptAttribute() { return 'Y'; }
    public function getGainMileageAttribute() { return $this->eo_price * auth()->check() ? auth()->user()->my_mileage_rate : 0 / 100; }

    public function scopeEmId($query, $id) { return $query->where('eo_em_id', $id); }
}
