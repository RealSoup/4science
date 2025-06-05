<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use App\Models\FileInfo;
use Carbon\Carbon;

class Maker extends Model {
    protected $primaryKey = 'mk_id';
    protected $table = 'shop_makers';
    protected $fillable = ['mk_name', 'mk_desc', 'created_id', 'ip']; // 수정가능 필드 입력

    public function fileInfo() { return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }

    public function scopeSchMkName($query, $mk_name) { return $query->where('mk_name', 'like', "%" . $mk_name . "%"); }

    // 메이커 이름 리턴
    // public function getName($mk_id) { return $this->find($mk_id)->mk_name; }
}
