<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Storage;

class FileGoods extends Model {
    protected $primaryKey = 'fi_id';
    protected $table = 'file_goods';
    public $timestamps = false;
    protected $fillable = ['down']; // 수정가능 필드 입력
    protected $appends = ['path', 'path_thumb', 'down_path'];

    public function getPathAttribute() { return $this->getPath(); }
    public function getPathThumbAttribute() { return $this->getPath('thumb'); }
    public function getDownPathAttribute() { return "api_{$this->fi_group}/{$this->fi_room}/{$this->fi_kind}/$this->fi_new"; }

    public function scopeKey($query, int $fi_key) { return $query->where('fi_key', $fi_key); }
    public function scopeGroup($query, string $group) { return $query->where('fi_group', $group); }
    public function scopeKind($query, string $kind) { return $query->where('fi_kind', $kind); }

    public function getPath($sub=NULL) {
        if (isImg($this->fi_ext)) {
            $src = "api_{$this->fi_group}/{$this->fi_room}/{$this->fi_kind}/";
            $src .= ($sub) ? "{$sub}/" : '';
            $src .= $this->fi_new;
            $src = Storage::disk('s3')->url($src);
        } else {
            if ($this->fi_ext=='pdf') $src = Storage::disk('s3')->url("common/file_icon_pdf.png");
            else if ($this->fi_ext=='xlsx' || $this->fi_ext=='xls' || $this->fi_ext=='csv') $src = Storage::disk('s3')->url("common/file_icon_excel.png");
            else $src = Storage::disk('s3')->url("common/file_icon_default.png");
        }
        return $src;
    }
}
