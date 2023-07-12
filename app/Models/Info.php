<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Info extends Model {
    public $timestamps = false;
    protected $guarded = [];

    public function scopeKey($q, $v) { return $q->where('key', $v); }
}
