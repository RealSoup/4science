<?php

namespace App\Models\Shop;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\{User, FileInfo};
use Carbon\Carbon;
use DateTimeInterface;

class EstimateReply extends Model {
    use HasFactory;
    use SoftDeletes;
    protected $table = 'shop_estimate_reply';
    protected $primaryKey = 'er_id';
    protected $dates = [ 'created_at', 'updated_at', 'deleted_at' ];
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }

    public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }

    public function estimateModel() {   return $this->morphMany(EstimateModel::class, 'estimateAble', 'em_type', "em_papa_id")->orderBy('em_model_type'); }
    public function estimateReq() {     return $this->belongsTo(EstimateReq::class,      'er_eq_id'); }
    public function user() {            return $this->belongsTo(User::class, 'created_id'); }
    public function fileInfo() {    return $this->morphMany(FileInfo::class, 'fileable', 'fi_group', 'fi_key'); }

    public function scopeErId($query, $id_arr) {
        if ($id_arr->count() == 0) $id_arr = [0];
        return $query->whereIn('er_id', $id_arr);
    }
    public function scopeErEqId($query, $id) { return $query->where('er_eq_id', $id); }
    public function scopeStartDate($query, $date) { return $query->where('shop_estimate_reply.created_at', '>=', $date); }
    public function scopeEndDate($query, $date) { return $query->where('shop_estimate_reply.created_at', '<=', $date); }
    public function scopeStartPrice($query, $price) { return $query->where('er_all_price', '>=', $price); }
    public function scopeEndPrice($query, $price) { return $query->where('er_all_price', '<=', $price); }




    //  요청한 상품 정보를 직배송 형태로 변환, 리턴
    public function estimateModelPurchaseCollection($data) {
        // dd($data);
        $rst = collect([    'lists'=>collect(),
                            'price'=>collect([ 'goods'=>0, 'dlvy'=>0, 'air'=>0 ]) ]);
        $collect = collect();
        foreach ($data as $em) {
            $gd = new Goods;
            if (!$collect->has($em->em_gd_id)) {
                if ($em->em_gd_id)  $gd = $gd->find($em->em_gd_id);
                else                $gd->gd_id = 0;
                $gd->estimate_model = collect();
                $gd->goods_p=0;
                $collect[$em->em_gd_id] = $gd;
            }
            $collect[$em->em_gd_id]->estimate_model->push($em);
            $collect[$em->em_gd_id]->goods_p += $em->em_price*$em->em_ea;
            // foreach ($em->estimateOption as $v)
            //     $collect[$em->em_gd_id]->goods_p += $v->eo_price*$v->eo_ea;
        }
// dd($collect->toArray());
        foreach ($collect as $key => $gd) {
            $pa_id = 0;
            if ($key && $gd->purchaseAt) { $pa_id = $gd->gd_pa_id; }  //  직배송 키 추출
            if (!$rst['lists']->has($pa_id)) { //  직배송 키로 컬랙션 생성
                $rst['lists']->put($pa_id, collect([
                    'price'=>collect([ 'goods'=>0, 'dlvy'=>0, 'air'=>0 ]),
                    'list'=>collect(),
                ]));
            }
            $rst['lists'][$pa_id]['list'][] = $gd;
        }

        foreach ($rst['lists'] as $pa_key => $pa) {
            $pa['price']['goods'] = $pa['list']->sum('goods_p');
            if ($pa_key && $pa['list'][0]['purchaseAt']->pa_type == "AIR") {
                $pa['price']['air'] = $pa['list'][0]['purchaseAt']->pa_price;
                $pa['price']['air_add_vat'] = $pa['list'][0]['purchaseAt']->pa_price_add_vat;
            } else {
                //  10만원 이상시 배송료 무료 정책은
                //  부가세 제외 금액을 기준으로 한다.
                $pa['price']['dlvy'] = $pa['price']['goods'] < $pa['list'][0]['free_dlvy_max'] ? $pa['list'][0]['dlvy_fee'] : 0;
                $pa['price']['dlvy_add_vat'] = rrp($pa['price']['dlvy']);
            }
            $rst['price']['goods'] += $gd->goods_p;
            $rst['price']['air'] += $pa['price']['air'];
            $rst['price']['dlvy'] += $pa['price']['dlvy'];
        }

        $rst['price']['surtax'] = surtax($rst['price']['goods']);
        $rst['price']['goods_add_vat'] = $rst['price']['goods'] + $rst['price']['surtax'];
        $rst['price']['dlvy_add_vat']  = rrp($rst['price']['dlvy']);
        $rst['price']['air_add_vat']   = rrp($rst['price']['air']);
        $rst['price']['total'] = $rst['price']['goods_add_vat'] + $rst['price']['dlvy_add_vat'] + $rst['price']['air_add_vat'];

        return $rst;
    }
}