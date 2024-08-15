<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class UserCoupon extends Model {
    protected $table = 'user_coupon';
    protected $primaryKey = 'uc_id';
    protected $guarded = [];
    protected $appends = ['isDayLeft'];

    public function user()     { return $this->hasOne(User::class, 'id', 'uc_user_id'); }
    public function scopeMine($q) { return $q->when(auth()->check(), fn ($q, $v) => $q->where('uc_user_id', auth()->user()->id)); }
    public function scopeAvailable($q) { return $q->where('uc_is_use', 'N')->whereDate('uc_expiry_date', '>=', DB::raw('CURDATE()')); }
    public function getIsDayLeftAttribute() { return strtotime(date("Y-m-d")) <= strtotime($this->uc_expiry_date); }
}
