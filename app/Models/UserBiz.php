<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBiz extends Model {
    protected $table = 'user_biz';
    protected $primaryKey = 'ub_id';
    public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['ub_num01', 'ub_num02', 'ub_num03'];
    
    public function fileInfo() { return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }

    public function getUbNum01Attribute() { return count(explode('-', $this->ub_num))>0 ? explode('-', $this->ub_num)[0] : ''; }
    public function getUbNum02Attribute() { return count(explode('-', $this->ub_num))>1 ? explode('-', $this->ub_num)[1] : ''; }
    public function getUbNum03Attribute() { return count(explode('-', $this->ub_num))>2 ? explode('-', $this->ub_num)[2] : ''; }
}
