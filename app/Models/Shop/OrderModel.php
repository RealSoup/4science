<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model {
    protected $table = 'shop_order_model';
    protected $primaryKey = 'odm_id';
    public $timestamps = false;
    protected $appends = ['dlvy_chk', 'img_src', 'odm_price_add_vat', 'b2b_chk', 'req_order'];

    public function getB2bChkAttribute() { return false; }
    public function getReqOrderAttribute() { return ''; }
    public function getDlvyChkAttribute() { return 'N'; }    //  관리자 주문 상세페이지 일괄 배송정보 등록시 사용
    public function getImgSrcAttribute() { return self::gdImgSrc(true)[0]; }
    public function getOdmPriceAddVatAttribute() { return intval($this->odm_price*1.1); }

    public function goodsModel() { return $this->hasOne(GoodsModel::class, 'gm_id', 'odm_gm_id'); }
    public function orderDlvyInfo() { return $this->hasOne(OrderDlvyInfo::class, "oddi_odm_id")->withDefault(); }
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
                $src = "/storage/goods/{$fi->fi_room}/{$fi->fi_group}{$th}/".$fi->fi_new;
            
            $rst[] = $src;
        }
        if (!$rst){ $rst[] = noimg($thumb); }
        return $rst;
    }
}
