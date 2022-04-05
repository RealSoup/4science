<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowWindow extends Model {
    protected $primaryKey = 'sw_id';
    protected $table = 'show_window';
    public $timestamps = false;
    protected $guarded = [];

    public function goods() {  return $this->hasOne(\App\Models\Shop\Goods::class, 'gd_id', 'sw_key'); }
}
