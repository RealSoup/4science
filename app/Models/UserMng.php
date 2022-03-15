<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class UserMng extends Authenticatable {
    use HasFactory, Notifiable;

    protected $primaryKey = 'um_id';
    protected $table = 'user_mng';
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $mngInfo = [
        'group' => [
            '1' => '1팀',
            '2' => '2팀',
            '3' => '3팀',
            'acc' => '회계팀',
            'pla' => '기획팀',
            'etc' => '기타'
        ],
        'position' => [
            1 => '사원',
            2 => '대리',
            3 => '과장',
            4 => '차장',
            5 => '부장',
            6 => '이사',
            7 => 'CEO',
        ],
    ];

    public function scopeGroup($query, $group) { return $query->where('um_group', $group); }

    public function getUmPositionAttribute( $value ) { return $this->mngInfo['position'][$value]; }
    public function getMngInfo() { return $this->mngInfo; }
}
