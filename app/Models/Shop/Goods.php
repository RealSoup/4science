<?php

namespace App\Models\Shop;

// use App\Events\GoodsDeleted;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\{User, FileGoods};
use DB;
use Storage;
use DateTimeInterface;
use Illuminate\Support\Arr;

class Goods extends Model {
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

    public function getGmPriceAddVatAttribute($v) { return ($v>0) ? intval($v) : '견적가'; }
    // public function getCreatedAtAttribute( $value ) { return (new Carbon($value))->format('Y-m-d H:i'); }


    public function goodsCategory() {       return $this->hasMany(GoodsCategory::class, "gc_gd_id"); }
    public function goodsCategoryFirst() {  return $this->hasOne(GoodsCategory::class, "gc_gd_id")->where('gc_prime', 'Y'); }
    public function goodsModel() {          return $this->hasMany(GoodsModel::class, "gm_gd_id"); }
    public function option() {              return $this->hasMany(Option::class, "op_gd_id")->orderBy('op_required'); }
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
    public function scopeEnable($q, $v)             { return $q->where('gd_enable', $v); }
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
                    else if ( array_key_exists('opc_id', $item) ) 
                        $d_arrange[$item['gd_id']]['option'][$item['opc_id']] = [ 'opc_id' => $item['opc_id'], 'ea' => $item['ea'] ];
                }
            break;

            case 'buy_estimate':    //  견적서에서 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
                foreach ($some['goods'] as $v) {
                    if (!array_key_exists($v['gd_id'], $collect))
                        $collect[$v['gd_id']] = collect(['model'=>collect(), 'option'=>collect()]);
                    if (array_key_exists('em_id', $v))
                        $collect[$v['gd_id']]['model']->put($v['em_id'], collect([ 'em_id' => $v['em_id'] ]));
                    if (array_key_exists('eo_id', $v))
                        $collect[$v['gd_id']]['option']->put($v['eo_id'], collect([ 'eo_id' => $v['eo_id'] ]));
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
                                    'opc_id'    => $odm->odm_gm_id,
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
                        $d_arrange[$ct->ct_gd_id]['option'][$co->co_opc_id] = [ 'opc_id' => $co->co_opc_id, 'ea' => $co->co_ea, 'co_id' => $co->co_id ];
                }
            break;
        }

        foreach ($d_arrange as $gd_id => $v) {
            if ( $type== 'buy_estimate') {
                $gd = self::find($gd_id);
                if (!$gd_id)
                    $gd = new self;
                $gd->purchaseAt;
                $gd->maker;
                $gd->goods_model = collect();
                $em = new EstimateModel();
                $index = 0;
                foreach ($v['model'] as $k => $vm) {
                    $em = $em->find($vm['em_id']);
                    if ($index === 0 && !$gd_id) {
                        $gd->gd_name = $em->em_name;
                        $gd->maker->mk_name = $em->em_maker;
                    }
                    $gd->goods_model->push([
                        'gm_name'          => $em->em_name,
                        'gm_catno'         => $em->em_catno,
                        'gm_code'          => $em->em_code,
                        'gm_spec'          => $em->em_spec,
                        'gm_unit'          => $em->em_uint,
                        'ea'               => $em->em_ea,
                        'gm_price_add_vat' => rrp($em->em_price),
                    ]);
                    $gd->goods_p += $em->em_price*$em->em_ea;

                    $index++;
                }

                if($v['option']->isNotEmpty()){
                    $gd->option_child = collect();
                    $eo = new EstimateOption();
                    foreach ($v['option'] as $k => $vo) {
                        $eo = $eo->find($k);
                        $gd->option_child->push([
                            'opc_name'          => $eo->eo_name,
                            'ea'                => $eo->eo_ea,
                            'opc_price_add_vat' => rrp($eo->eo_price),
                        ]);
                        $gd->option_p += $eo->eo_price*$eo->eo_ea;
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
                    // dd($gd->toArray());
                } else {
                    $gd['odg_id']               = $val['odg_id'];
                    $gd['odg_dlvy_com']         = $val['odg_dlvy_com'];
                    $gd['odg_dlvy_num']         = $val['odg_dlvy_num'];
                    $gd['odg_dlvy_created_at']  = $val['odg_dlvy_created_at'];
                    $gd['odg_arrival_date']     = $val['odg_arrival_date'];
                    $gd['odg_receive_date']     = $val['odg_receive_date'];
                    $gd['gd_name'] = '';
                    $gd['maker'] = array();
                    $gd['maker']['mk_name'] = '';
                    $gd['image_src_thumb'] = array();
                    $gd['image_src_thumb'][] = noimg(true);
                    $gd['goods_model'] = collect();
                    $gd['goods_p'] = 0;
                    foreach ($val['model'] as $gm) {
                        $gm->gm_name = $gm->odm_gm_name;
                        $gm->gm_code = $gm->odm_gm_code;
                        $gm->gm_catno = $gm->odm_gm_catno;
                        $gm->gm_unit = $gm->odm_gm_unit;
                        $gm->gm_spec = $gm->odm_gm_spec;
                        $gm->ea = $gm->odm_ea;
                        $gm->odm_price_add_vat = rrp($gm->odm_price);
                        $gd['goods_model'][] = $gm;
                        $gd['goods_p'] += $gm->odm_price*$gm->ea;
                    }
                }

                
                if(isset($v['option'])){
                    foreach (OptionChild::find(Arr::pluck($v['option'], 'opc_id')) as $opc) {   //  opc_id만 추출하여 옵션 검색
                        $op = Option::find($opc->opc_op_id);
                        $tmpOption = [
                            'type'          => 'option',
                            'gd_id'         => $gd_id,
                            'opc_id'        => $opc->opc_id,
                            'ea'            => $v['option'][$opc->opc_id]['ea'],
                            'op_name'       => $op->op_name,
                            'opc_name'      => $opc->opc_name,
                            'price'         => $opc->opc_price,
                            'price_add_vat' => $opc->opc_price_add_vat,
                            'gain_mileage'  => $opc->gain_mileage,
                        ];
                        
                        if ($type == 'cart') {
                            $tmpOption['co_id'] = $d_arrange[$gd_id]['option'][$opc->opc_id]['co_id'];
                            $tmpOption['ct_check_opt'] = 'Y';
                        } else if ($type == 'order') {
                            $tmpOption['price'] = $d_arrange[$gd_id]['option'][$opc->opc_id]['odo_price'];
                            $tmpOption['price_add_vat'] = rrp($d_arrange[$gd_id]['option'][$opc->opc_id]['odo_price']);
                        } else {
                            // $gd->option_p += $opc->opc_price*$opc->ea;
                        }

                        $rst['lists'][$gd->gd_pa_id??0][] = $tmpOption;
                    }
                }

            }            
            // $rst['lists'][$pa_id]['list'][] = $gd;
        }

// dd($rst);
// dd($params['lists']->toArray());
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


    public function getGoodsDataCollection___old($some, $type='buy_cart') {
        $params = collect([
                    'lists'=>collect(),
                    'price'=>collect([ 'goods'=>0, 'dlvy'=>0, 'air'=>0 ]) ]);
        $collect = Array();
        switch ($type) {
            case 'buy_inst':    //  바로 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
            case 'buy_cart':    //  장바구니에서 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
            case 'request_estimate':    //  장바구니에서 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
                dd($some);
                foreach ($some['goods'] as $gd) {
                    $collect[$gd['gd_id']] = collect(['model'=>collect(), 'option'=>collect()]);
                    foreach ($gd['model'] as $gm)
                        $collect[$gd['gd_id']]['model']->put($gm['gm_id'], collect([ 'gm_id' => $gm['gm_id'], 'ea' => $gm['ea'] ]));
                    foreach ($gd['option'] as $op)
                        $collect[$gd['gd_id']]['option']->put($op['opc_id'], collect([ 'opc_id' => $op['opc_id'], 'ea' => $op['ea'] ]));
                }
            break;

            // case 'buy_inst':    //  바로 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
            //     $collect[$some['goods']['gd_id']] = collect(['model'=>collect(), 'option'=>collect()]);
            //     foreach ($some['goods']['model'] as $val)
            //         $collect[$some['goods']['gd_id']]['model']->put($val['gm_id'], collect([ 'gm_id' => $val['gm_id'], 'ea' => $val['ea'] ]));
            //     foreach ($some['goods']['option'] as $val)
            //         $collect[$some['goods']['gd_id']]['option']->put($val['opc_id'], collect([ 'opc_id' => $val['opc_id'], 'ea' => $val['ea'] ]));
            // break;

            case 'buy_estimate':    //  견적서에서 구매 눌렀을때 구매페이지에서 쓰기위한 데이터 편집
                foreach ($some['goods'] as $v) {
                    if (!array_key_exists($v['gd_id'], $collect))
                        $collect[$v['gd_id']] = collect(['model'=>collect(), 'option'=>collect()]);
                    if (array_key_exists('em_id', $v))
                        $collect[$v['gd_id']]['model']->put($v['em_id'], collect([ 'em_id' => $v['em_id'] ]));
                    if (array_key_exists('eo_id', $v))
                        $collect[$v['gd_id']]['option']->put($v['eo_id'], collect([ 'eo_id' => $v['eo_id'] ]));
                }
            break;

            case 'order':   //  주문페이지에서 주문 상품을 보여주기 위한 데이터 편집
                $od = $some->orderGoods;
                foreach ($od as $odg) {
                    $collect[$odg->odg_gd_id] = $odg;
                    $collect[$odg->odg_gd_id]['model'] = collect();
                    $collect[$odg->odg_gd_id]['option'] = collect();
                    // dd($collect[$odg->odg_gd_id]->toArray());
                    foreach ($odg->orderModel as $odm) {
                        if ( $odm->odm_gm_id > 0 ) {
                            $collect[$odg->odg_gd_id]['model']->put($odm->odm_gm_id, collect([
                                'gm_id'  => $odm->odm_gm_id,
                                'ea'     => $odm->odm_ea,
                                'odm_id' => $odm->odm_id,
                                'odm_price' => $odm->odm_price ]));
                        } else {
                            $collect[$odg->odg_gd_id]['model'][] = $odm;
                        }
                    }
                    foreach ($odg->orderOption as $odo) {
                        $collect[$odg->odg_gd_id]['option']->put($odo->odo_opc_id, collect([
                            'opc_id'    => $odo->odo_opc_id,
                            'ea'    => $odo->odo_ea,
                            'odo_id' => $odo->odo_id,
                            'odo_price' => $odo->odo_price ]));
                    }
                }
            break;

            case 'cart':    //  장바구니 목록을 보여주기 위한 데이터 편집
                foreach ($some as $cart) {
                    $gd = $cart->goods;
                    $collect[$gd->gd_id] = collect(['ct_id'=>$cart->ct_id, 'model'=>collect(), 'option'=>collect()]);
                    foreach ($cart->cartModel as $cartModel) {
                        $collect[$gd->gd_id]['model']->put($cartModel->cm_gm_id, collect([
                            'gm_id'    => $cartModel->cm_gm_id,
                            'ea'    => $cartModel->cm_ea,
                            'cm_id' => $cartModel->cm_id ]));
                    }
                    foreach ($cart->cartOption as $cartOption) {
                        $collect[$gd->gd_id]['option']->put($cartOption->co_opc_id, collect([
                            'opc_id'    => $cartOption->co_opc_id,
                            'ea'    => $cartOption->co_ea,
                            'co_id' => $cartOption->co_id ]));
                    }
                }
            break;
        }

// dd($collect);
        foreach ($collect as $gd_id => $val) {
            if ( $type== 'buy_estimate') {
                $gd = self::find($gd_id);
                if (!$gd_id)
                    $gd = new self;
                $gd->purchaseAt;
                $gd->maker;
                $gd->goods_model = collect();
                $em = new EstimateModel();
                $index = 0;
                foreach ($val['model'] as $k => $v) {
                    $em = $em->find($v['em_id']);
                    if ($index === 0 && !$gd_id) {
                        $gd->gd_name = $em->em_name;
                        $gd->maker->mk_name = $em->em_maker;
                    }
                    $gd->goods_model->push([
                        'gm_name'          => $em->em_name,
                        'gm_catno'         => $em->em_catno,
                        'gm_code'          => $em->em_code,
                        'gm_spec'          => $em->em_spec,
                        'gm_unit'          => $em->em_uint,
                        'ea'               => $em->em_ea,
                        'gm_price_add_vat' => rrp($em->em_price),
                    ]);
                    $gd->goods_p += $em->em_price*$em->em_ea;

                    $index++;
                }

                if($val['option']->isNotEmpty()){
                    $gd->option_child = collect();
                    $eo = new EstimateOption();
                    foreach ($val['option'] as $k => $v) {
                        $eo = $eo->find($k);
                        $gd->option_child->push([
                            'opc_name'          => $eo->eo_name,
                            'ea'                => $eo->eo_ea,
                            'opc_price_add_vat' => rrp($eo->eo_price),
                        ]);
                        $gd->option_p += $eo->eo_price*$eo->eo_ea;
                    }
                }
            } else {
                $gd = self::find($gd_id);
                if ( $gd_id > 0 ) {
                    if ($type == 'cart') $gd->ct_id = $collect[$gd_id]['ct_id'];
                    $gd->purchaseAt;
                    $gd->maker;
                    $gd->goods_model = GoodsModel::find($val['model']->pluck('gm_id'));
                    foreach ($gd->goods_model as $gm) {
                        $gm->ea = $collect[$gd_id]['model'][$gm->gm_id]['ea'];
                        if ($type == 'cart') $gm->cm_id = $collect[$gd_id]['model'][$gm->gm_id]['cm_id'];
                        if ($type == 'order') {
                            $gm->odm_id = $collect[$gd_id]['model'][$gm->gm_id]['odm_id'];
                            //  주문은 주문 시점 가격을 가져온다
                            $gm->odm_price = $collect[$gd_id]['model'][$gm->gm_id]['odm_price'];
                            $gm->odm_price_add_vat = rrp($collect[$gd_id]['model'][$gm->gm_id]['odm_price']);
                            $gd->goods_p += $gm->odm_price*$gm->ea;
                        } else {
                            if ($gm->bundleDc()->exists()) { // 묶음할인이 있다면 적용
                                foreach($gm->bundleDc as $dc){
                                    if ($gm->ea < $dc->bd_ea)      { break; }
                                    else if ($gm->ea == $dc->bd_ea){ $gm->gm_price = $dc->bd_price; break; }
                                    else if ($gm->ea > $dc->bd_ea) { $gm->gm_price = $dc->bd_price; }
                                    /*
                                    bd_price_add_vat를 넣어주지 않고 bd_price를 넣어주는 이유는
                                    gm_price 부가세 포함이 이후에 이루어 져서
                                    여기서 포함가를 넣어주면 이중으로 된다.
                                    */
                                }
                            }
                            $gd->goods_p += $gm->gm_price*$gm->ea;
                        }
                    }
                } else {
                    $gd['odg_id']               = $val['odg_id'];
                    $gd['odg_dlvy_com']         = $val['odg_dlvy_com'];
                    $gd['odg_dlvy_num']         = $val['odg_dlvy_num'];
                    $gd['odg_dlvy_created_at']  = $val['odg_dlvy_created_at'];
                    $gd['odg_arrival_date']     = $val['odg_arrival_date'];
                    $gd['odg_receive_date']     = $val['odg_receive_date'];
                    $gd['gd_name'] = '';
                    $gd['maker'] = array();
                    $gd['maker']['mk_name'] = '';
                    $gd['image_src_thumb'] = array();
                    $gd['image_src_thumb'][] = noimg(true);
                    $gd['goods_model'] = collect();
                    $gd['goods_p'] = 0;
                    foreach ($val['model'] as $gm) {
                        $gm->gm_name = $gm->odm_gm_name;
                        $gm->gm_code = $gm->odm_gm_code;
                        $gm->gm_catno = $gm->odm_gm_catno;
                        $gm->gm_unit = $gm->odm_gm_unit;
                        $gm->gm_spec = $gm->odm_gm_spec;
                        $gm->ea = $gm->odm_ea;
                        $gm->odm_price_add_vat = rrp($gm->odm_price);
                        $gd['goods_model'][] = $gm;
                        $gd['goods_p'] += $gm->odm_price*$gm->ea;
                    }
                }

                
                if($val['option']->isNotEmpty()){
                    $gd->option_child = OptionChild::find($val['option']->pluck('opc_id'));
                    foreach ($gd->option_child as $opc) {
                        $opc->option;
                        $opc->ea = $collect[$gd_id]['option'][$opc->opc_id]['ea'];
                        if ($type == 'cart') $opc->co_id = $collect[$gd_id]['option'][$opc->opc_id]['co_id'];
                        if ($type == 'order') {
                            $opc->odo_price = $collect[$gd_id]['option'][$opc->opc_id]['odo_price'];
                            $opc->odo_price_add_vat = rrp($collect[$gd_id]['option'][$opc->opc_id]['odo_price']);
                            $gd->option_p += $opc->odo_price*$opc->ea;
                        } else {
                            $gd->option_p += $opc->opc_price*$opc->ea;
                        }

                    }
                }

            }

            $pa_id = 0;
            if ($gd_id > 0 && $gd->purchaseAt) { $pa_id = $gd->gd_pa_id; }  //  직배송 키 추출
            if (!$params['lists']->has($pa_id)) {
                $params['lists']->put($pa_id, collect([ //  직배송 키로 컬랙션 생성
                    'price'=>collect([ 'goods'=>0, 'goods_add_vat'=>0, 'dlvy'=>0, 'dlvy_add_vat'=>0, 'air'=>0, 'air_add_vat'=>0 ]),
                    'list'=>collect(),
                ]));
            }
            $params['lists'][$pa_id]['list'][] = $gd;
        }

// dd($params);
// dd($params['lists']->toArray());
        foreach ($params['lists'] as $pa_id => $gd) {
            $gd['price']['goods'] = $gd['list']->sum('goods_p') + $gd['list']->sum('option_p');
            $gd['price']['goods_add_vat'] = rrp($gd['price']['goods']);
            $params['price']['goods'] += $gd['price']['goods'];
            if ($pa_id && $gd['list']->first()->purchaseAt->pa_type == "AIR") {
                $gd['price']['air'] = $gd['list']->first()->purchaseAt->pa_price;
                $gd['price']['air_add_vat'] = rrp($gd['price']['air']);
                $params['price']['air'] += $gd['price']['air'];
            } else {
                //  10만원 이상시 배송료 무료 정책은
                //  부가세 제외 금액을 기준으로 한다.
                $gd['price']['dlvy'] = $gd['price']['goods'] < $this->free_dlvy_max ? $this->dlvy_fee : 0;
                $gd['price']['dlvy_add_vat'] = rrp($gd['price']['dlvy']);
                $params['price']['dlvy'] += $gd['price']['dlvy'];
            }
        }

        $params['price']['surtax'] = surtax($params['price']['goods']);
        $params['price']['goods_add_vat']  = $params['price']['goods'] + $params['price']['surtax'];
        $params['price']['dlvy_add_vat']   = rrp($params['price']['dlvy']);
        $params['price']['air_add_vat']   = rrp($params['price']['air']);
        $params['price']['total']  = $params['price']['goods_add_vat'] + $params['price']['dlvy_add_vat'] + $params['price']['air_add_vat'];

        return $params;
    }
}
