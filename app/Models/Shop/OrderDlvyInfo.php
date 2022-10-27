<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderDlvyInfo extends Model {
    protected $table = 'shop_order_dlvy_info';
    protected $primaryKey = 'oddi_id';
    public $timestamps = false;
    protected $guarded = [];
    // protected $attributes = [ 'odg_dlvy_com' => '한진택배' ];
    //protected $fillable = ['od_no', 'created_id', 'created_at', 'ip']; // 수정가능 필드 입력

    // public function getOdgDlvyComAttribute($v) { return (is_null($v)) ? '한진택배' : $v; }

    // public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'odg_gd_id')->withDefault(); }
    // public function orderModel() { return $this->hasMany(OrderModel::class, "odm_odg_id", "odg_id"); }
    // public function orderOption() { return $this->hasMany(OrderOption::class, "odo_odg_id", "odg_id"); }

    //public function user() { return $this->belongsTo(User::class, 'created_id'); }
    //public function scopeToday($query) { return $query->where('created_at', '>', 'curdate()'); }
}
