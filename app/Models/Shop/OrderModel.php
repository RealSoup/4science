<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;
use Storage;

class OrderModel extends Model {
    protected $table = 'shop_order_model';
    protected $primaryKey = 'odm_id';
    public $timestamps = false;
    private $fallbackGoods = null;  //  대체 이미지용 상품 (img_src, img_thumb_src 에서 한 번만 조회)
    protected $appends = ['dlvy_chk', 'dlvy_all_in', 'img_src', 'img_thumb_src', 'odm_price_add_vat', 'b2b_chk', 'req_order'];

    public function getB2bChkAttribute() { return false; }
    public function getReqOrderAttribute() { return ''; }
    public function getDlvyChkAttribute() { return 'N'; }    //  관리자 주문 상세페이지 일괄 배송정보 등록시 사용
    public function getDlvyAllInAttribute() { return FALSE; }   //  관리자 주문 상세페이지 배송비 몰방 등록시 사용
    public function getImgSrcAttribute() { return self::gdImgSrc()[0]; }
    public function getImgThumbSrcAttribute() { return self::gdImgSrc(true)[0]; }
    public function getOdmPriceAddVatAttribute() { return floor($this->odm_price*1.1); }

    public function order() { return $this->belongsTo(Order::class, 'odm_od_id'); }
    public function goodsModel() { return $this->hasOne(GoodsModel::class, 'gm_id', 'odm_gm_id'); }
    public function orderDlvyInfo() { return $this->hasMany(OrderDlvyInfo::class, "oddi_odm_id"); }
    public function fileGoodsGoods() {  return $this->hasMany(\App\Models\FileGoods::class, 'fi_key', 'odm_gd_id')->Kind('goods')->orderBy('fi_seq'); }
    //public function user() { return $this->belongsTo(User::class, 'created_id'); }
    //public function scopeToday($query) { return $query->where('created_at', '>', 'curdate()'); }
    public function gdImgSrc($thumb=FALSE) {    // 상품 상세화면, 목록 이미지
        $rst = NULL;
        foreach ($this->fileGoodsGoods as $fi) {
            $th = $thumb ? '/thumb' : '';
            $src = "";
            if (strpos($fi->fi_new, "https://") === 0 || strpos($fi->fi_new, "http://") === 0)
                $src = $fi->fi_new;
            else
                $src = "/storage/api_{$fi->fi_group}/{$fi->fi_room}/{$fi->fi_kind}{$th}/{$fi->fi_new}";
            
            $rst[] = $src;
        }
        //  주문상품에 이미지가 없으면 상품 화면과 같은 대체 이미지(시약 제조사 로고 등)를 쓴다
        if (!$rst) {
            if ($this->fallbackGoods === null)
                $this->fallbackGoods = Goods::with(['fileGoodsGoods', 'goodsCategoryFirst', 'maker'])->find($this->odm_gd_id) ?? false;
            $rst = $this->fallbackGoods ? Goods::imgMaker($this->fallbackGoods, $thumb) : [noimg()];
        }
        return $rst;
    }
}
