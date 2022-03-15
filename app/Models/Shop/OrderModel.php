<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model {
    protected $table = 'shop_order_model';
    protected $primaryKey = 'odm_id';
    public $timestamps = false;
    protected $fillable = ['odm_edit_gap']; // 수정가능 필드 입력

    public function goodsModel() { return $this->hasOne(GoodsModel::class, 'gm_id', 'odm_gm_id'); }
    public function dlvy() { return $this->hasOne(Dlvy::class, 'dv_odm_id', 'odm_id'); }
    //public function user() { return $this->belongsTo(User::class, 'created_id'); }
    //public function scopeToday($query) { return $query->where('created_at', '>', 'curdate()'); }
}
