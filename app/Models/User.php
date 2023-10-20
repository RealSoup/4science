<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use DB;
use Carbon\Carbon;
use DateTimeInterface;

class User extends Authenticatable implements MustVerifyEmail {
    use HasFactory, Notifiable, HasApiTokens;

    protected $guarded = [];
    protected $hidden = [ 'password' ];
    protected $appends = ['is_admin', 'is_super', 'is_dealer', 'mileage_mul', 'hp01', 'hp02', 'hp03', 'dc_mul'];
    protected $casts = [ 'email_verified_at' => 'datetime', ];
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }
    public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }
    public static $option = [
        'group' => [    '1' => '일반',
                        '2' => '특별',
                        '3' => '미수',
                        '4' => '후불', ],
        'grade' => [    '1' => '신입',
                        '2' => '브론즈',
                        '3' => '실버',
                        '4' => '골드',
                        '11' => '딜러 신입',
                        '12' => '딜러',
                        '21' => '관리자',
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
    public function userBiz() { return $this->hasOne(UserBiz::class, 'ub_papa_id')->with('fileInfo')->withDefault(); }

    public function scopeStartDate($query, $d) { return $query->whereDate('created_at', '>=', $d); }
    public function scopeEndDate($query, $d) { return $query->whereDate('created_at', '<=', $d); }
    public function scopeGroup($query, $v) { return $query->where('group', $v); }
    public function scopeLevel($query, $v) { return $query->where('level', $v); }

    public function scopeName($query, $v) { return $query->where('name', 'like', "%{$v}%"); }
    public function scopeEmail($query, $v) { return $query->where('email', 'like', "%{$v}%"); }
    public function scopePart($query, $v) { return $query->where('part', 'like', "%{$v}%"); }
    public function scopeCompany($query, $v) { return $query->where('company', 'like', "%{$v}%"); }
    public function scopeTutor($query, $v) { return $query->where('tutor', 'like', "%{$v}%"); }
    public function scopeTel($query, $v) { return $query->where('tel', 'like', "%{$v}%"); }
    public function scopeHp($query, $v) { return $query->where('hp', 'like', "%{$v}%"); }
    public function scopeAdmin($q) { return $q->where('level', '>', 20); }
    public function scopeMember($q) { return $q->where('level', '<', 20); }

    public function getIsAdminAttribute() { return $this->level > 20 ? true : false; }
    public function getIsSuperAttribute() { return $this->level == 29 ? true : false; }
    public function getIsDealerAttribute() { return ($this->level == 12) ? true : false; }
    public function getMileageMulAttribute() {
        $lv = $this->level;
        if ($lv>4) $lv = 4;
        if ($lv<2) $lv = 2;
        $rate = $this->mileage_rate[$lv];
        return $rate/100; 
    }
    public function getHp01Attribute() { return count(explode('-', $this->hp))>0 ? explode('-', $this->hp)[0] : ''; }
    public function getHp02Attribute() { return count(explode('-', $this->hp))>1 ? explode('-', $this->hp)[1] : ''; }
    public function getHp03Attribute() { return count(explode('-', $this->hp))>2 ? explode('-', $this->hp)[2] : ''; }
    public function getDcMulAttribute() { return $this->level == 12 ? 0.95 : 1; }
    // public function getEnablemileageAttribute() {
    //     return DB::table('mileage')->where([['created_id', $this->id], ['created_at', '>', date("Y-m-d", strtotime("-1 years"))]])->sum('po_enable_p');
    // }

    public static function validate_rule_msg($isDealer=false) {
        $rule = [
            'name' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'confirmed', 'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{6,20}$/'],
            'company' => ['required'],
            'hp' => ['required', 'regex:/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/'],
            'birth' => ['required', 'regex:/^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/'],
            'code_01' => ['exists:users,id', 'nullable']
        ];
        $message = [
            'name.required' => '이름을 입력하세요.',
            'name.string' => '이름은 문자만 입력하세요.',
            'email.required' => '이메일을 입력하세요.',
            'email.unique' => '이미 가입된 이메일입니다.',
            'email.email' => '이메일 형식에 맞게 입력하세요.',
            'email.string' => '이메일은 문자열만 입력하세요.',
            'password.regex' => '숫자, 문자 1개 이상. 6 ~ 20자 조합. 가능한 특수문자 ~!@#$%^&*()+|=',
            'password.required' => '비밀번호를 입력하세요.',
            'password.confirmed' => '비밀번호와 비밀번호 확인이 서로 다릅니다.',
            'company.required' => '직장 또는 학교명을 입력하세요.',
            'hp.required' => '휴대전화 번호를 입력하세요.',
            'hp.regex' => '휴대전화 번호 입력형식은 01x-xxx(x)-xxxx 입니다.',
            'birth.required' => '생년월일을 입력하세요',
            'birth.regex' => '생년월일 입력형식은 xxxx-xx-xx 입니다.',
            'code_01.exists' => '존재하지 않는 추천인 코드입니다.',
        ];

        if ( $isDealer ) {
            $rule['ub_num'] = ['required', 'regex:/^(\d{3,3})+[-]+(\d{2,2})+[-]+(\d{5,5})/'];
            $rule['ub_corp_name'] = ['required'];
            $rule['file_info'] = ['required'];
            $rule['ub_name'] = ['required', 'string'];
            $rule['ub_tel'] = ['required'];
            $rule['ub_zip'] = ['required', 'string'];
            $rule['ub_addr1'] = ['required', 'string'];
            $rule['ub_addr2'] = ['required', 'string'];
            $rule['ub_type'] = ['required', 'string'];
            $rule['ub_cond'] = ['required', 'string'];

            $message['ub_num.required'] = ['사업자 등록번호를 입력하세요.'];
            $message['ub_num.regex'] = ['사업자 등록번호를 형식에 맞게 입력하세요.'];
            $message['ub_corp_name.required'] = ['법인(상호)명을 입력하세요.'];
            $message['file_info.required'] = ['사업자 등록증을 첨부해 주세요'];
            $message['ub_name.required'] = ['대표자명을 입력하세요.'];
            $message['ub_name.string'] = ['대표자명은 문자열만 입력 할 수 있습니다.'];
            $message['ub_tel.required'] = ['대표 전화번호를 입력하세요.'];
            $message['ub_zip.required'] = ['우편번호를 검색하세요.'];
            $message['ub_zip.string'] = ['우편번호는 숫자만 입력하세요.'];
            $message['ub_addr1.required'] = ['주소를 검색해 주세요.'];
            $message['ub_addr1.string'] = ['주소는 문자열만 입력 할 수 있습니다.'];
            $message['ub_addr2.required'] = ['상세주소를 입력하세요.'];
            $message['ub_addr2.string'] = ['상세주소는 문자열만 입력 할 수 있습니다.'];
            $message['ub_type.required'] = ['업종을 입력하세요.'];
            $message['ub_type.string'] = ['업종은 문자열만 입력 할 수 있습니다.'];
            $message['ub_cond.required'] = ['업태를 입력하세요.'];
            $message['ub_cond.string'] = ['업태는 문자열만 입력 할 수 있습니다.'];
        }
        return ['rule'=>$rule, 'message'=>$message];
    }
}
