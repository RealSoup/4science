<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use App\Models\Shop\{Goods};
use DateTimeInterface;

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
        'gd_inquiry'=> [ 'bo_cd'=> 'gd_inquiry', 'name'=> '상품문의', 'wlv'=>1, 'is_comment'=>false, 'is_addFile'=>false, 'is_qna'=>true ],
        'notice'    => [ 'bo_cd'=> 'notice',     'name'=> '공지사항', 'wlv'=>20, 'is_comment'=>false, 'is_addFile'=>true, 'is_qna'=>false ],
        'review'    => [ 'bo_cd'=> 'review',     'name'=> '상품평',   'wlv'=>1, 'is_comment'=>false, 'is_addFile'=>true, 'is_qna'=>false ],
        'event'     => [ 'bo_cd'=> 'event',      'name'=> '이벤트',   'wlv'=>20, 'is_comment'=>false, 'is_addFile'=>false, 'is_qna'=>false ],
        'inquiry'   => [ 'bo_cd'=> 'inquiry',    'name'=> '1:1문의',  'wlv'=>1, 'is_comment'=>false, 'is_addFile'=>true, 'is_qna'=>true ],
        'as'        => [ 'bo_cd'=> 'as',         'name'=> 'A/S신청',  'wlv'=>1, 'is_comment'=>false, 'is_addFile'=>false, 'is_qna'=>true ],
        'cancel'    => [ 'bo_cd'=> 'cancel',     'name'=> '취소/교환','wlv'=>1, 'is_comment'=>false, 'is_addFile'=>false, 'is_qna'=>true ],
        'requestAsk'=>'',
    ];   
    //  이거 안하면 디비랑 다른(UTC) 시간을 내보낸다.
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }
    public function setCode($bo_cd) {
        $this->table = 'board_'. $bo_cd;
        self::$code = $bo_cd;
        self::$config = $this->options[$bo_cd];
        // self::$upload_path = 'storage/board/'.$bo_cd;
        return $this;
    }

    // public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }
    public function getCodeAttribute() { return self::$code; }
    public function getConfigAttribute() { return self::$config; }
    // public function getUploadPathAttribute() { return self::$upload_path; }

    public function fileInfo() { return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }
    public function fileInfo_bo() { return $this->fileInfo()->where("fi_kind", self::$code); }
    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'bo_gd_id')->withDefault(); }

    public function scopeSubject($q, $v) { return $q->where('bo_subject', 'LIKE', "%{$v}%"); }
    public function scopeContent($q, $v) { return $q->where('bo_content', 'LIKE', "%{$v}%"); }
    public function scopeWriter($q, $v) { return $q->where('bo_writer', 'LIKE', "%{$v}%"); }
    public function scopeMine($q) { return $q->where('created_id', auth()->user()->id); }



}
