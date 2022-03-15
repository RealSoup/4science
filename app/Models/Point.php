<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Point extends Model {
    protected $primaryKey = 'po_id';
    protected $table = 'point';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['point'];

    protected $point = [
        'write' => 10,
        'comment' => 5,
        'good' => 3,
    ];

    public function getPointAttribute() { return $this->point; }

    public function scopeEnable($query) { return $query->whereRaw("created_at > SUBDATE(NOW(), INTERVAL 1 YEAR)"); }
}
