<?php

namespace App\Models\Shop;

// use App\Events\GoodsDeleted;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;
use App\Models\{User, FileGoods};
use DB;
use Storage;
use DateTimeInterface;
use Illuminate\Support\Arr;

class Goods extends Model {
    use SoftDeletes;
    protected $primaryKey = 'gd_id';
    protected $dates = [ 'created_at', 'updated_at', 'deleted_at' ];
    protected $table = 'shop_goods';
    protected $appends = ['image_src', 'image_src_thumb', 'dlvy_fee', 'dlvy_fee_add_vat', 'free_dlvy_max'];
    protected $casts = [
        'gm_price_add_vat' => 'integer',
        'created_at' => 'datetime:Y-m-d H:i'
    ];
    protected function serializeDate(DateTimeInterface $date) { return $date->format('Y-m-d H:i:s'); }
//    protected $fillable = ['ca_order', 'ca_name']; // 수정가능 필드 입력

    protected $dlvy_fee = 4000;
    protected $free_dlvy_max = 100000;


    public function getImageSrcAttribute() { return self::gdImgSrc(); }
    public function getImageSrcThumbAttribute() { return self::gdImgSrc(true); }
    // public function getMkNameAttribute() { return isset($this->maker) ? $this->maker->mk_name : NULL; }
    // public function getManagerAttribute() { return isset($this->user) ? $this->user->name : NULL; }

    public function getDlvyFeeAttribute() { return $this->dlvy_fee; }
    public function getDlvyFeeAddVatAttribute() { return (int)($this->dlvy_fee*1.1); }
    public function getFreeDlvyMaxAttribute() { return $this->free_dlvy_max; }

    // public function getGmPriceAddVatAttribute($v) { return ($v>0) ? intval($v) : '견적가'; }
    // public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }


    public function goodsCategory() {       return $this->hasMany(GoodsCategory::class, "gc_gd_id")->Prime(); }
    public function goodsCategoryFirst() {  return $this->hasOne(GoodsCategory::class, "gc_gd_id")->Prime(); }
    public function goodsModel() {          return $this->hasMany(GoodsModel::class, "gm_gd_id")->orderBy('gm_catno03'); }
    public function goodsOption() {         return $this->hasMany(GoodsOption::class, "go_gd_id")->orderBy('go_required'); }
    public function hashJoin() {            return $this->hasMany(HashJoin::class, "gd_id"); }
    public function fileGoods() {           return $this->hasMany(FileGoods::class, 'fi_key')->orderBy('fi_seq'); }
    public function fileGoodsAdd() {        return $this->hasMany(FileGoods::class, 'fi_key')->Kind('add')->orderBy('fi_seq'); }
    public function fileGoodsGoods() {      return $this->hasMany(FileGoods::class, 'fi_key')->Kind('goods')->orderBy('fi_seq'); }
    public function user() {                return $this->belongsTo(User::class, 'created_id'); }
    public function maker() {               return $this->hasOne(Maker::class, 'mk_id', 'gd_mk_id')->withDefault(); }
    public function purchaseAt() {          return $this->hasOne(PurchaseAt::class, 'pa_id', 'gd_pa_id'); }

    public function scopeSchGd_id($q, $id_arr)      { return $q->whereIn('gd_id', $id_arr); }
    public function scopeSchGd_mk_id($q, $id_arr)   { return $q->whereIn('gd_mk_id', $id_arr); }
    public function scopeSchGd_name($q, $gd_name)   { return $q->where('gd_name', 'like', "%" . $gd_name . "%"); }
    public function scopeSchWriter($q, $id_arr)     { return $q->whereIn('created_id', $id_arr); }
    public function scopeStartDate($q, $d)          { return $q->whereDate('created_at', '>=', $d); }
    public function scopeEndDate($q, $d)            { return $q->whereDate('created_at', '<=', $d); }
    public function scopeEnable($q)                 { return $q->where('gd_enable', 'Y'); }
    public function scopeMaker($q, $v)              { return $q->where('gd_mk_id', $v); }
    public function scopeCa01($q, $id)              { return $q->where('gc_ca01', $id); }
    public function scopeCa02($q, $id)              { return $q->where('gc_ca02', $id); }
    public function scopeCa03($q, $id)              { return $q->where('gc_ca03', $id); }
    public function scopeCa04($q, $id)              { return $q->where('gc_ca04', $id); }

