<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddr extends Model {
    protected $table = 'user_addr';
    protected $primaryKey = 'ua_id';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['ua_hp1', 'ua_hp2', 'ua_hp3'];

    public function getUaHp1Attribute() { return explode('-', $this->ua_hp)[0]; }
    public function getUaHp2Attribute() { return explode('-', $this->ua_hp)[1]; }
    public function getUaHp3Attribute() { return explode('-', $this->ua_hp)[2]; }

    // public function user() { return $this->belongsTo(User::class, 'ua_key'); }
}
