<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Storage;

class EstimateModel extends Model {
    use HasFactory;
    protected $table = 'shop_estimate_model';
    protected $primaryKey = 'em_id';
    protected $appends = ['em_check_opt', 'img_src', 'gain_mileage'];
    protected $guarded = [];
    public $timestamps = false;

    public function getEmCheckOptAttribute() { return 'Y'; }
    public function getImgSrcAttribute() { return self::gdImgSrc(true)[0]; }
    public function getGainMileageAttribute() { return round($this->em_price * (auth()->check() ? auth()->user()->my_mileage_rate / 100 : 0)); }
    
    public function estimateAble() { return $this->morphTo(); }
    public function estimateOption() {  return $this->hasMany(EstimateOption::class, "eo_em_id"); }
    public function bundleDc() { return $this->hasMany(BundleDc::class, "bd_gm_id", "em_gm_id"); }
    public function fileGoodsGoods() {  return $this->hasMany(\App\Models\FileGoods::class, 'fi_key', 'em_gd_id')->Kind('goods')->orderBy('fi_seq'); }

    public function goods() { return $this->hasOne(Goods::class, 'gd_id', 'em_gd_id')->withDefault(); }
    public function goodsModel() {  return $this->hasMany(GoodsModel::class, "gm_id", "em_gm_id"); }

    public function scopeTypeReply($query) { return $query->where('em_type', 'estimateReply'); }
    public function scopeType($query, $type) { return $query->where('em_type', $type); }
    public function scopePapaId($query, $id) { return $query->where('em_papa_id', $id); }

    public function gdImgSrc($thumb=FALSE) {    // 상품 상세화면, 목록 이미지
        $rst = NULL;
        foreach ($this->fileGoodsGoods as $fi) {
            $th = $thumb ? '/thumb' : '';
            $src = "";
            if (strpos($fi->fi_new, "https://") === 0 || strpos($fi->fi_new, "http://") === 0)
                $src = $fi->fi_new;
            else
                $src = Storage::disk('s3')->url("api_{$fi->fi_group}/{$fi->fi_room}/{$fi->fi_kind}{$th}/{$fi->fi_new}");
            $rst[] = $src;
        }
        if (!$rst){ $rst[] = noimg(); }
        return $rst;
    }

    //  요청한 상품 정보를 직배송 형태로 변환, 리턴
    public function dataAwesomeCollection($data) {
        $rst = collect([    'lists'=>collect(),
                            'price'=>collect([ 'goods'=>0, 'surtax'=>0, 'dlvy'=>0, 'sum'=>0 ]) ]);
        $collect = collect();
        $n_gd = new Goods;
        foreach ($data as $em) {
            if (!$collect->has($em->em_gd_id)) {
                if ($em->em_gd_id)  $gd = $n_gd->find($em->em_gd_id);
                else                $gd = collect([ 'gd_id'=>0, 'free_dlvy_max'=>$n_gd->free_dlvy_max, 'dlvy_fee_add_vat'=>$n_gd->dlvy_fee_add_vat ]);
                $gd->estimate_model=collect();
                $gd->goods_p=0;
                $collect[$em->em_gd_id] = $gd;
            }
            $collect[$em->em_gd_id]->estimate_model->push($em);

            $collect[$em->em_gd_id]->goods_p += $em->em_price*$em->em_ea;
            foreach ($em->estimateOption as $v)
                $collect[$em->em_gd_id]->goods_p += $v->eo_price*$v->eo_ea;

        }

        foreach ($collect as $key => $gd) {
            $pa_id = 0;
            if ($key && $gd->purchaseAt) { $pa_id = $gd->gd_pa_id; }  //  직배송 키 추출
            if (!$rst['lists']->has($pa_id)) { //  직배송 키로 컬랙션 생성
                $rst['lists']->put($pa_id, collect([
                    'price'=>collect([ 'goods'=>0, 'dlvy'=>0 ]),
                    'list'=>collect(),
                ]));
            }
            $rst['lists'][$pa_id]['list'][] = $gd;
            $rst['lists'][$pa_id]['price']['goods'] += $gd->goods_p;
            $rst['price']['goods'] += $gd->goods_p;
            $rst['price']['sum'] += $gd->goods_p;
        }

        foreach ($rst['lists'] as $key => $pa) {
            if ($key)
                $pa['price']['dlvy'] = $pa['list'][0]['purchaseAt']->pa_price_add_vat;
            else
                $pa['price']['dlvy'] = $pa['price']['goods'] < $pa['list'][0]['free_dlvy_max'] ? $pa['list'][0]['dlvy_fee_add_vat'] : 0;

            $rst['price']['dlvy'] += $pa['price']['dlvy'];
            $rst['price']['sum'] += $pa['price']['dlvy'];
        }
        $rst['price']['surtax'] = surtax($rst['price']['goods']);
        return $rst;
    }
}