    public function joinGoodsCate() { return $this->join('shop_goods_category', 'shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id'); }

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
        if (!$rst){ $rst[] = noimg($thumb); }
        return $rst;
    }

    public static function gdMaker($gd_id) {
        return Maker::find(self::select('gd_mk_id')->find($gd_id)->gd_mk_id)->mk_name;
    }



    //  요청한 상품 정보를 직배송 형태로 변환, 리턴
    public function getGoodsDataCollection($some, $type='buy_cart') {
        $rst = [ 'lists'=>array(), 'price'=>array() ];
        $d_arrange = Array();
        switch ($type) {
            case 'buy_inst':    //  바로 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
            case 'buy_cart':    //  장바구니에서 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
            case 'request_estimate':    //  유저가 견적요청(상품페이지, 장바구니에서)시 데이터 편집
                foreach ($some['goods'] as $item) {
                    if ( array_key_exists('gm_id', $item) ) 
                        $d_arrange[$item['gd_id']]['model'][$item['gm_id']] = [ 'gm_id' => $item['gm_id'], 'ea' => $item['ea'] ];
                    else if ( array_key_exists('goc_id', $item) ) 
                        $d_arrange[$item['gd_id']]['option'][$item['goc_id']] = [ 'goc_id' => $item['goc_id'], 'ea' => $item['ea'] ];
                }
            break;
            case 'buy_estimate':    //  견적서에서 구매 눌렀을때 ( or 임의주문 )구매페이지에서 쓰기위한 데이터 편집
                foreach ($some['goods'] as $v) {
                    // if (!array_key_exists($v['gd_id'], $d_arrange))
                    //     $d_arrange[$v['gd_id']] = collect(['model'=>collect(), 'option'=>collect()]);
                    if (array_key_exists('em_id', $v))
                        $d_arrange[$v['gd_id']]['model'][$v['em_id']] = [ 'em_id' => $v['em_id']];
                    if (array_key_exists('eo_id', $v))
                        $d_arrange[$v['gd_id']]['option'][$v['eo_id']] = [ 'eo_id' => $v['eo_id']];
                }
            break;

            case 'order':   //  관리자 주문 상세페이지에서 주문 상품을 보여주기 위한 데이터 편집
                foreach ($some->orderPurchaseAt as $opa) {
                    foreach ($opa->orderModel as $odm) {
                        if ( $odm->odm_gm_id > 0 ) {
                            if ($odm->odm_type == 'MODEL') {
                                $d_arrange[$odm->odm_gd_id]['model'][$odm->odm_gm_id] = [ 
                                    'gm_id' => $odm->odm_gm_id,
                                    'ea' => $odm->odm_ea,
                                    'odm_id' => $odm->odm_id,
                                    'odm_price' => $odm->odm_price 
                                ];
                            } else if ($odm->odm_type == 'OPTION') {
                                $d_arrange[$odm->odm_gd_id]['option'][$odm->odm_gm_id] = [
                                    'goc_id'    => $odm->odm_gm_id,
                                    'ea'        => $odm->odm_ea,
                                    'odo_id'    => $odm->odm_id,
                                    'odo_price' => $odm->odm_price 
                                ];
                            }
                        } else  //  임의 견적시 임의 상품을 주문하면 상품검색이 안되므로
                            $d_arrange[0]['model'][] = $odm;
                    }
                }
            break;

            case 'cart':    //  장바구니 목록을 보여주기 위한 데이터 편집           
                foreach ($some as $ct) {
                    foreach ($ct->cartModel as $cm)
                        $d_arrange[$ct->ct_gd_id]['model'][$cm->cm_gm_id] = [ 'gm_id' => $cm->cm_gm_id, 'ea' => $cm->cm_ea, 'cm_id' => $cm->cm_id ];
                    
                    foreach ($ct->cartOption as $co)
                        $d_arrange[$ct->ct_gd_id]['option'][$co->co_goc_id] = [ 'goc_id' => $co->co_goc_id, 'ea' => $co->co_ea, 'co_id' => $co->co_id ];
                }
            break;
        }

        foreach ($d_arrange as $gd_id => $v) {
            if ($type== 'buy_estimate') {
                if (isset($v['model'])) {
                    $gd = self::with('purchaseAt')->find($gd_id) ?? new self;
                    foreach (EstimateModel::find(Arr::pluck($v['model'], 'em_id')) as $em) {
                        $tmpModel = [   'type'              => 'model',
                                        'gd_id'             => $gd_id,
                                        'pa_name'           => $gd->purchaseAt ? $gd->purchaseAt->pa_name : NULL,
                                        'pa_type'           => $gd->purchaseAt ? $gd->purchaseAt->pa_type : NULL,
                                        'pa_dlvy_p'         => $gd->purchaseAt ? $gd->purchaseAt->pa_price : 0,
                                        'pa_dlvy_p_add_vat' => $gd->purchaseAt ? $gd->purchaseAt->pa_price_add_vat : 0,
                                        'gd_enable'         => NULL,
                                        'gm_enable'         => NULL,
                                        'gm_prime'          => NULL,
                                        'gm_id'             => $em->em_gm_id,
                                        'ea'                => $em->em_ea,
                                        'img'               => $gd->image_src_thumb[0],
                                        'gd_name'           => $gd->gd_name,
                                        'gm_name'           => $em->em_name,
                                        'gm_catno'          => $em->em_catno,
                                        'gm_code'           => $em->em_code,
                                        'gm_spec'           => $em->em_spec,
                                        'gm_unit'           => $em->em_unit,
                                        'mk_name'           => $em->em_maker,
                                        'price'             => $em->em_price,
                                        'price_add_vat'     => rrp($em->em_price),
                                        'gain_mileage'      => $em->gain_mileage];
                        $rst['lists'][$gd->gd_pa_id??0][] = $tmpModel;
                    }

                    if(isset($v['option'])){
                        foreach (EstimateOption::find(Arr::pluck($v['option'], 'eo_id')) as $eo) {
                            $tmpOption = [  'type'          => 'option',
                                            'gd_id'         => $gd_id,
                                            'goc_id'        => $eo->eo_goc_id,
                                            'ea'            => $eo->eo_ea,
                                            'go_name'       => $eo->eo_tit,
                                            'goc_name'      => $eo->eo_name,
                                            'price'         => $eo->eo_price,
                                            'price_add_vat' => rrp($eo->eo_price),
                                            'gain_mileage'  => $eo->gain_mileage, ];
                            $rst['lists'][$gd->gd_pa_id??0][] = $tmpOption;
                        }
                    }
                }
            } else {
                $gd = self::with('purchaseAt')->with('maker')->find($gd_id);
                if ( $gd_id > 0 ) {
                    foreach (GoodsModel::find(Arr::pluck($v['model'], 'gm_id')) as $gm) {  //  gm_id만 추출하여 모델 검색
                        $tmpModel = [   'type'              => 'model',
                                        'gd_id'             => $gd_id,
                                        'pa_name'           => $gd->purchaseAt ? $gd->purchaseAt->pa_name : NULL,
                                        'pa_type'           => $gd->purchaseAt ? $gd->purchaseAt->pa_type : NULL,
                                        'pa_dlvy_p'         => $gd->purchaseAt ? $gd->purchaseAt->pa_price : 0,
                                        'pa_dlvy_p_add_vat' => $gd->purchaseAt ? $gd->purchaseAt->pa_price_add_vat : 0,
                                        'gd_enable'         => $gd->gd_enable,
                                        'gm_enable'         => $gm->gm_enable,
                                        'gm_prime'          => $gm->gm_prime,
                                        'gm_id'             => $gm->gm_id,
                                        'ea'                => $v['model'][$gm->gm_id]['ea'],
                                        'img'               => $gd->image_src_thumb[0],
                                        'gd_name'           => $gd->gd_name,
                                        'gm_name'           => $gm->gm_name,
                                        'gm_catno'          => $gm->gm_catno,
                                        'gm_code'           => $gm->gm_code,
                                        'gm_spec'           => $gm->gm_spec,
                                        'gm_unit'           => $gm->gm_unit,
                                        'mk_name'           => $gd->maker->mk_name,
                                        'price'             => $gm->gm_price,
                                        'price_add_vat'     => $gm->gm_price_add_vat,
                                        'gain_mileage'      => $gm->gain_mileage];
                        
                        if ($type == 'order') { //  주문은 주문 시점 가격을 가져온다
                            $tmpModel['price']= $d_arrange[$gd_id]['model'][$gm->gm_id]['odm_price'];
                            $tmpModel['price_add_vat'] = rrp($d_arrange[$gd_id]['model'][$gm->gm_id]['odm_price']);
                            $tmpModel['dlvy_check_opt'] = 'N';  //  관리자 주문 상세페이지 일괄 배송정보 등록시 사용
                        } else {
                            if ($type == 'cart') {
                                $tmpModel['cm_id'] = $d_arrange[$gd_id]['model'][$gm->gm_id]['cm_id'];
                                $tmpModel['ct_check_opt'] = 'Y';
                            }
                            
                            if ($gm->bundleDc()->exists()) {
                                $tmpModel['price'] = $this->bundleCheck($gm->bundleDc, $tmpModel['ea'], $tmpModel['price']);
                                $tmpModel['price_add_vat'] = rrp($tmpModel['price']);
                            }
                        }
                        $rst['lists'][$gd->gd_pa_id??0][] = $tmpModel;
                    }
                }
                
                if(isset($v['option'])){
                    foreach (GoodsOptionChild::find(Arr::pluck($v['option'], 'goc_id')) as $goc) {   //  goc_id만 추출하여 옵션 검색
                        $go = GoodsOption::find($goc->goc_go_id);
                        $tmpOption = [
                            'type'          => 'option',
                            'gd_id'         => $gd_id,
                            'goc_id'        => $goc->goc_id,
                            'ea'            => $v['option'][$goc->goc_id]['ea'],
                            'go_name'       => $go->go_name,
                            'goc_name'      => $goc->goc_name,
                            'price'         => $goc->goc_price,
                            'price_add_vat' => $goc->goc_price_add_vat,
                            'gain_mileage'  => $goc->gain_mileage,
                        ];
                        
                        if ($type == 'cart') {
                            $tmpOption['co_id'] = $d_arrange[$gd_id]['option'][$goc->goc_id]['co_id'];
                            $tmpOption['ct_check_opt'] = 'Y';
                            $tmpOption['go_required'] = $go->go_required;
                        } else if ($type == 'order') {
                            $tmpOption['price'] = $d_arrange[$gd_id]['option'][$goc->goc_id]['odo_price'];
                            $tmpOption['price_add_vat'] = rrp($d_arrange[$gd_id]['option'][$goc->goc_id]['odo_price']);
                        }
                        $rst['lists'][$gd->gd_pa_id??0][] = $tmpOption;
                    }
                }
            }
        }

        $rst['price']['goods'] = $rst['price']['air'] = $rst['price']['dlvy'] = 0;
        foreach ($rst['lists'] as $pa_id => $pa_group) {
            $paSum = 0;
            foreach ($pa_group as $item) 
                $paSum += $item['price']*$item['ea'];
            $rst['price']['goods'] += $paSum;
            if ( $pa_group[0]['pa_type'] !== 'AIR' ) {
                $rst['lists'][$pa_id][0]['pa_dlvy_p'] = $paSum < $this->free_dlvy_max ? $this->dlvy_fee : 0;
                $rst['lists'][$pa_id][0]['pa_dlvy_p_add_vat'] = rrp($rst['lists'][$pa_id][0]['pa_dlvy_p']);
                //  $pa_group[0] 변수를 사용하면 값이 대입되지 않아서 저렇게 했다
            }
            if ( $pa_group[0]['pa_type'] == 'AIR' )
                $rst['price']['air'] += $rst['lists'][$pa_id][0]['pa_dlvy_p'];
            else
                $rst['price']['dlvy'] += $rst['lists'][$pa_id][0]['pa_dlvy_p'];
                //  정해진 주문금액 이상시 배송료 무료 정책은
                //  부가세 제외 금액을 기준으로 한다.
        }
        $rst['price']['surtax'] = surtax($rst['price']['goods']);
        $rst['price']['goods_add_vat']  = $rst['price']['goods'] + $rst['price']['surtax'];
        $rst['price']['dlvy_add_vat']   = rrp($rst['price']['dlvy']);
        $rst['price']['air_add_vat']   = rrp($rst['price']['air']);
        $rst['price']['total']  = $rst['price']['goods_add_vat'] + $rst['price']['dlvy_add_vat'] + $rst['price']['air_add_vat'];

        return $rst;
    }

    public function bundleCheck ($bd, $ea, $p) {
        foreach($bd as $b){
            if ($ea < $b->bd_ea)      { break; }
            else if ($ea == $b->bd_ea){ $p = $b->bd_price; break; }
            else if ($ea > $b->bd_ea) { $p = $b->bd_price; }
            /*
            bd_price_add_vat를 넣어주지 않고 bd_price를 넣어주는 이유는
            gm_price 부가세 포함이 이후에 이루어 져서
            여기서 포함가를 넣어주면 이중으로 된다.
            */
        }
        return $p;
    }
}