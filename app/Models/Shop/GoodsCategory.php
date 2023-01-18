<?php
namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class GoodsCategory extends Model {
    protected $primaryKey = 'gc_id';
    protected $table = 'shop_goods_category';
    protected $guarded = [];
    public $timestamps = false;

    public function scopePrime($q) { return $q->where('gc_prime', 'Y'); }
    public function scopeCaId01($q, $id) { return $q->where('gc_ca01', $id); }
    public function scopeCaId02($q, $id) { return $q->where('gc_ca02', $id); }
    public function scopeCaId03($q, $id) { return $q->where('gc_ca03', $id); }
}
