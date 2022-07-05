<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use App\Models\Shop\{Goods};

class Board extends Model {
    use HasFactory;
    use SoftDeletes;
    protected $table;
    protected $primaryKey = 'bo_id';
    protected $dates = [ 'created_at', 'updated_at', 'deleted_at' ];
    // public $timestamps = false;
    protected $guarded = [];
    protected $appends = ['code', 'config'];
    protected static $code;
    protected static $config;
    // protected static $upload_path;
    

    protected $options = [
        'gd_inquiry'=> ['name'=> '상품문의', 'wlv'=>1, 'is_comment'=>true, 'is_addFile'=>false, 'is_qna'=>true ],
        'notice'    => ['name'=> '공지사항', 'wlv'=>20, 'is_comment'=>true, 'is_addFile'=>true, 'is_qna'=>false ],
        'review'    => ['name'=> '상품평',   'wlv'=>1, 'is_comment'=>true, 'is_addFile'=>true, 'is_qna'=>false ],
        'event'     => ['name'=> '이벤트',   'wlv'=>20, 'is_comment'=>true, 'is_addFile'=>false, 'is_qna'=>false ],
        'inquiry'   => ['name'=> '1:1문의',  'wlv'=>1, 'is_comment'=>true, 'is_addFile'=>false, 'is_qna'=>true ],
        'as'        => ['name'=> 'A/S신청',  'wlv'=>1, 'is_comment'=>true, 'is_addFile'=>false, 'is_qna'=>true ],
        'cancel'    => ['name'=> '취소/교환','wlv'=>1, 'is_comment'=>true, 'is_addFile'=>false, 'is_qna'=>true ],
    ];   

    public function setCode($bo_cd) {
        $this->table = 'board_'. $bo_cd;
        self::$code = $bo_cd;
        self::$config = $this->options[$bo_cd];
        // self::$upload_path = 'storage/board/'.$bo_cd;
        return $this;
    }

    public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }
    public function getCodeAttribute() { return self::$code; }
    public function getConfigAttribute() { return self::$config; }
    // public function getUploadPathAttribute() { return self::$upload_path; }

    public function fileInfo() { return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }
    public function fileInfo_bo() { return $this->fileInfo()->where("fi_kind", self::$code); }
    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'bo_gd_id'); }

    public function scopeSchSubject($query, $txt) { return $query->where('bo_subject', $txt); }
    public function scopeSchContent($query, $txt) { return $query->where('bo_content', $txt); }
    public function scopeSchWriter($query, $id) { return $query->where('created_id', $id); }



}
