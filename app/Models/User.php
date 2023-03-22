<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use DB;

class User extends Authenticatable implements MustVerifyEmail {
    use HasFactory, Notifiable, HasApiTokens;

    protected $guarded = [];
    protected $hidden = [ 'password' ];
    protected $appends = ['is_admin', 'is_super', 'my_mileage_rate', 'hp01', 'hp02', 'hp03'];
    protected $casts = [ 'email_verified_at' => 'datetime', ];
    public static $option = [
        'group' => [    '1' => '일반',
                        '2' => '특수',
                        '3' => '미수',
                        '4' => '후불', ],
        'grade' => [    '1' => '신입',
                        '2' => '브론즈',
                        '3' => '실버',
                        '4' => '골드',
                        '11' => '딜러',
                        '20' => '관리자',
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
        'email_domain'  => [    '1'  => 'naver.com',
                                '2'  => 'hanmail.net',
                                '3'  => 'nate.com',
                                '4'  => 'gmail.com',
                                '5'  => 'korea.com',
                                '6'  => 'hotmail.com',],

    ];

    protected $mileage_rate = [ 2 => 0.5, 3 => 1, 4 => 1.5 ];
    

    public function userMng() { return $this->hasOne(UserMng::class, 'um_user_id')->withDefault(); }
    public function userMngConfig() { return $this->hasMany(UserMngConfig::class, 'umc_user_id')->orderBy('umc_key')->orderBy('umc_seq'); }
    public function order() { return $this->hasMany(\App\Models\Shop\Order::class, "created_id")->latest(); }
    public function estimateReq() { return $this->hasMany(\App\Models\Shop\EstimateReq::class, "created_id")->latest(); }
    public function userMileage() { return $this->hasMany(UserMileage::class, "ml_uid"); }
    public function wish() { return $this->hasMany(\App\Models\Shop\Wish::class, "created_id"); }
    public function engReform() { return $this->hasMany(EngReform::class, "created_id"); }
    public function userAddr() { return $this->hasMany(UserAddr::class, 'ua_key')->orderByRaw("FIELD(ua_def, \"Y\", \"N\")"); }

    public function scopeStartDate($query, $d) { return $query->whereDate('created_at', '>=', $d); }
    public function scopeEndDate($query, $d) { return $query->whereDate('created_at', '<=', $d); }
    public function scopeGroup($query, $v) { return $query->where('group', $v); }
    public function scopeLevel($query, $v) { return $query->where('level', $v); }

    public function scopeName($query, $v) { return $query->where('name', 'like', "%{$v}%"); }
    public function scopeEmail($query, $v) { return $query->where('email', 'like', "%{$v}%"); }
    public function scopeOffice($query, $v) { return $query->where('office', 'like', "%{$v}%"); }
    public function scopeDepartment($query, $v) { return $query->where('department', 'like', "%{$v}%"); }
    public function scopeTutor($query, $v) { return $query->where('tutor', 'like', "%{$v}%"); }
    public function scopeTel($query, $v) { return $query->where('tel', 'like', "%{$v}%"); }
    public function scopeHp($query, $v) { return $query->where('hp', 'like', "%{$v}%"); }

    public function getIsAdminAttribute() { return $this->level >= 20 ? true : false; }
    public function getIsSuperAttribute() { return $this->level == 29 ? true : false; }
    public function getMyMileageRateAttribute() {
        $lv = $this->level>4?4:$this->level;
        return $lv < 2 ? 0 : $this->mileage_rate[$lv]; 
    }
    public function getHp01Attribute() { return count(explode('-', $this->hp))>0 ? explode('-', $this->hp)[0] : ''; }
    public function getHp02Attribute() { return count(explode('-', $this->hp))>1 ? explode('-', $this->hp)[1] : ''; }
    public function getHp03Attribute() { return count(explode('-', $this->hp))>2 ? explode('-', $this->hp)[2] : ''; }
    // public function getEnablemileageAttribute() {
    //     return DB::table('mileage')->where([['created_id', $this->id], ['created_at', '>', date("Y-m-d", strtotime("-1 years"))]])->sum('po_enable_p');
    // }
}
