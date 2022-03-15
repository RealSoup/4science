<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use DB;

class User extends Authenticatable {
    use HasFactory, Notifiable, HasApiTokens;

    protected $guarded = [];
    protected $hidden = [ 'password', 'remember_token', ];
    protected $appends = ['is_admin'];
    protected $casts = [ 'email_verified_at' => 'datetime', ];
    protected $mngInfo = [
        'group' => [    '1' => '1팀',
                        '2' => '2팀',
                        '3' => '3팀',
                        'acc' => '회계팀',
                        'pla' => '기획팀',
                        'etc' => '기타' ],
        'position' => [ 1 => '사원',
                        2 => '대리',
                        3 => '과장',
                        4 => '차장',
                        5 => '부장',
                        6 => '이사',
                        7 => 'CEO', ],
    ];

    public function userMng() { return $this->hasOne(UserMng::class, 'um_user_id'); }
    public function order() { return $this->hasMany(\App\Models\Shop\Order::class, "created_id")->latest(); }
    public function estimateReq() { return $this->hasMany(\App\Models\Shop\EstimateReq::class, "created_id")->latest(); }
    public function point() { return $this->hasMany(Point::class, "po_uid"); }
    public function wish() { return $this->hasMany(\App\Models\Shop\Wish::class, "created_id"); }
    public function engReform() { return $this->hasMany(EngReform::class, "created_id"); }

    public function scopeName($query, $name) { return $query->where('name', 'like', "%" . $name . "%"); }
    public function scopeEmail($query, $email) { return $query->where('email', 'like', "%" . $email . "%"); }
    public function scopeDepartment($query, $dp) { return $query->where('department', 'like', "%" . $dp . "%"); }
    public function scopeHp($query, $hp) { return $query->where('hp', 'like', "%" . $hp . "%"); }

    public function getIsAdminAttribute() { return $this->level > 10 ? true : false; }
    // public function getEnablePointAttribute() {
    //     return DB::table('point')->where([['created_id', $this->id], ['created_at', '>', date("Y-m-d", strtotime("-1 years"))]])->sum('po_enable_p');
    // }
    public function getMngInfo() { return $this->mngInfo; }
}
