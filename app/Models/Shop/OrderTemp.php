<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderTemp extends Model {
    protected $table = 'user_mng';
    protected $primaryKey = 'um_id';
    public $timestamps = false;
    protected $guarded = [];

}
