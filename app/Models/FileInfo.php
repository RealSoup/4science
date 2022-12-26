<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Storage;

class FileInfo extends Model {
    use HasFactory;

    protected $primaryKey = 'fi_id';
    protected $table = 'file_info';
    public $timestamps = false;
    protected $fillable = ['down']; // 수정가능 필드 입력
    protected $appends = ['path', 'path_thumb'];

    public function fileable() { return $this->morphTo(); }

    public function getPathAttribute() { return Storage::disk('s3')->url("api_{$this->fi_group}/{$this->fi_room}/{$this->fi_kind}/$this->fi_new"); }
    // public function getPathThumbAttribute() {
    //     if (isImg($this->fi_ext)) {
    //         $src = "/storage/{$this->fi_group}/{$this->fi_room}/{$this->fi_kind}/$this->fi_new";
    //     } else {
    //         if ($this->fi_ext=='pdf') $src = "/img/common/file_icon_pdf.png";
    //         else if ($this->fi_ext=='xlsx' || $this->fi_ext=='xls' || $this->fi_ext=='csv') $src = "/img/common/file_icon_excel.png";
    //         else $src = "/img/common/file_icon_default.png";
    //     }        
    //     return $src;
    // }

    public function scopeFi_group($query, string $fi_group) { return $query->where('fi_group', $fi_group); }
    public function scopeFi_key($query, int $fi_key) { return $query->where('fi_key', $fi_key); }
    public function scopeFi_room($query, string $fi_room) { return $query->where('fi_room', $fi_room); }
    public function scopeFi_kind($query, string $fi_kind) { return $query->where('fi_kind', $fi_kind); }    
}
