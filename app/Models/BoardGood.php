<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BoardGood extends Model {
    protected $table = 'board_good';
    protected $primaryKey = 'bg_id';
    public $timestamps = false;
    protected $guarded = [];

    public function scopeTable($query, string $bo_cd) { return $query->where('bg_table', $bo_cd); }
    public function scopeBoId($query, string $bo_id) { return $query->where('bg_bo_id', $bo_id); }
    public function scopeUser($query, string $uid) { return $query->where('created_id', $uid); }

}
