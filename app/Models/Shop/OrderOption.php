<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderOption extends Model {
    protected $table = 'shop_order_option';
    protected $primaryKey = 'odo_id';
    public $timestamps = false;

    public function optionChild() { return $this->hasOne(OptionChild::class, 'opc_id', 'odo_opc_id'); }
    //protected $fillable = ['od_no', 'created_id', 'created_at', 'ip']; // 수정가능 필드 입력

    //public function user() { return $this->belongsTo(User::class, 'created_id'); }
    //public function scopeToday($query) { return $query->where('created_at', '>', 'curdate()'); }
}
