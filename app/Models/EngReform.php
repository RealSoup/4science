<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngReform extends Model {
    protected $table = 'eng_reform';
    protected $primaryKey = 'er_id';
    public $timestamps = false;
    protected $guarded = [];

    public function user() { return $this->belongsTo(User::class, 'created_id'); }
    public function mng() { return $this->belongsTo(User::class, 'updated_id'); }
    public function fileInfo() { return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }

    public function scopeStartDate($query, $date) { return $query->where('created_at', '>=', $date); }
    public function scopeEndDate($query, $date) { return $query->where('created_at', '<=', $date); }
    public function scopeStep($query, $step) { return $query->where('er_step', $step); }
    public function scopeName($query, $name) { return $query->where('er_name', 'like', '%'.$name.'%'); }
    public function scopeDemand($query, $demand) { return $query->where('er_demand', 'like', '%'.$demand.'%'); }
    public function scopeEmail($query, $email) { return $query->where('er_email', 'like', '%'.$email.'%'); }
    public function scopeTel($query, $tel) { return $query->where('er_tel', $tel); }
    public function scopeHp($query, $hp) { return $query->where('er_hp', $hp); }
     
}
