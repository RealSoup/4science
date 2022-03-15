<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserBiz extends Model {
    protected $table = 'users_biz';
    protected $primaryKey = 'ub_id';
    public $timestamps = false;
    protected $guarded = [];
}
