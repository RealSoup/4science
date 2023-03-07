<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

class UserSocial extends Model {    
    protected $table = 'user_social';
    protected $guarded = [];
    public function user() { return $this->belongsTo(User::class, 'user_id'); }

    public function store ($req, $id) {
        DB::table('user_social')->insert( [
                'provider'     => $req->provider,
                'social_id'    => $req->social_id,
                'social_token' => $req->social_token,
                'ip'           => $req->ip(),
                'user_id'      => $id, ] );
    }
    
}
