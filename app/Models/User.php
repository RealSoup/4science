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
    protected $option = [
        'grade' => [    '1' => 'NORMAL',
                        '2' => 'BRONZE',
                        '3' => 'SILVER',
                        '4' => 'GOLD',
                        '29' => '최고관리자', ],
        'job'   => [    '1'  => '교수',
                        '2'  => '연구원',
                        '3'  => '학부과정',
                        '4'  => '석사과정',
                        '5'  => '박사과정',
                        '6'  => '초중등교사',
                        '7'  => '영업/마케팅',
                        '8'  => '연구관리/기획',
                        '9'  => '사업기획',
                        '10' => '구매관리',
                        '11' => '일반관리',
                        '12' => '생산관리',
                        '13' => '기타', ],
        'join_route' => [   '1' => '네이버 검색',
                            '2' => '구글 검색',
                            '3' => '옥외광고',
                            '4' => '주위의 소개',
                            '5' => '학회 및 전시회 부스',
                            '6' => '잡지 소식지',
                            '7' => '기타', ],
        'interest'  => [    '1'  => '생명',
                            '2'  => '광학',
                            '3'  => '진공',
                            '4'  => '전자기기',
                            '5'  => '컴퓨터소프트웨어',
                            '6'  => '재료',
                            '7'  => '클린룸용품',
                            '8'  => '초자류',
                            '9'  => '이화학기기',
                            '10' => '교육용기자재',
                            '11' => '공구류',
                            '12' => '화학/화공',
                            '13' => '환경',
                            '14' => '시약', ],

    ];

    public function userMng() { return $this->hasOne(UserMng::class, 'um_user_id'); }
    public function order() { return $this->hasMany(\App\Models\Shop\Order::class, "created_id")->latest(); }
    public function estimateReq() { return $this->hasMany(\App\Models\Shop\EstimateReq::class, "created_id")->latest(); }
    public function mileage() { return $this->hasMany(Mileage::class, "ml_uid"); }
    public function wish() { return $this->hasMany(\App\Models\Shop\Wish::class, "created_id"); }
    public function engReform() { return $this->hasMany(EngReform::class, "created_id"); }

    public function scopeName($query, $name) { return $query->where('name', 'like', "%{$name}%"); }
    public function scopeEmail($query, $email) { return $query->where('email', 'like', "%{$email}%"); }
    public function scopeDepartment($query, $dp) { return $query->where('department', 'like', "%{$dp}%"); }
    public function scopeHp($query, $hp) { return $query->where('hp', 'like', "%{$hp}%"); }

    public function getIsAdminAttribute() { return $this->level > 10 ? true : false; }
    // public function getEnablemileageAttribute() {
    //     return DB::table('mileage')->where([['created_id', $this->id], ['created_at', '>', date("Y-m-d", strtotime("-1 years"))]])->sum('po_enable_p');
    // }
    
    public function getOption() { return $this->option; }
}
