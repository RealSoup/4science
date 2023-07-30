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


    public function goodsCategory() {       return $this->hasMany(GoodsCategory::class, "gc_gd_id")->orderBy('gc_prime'); }
    public function goodsCategoryFirst() {  return $this->hasOne(GoodsCategory::class, "gc_gd_id")->Prime(); }
    public function goodsModel() {          return $this->hasMany(GoodsModel::class, "gm_gd_id")->orderBy('gm_catno03'); }
    public function goodsModelPrime() {     return $this->hasOne(GoodsModel::class, "gm_gd_id")->Prime(); }
    public function goodsOption() {         return $this->hasMany(GoodsOption::class, "go_gd_id")->orderBy('go_required'); }
    public function goodsRelate() {         return $this->hasMany(GoodsRelate::class, 'gr_gd_id')->orderBy('gr_seq'); }
    public function fileGoods() {           return $this->hasMany(FileGoods::class, 'fi_key')->orderBy('fi_seq'); }
    public function fileGoodsAdd() {        return $this->hasMany(FileGoods::class, 'fi_key')->Kind('add')->orderBy('fi_seq'); }
    public function fileGoodsGoods() {      return $this->hasMany(FileGoods::class, 'fi_key')->Kind('goods')->orderBy('fi_seq'); }
    // public function user() {                return $this->belongsTo(User::class, 'created_id'); }
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
        $noimg_p = null;
        if ($this->goodsCategoryFirst) {
            if ($this->goodsCategoryFirst->gc_ca01 == 28 && $this->goodsCategoryFirst->gc_ca02 == 3614 ) {
                $rst = NULL;
                $noimg_p = 'trc.png';
            } else if ($this->goodsCategoryFirst->gc_ca01 == 40 ) {
                $noimg_p = 'noimg_merck.png';
            }
        }
        
            
        if (!$rst){ $rst[] = noimg($noimg_p); }
        return $rst;
    }

    public static function gdMaker($gd_id) {
        return Maker::find(self::select('gd_mk_id')->find($gd_id)->gd_mk_id)->mk_name;
    }



    //  요청한 상품 정보를 직배송 형태로 변환, 리턴
    public function getGoodsDataCollection($some, $type='buy_cart', $mode=null) {
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
                    if($ct->ct_type == 'MODEL')
                        $d_arrange[$ct->ct_gd_id]['model'][$ct->ct_key] = [ 'gm_id' => $ct->ct_key, 'ea' => $ct->ct_ea, 'ct_id' => $ct->ct_id ];
                    else
                        $d_arrange[$ct->ct_gd_id]['option'][$ct->ct_key] = [ 'goc_id' => $ct->ct_key, 'ea' => $ct->ct_ea, 'ct_id' => $ct->ct_id ];
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
                                        'em_id'             => $em->em_id,
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
                                        'dlvy_at'           => $em->em_dlvy_at,
                                        'dlvy_all_in'       => false,
                                        'em_check_opt'      => true,];
                        $rst['lists'][$gd->gd_pa_id??0][] = $tmpModel;
                    }

                    if(isset($v['option'])){
                        foreach (EstimateOption::find(Arr::pluck($v['option'], 'eo_id')) as $eo) {
                            $go = GoodsOptionChild::find($eo->eo_goc_id);
                            $tmpOption = [  'type'          => 'option',
                                            'gd_id'         => $gd_id,
                                            'go_id'         => $go->goc_go_id,
                                            'goc_id'        => $eo->eo_goc_id,
                                            'eo_id'         => $eo->eo_id,
                                            'ea'            => $eo->eo_ea,
                                            'go_name'       => $eo->eo_tit,
                                            'goc_name'      => $eo->eo_name,
                                            'price'         => $eo->eo_price,
                                            'price_add_vat' => rrp($eo->eo_price), ];
                            $rst['lists'][$gd->gd_pa_id??0][] = $tmpOption;
                        }
                    }
                }
            } else {
                if ( $gd_id > 0 ) {
                    $gd = self::with('purchaseAt')->with('maker')->find($gd_id);
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
                                        'price_add_vat'     => $gm->gm_price_add_vat,];
                        // dd($mode);
                        if ($type == 'order') { //  주문은 주문 시점 가격을 가져온다
                            $tmpModel['price']= $d_arrange[$gd_id]['model'][$gm->gm_id]['odm_price'];
                            $tmpModel['price_add_vat'] = rrp($d_arrange[$gd_id]['model'][$gm->gm_id]['odm_price']);
                            $tmpModel['dlvy_check_opt'] = 'N';  //  관리자 주문 상세페이지 일괄 배송정보 등록시 사용
                        } else if (in_array($type, ['buy_inst', 'buy_cart'])) {
                            $tmpModel['price_deal']= $gm->gm_price * (auth()->check() ? auth()->user()->dc_mul : 1);
                            $tmpModel['price_deal_add_vat']= rrp($tmpModel['price_deal']);
                        } else if ($type == 'cart') {
                            $tmpModel['ct_id'] = $v['model'][$gm->gm_id]['ct_id'];
                            $tmpModel['ct_check_opt'] = 'Y';
                        } 
                        
                        if ($gm->bundleDc()->exists()) {
                            $tmpModel['price'] = $this->bundleCheck($gm->bundleDc, $tmpModel['ea'], $tmpModel['price']);
                            $tmpModel['price_add_vat'] = rrp($tmpModel['price']);
                        }

                        if ($mode == 'buy_chk' && auth()->check() && auth()->user()->is_dealer && $some->od_pay_method=='B') {
                            foreach ($some['lists'] as $d1) {
                                foreach ($d1 as $d2) {
                                    if($d2['gm_id']==$gm->gm_id) {
                                        $tmpModel['price'] = $d2['price_deal'];
                                        $tmpModel['price_add_vat'] = $d2['price_deal_add_vat'];
                                    }
                                }
                            }
                        }
                        $rst['lists'][$gd->gd_pa_id??0][] = $tmpModel;
                    }
                    if(isset($v['option'])){
                        foreach (GoodsOptionChild::find(Arr::pluck($v['option'], 'goc_id')) as $goc) {   //  goc_id만 추출하여 옵션 검색
                            $go = GoodsOption::find($goc->goc_go_id);
                            $tmpOption = [
                                'type'          => 'option',
                                'gd_id'         => $gd_id,
                                'go_id'         => $goc->goc_go_id,
                                'goc_id'        => $goc->goc_id,
                                'ea'            => $v['option'][$goc->goc_id]['ea'],
                                'go_name'       => $go->go_name,
                                'goc_name'      => $goc->goc_name,
                                'price'         => $goc->goc_price,
                                'price_add_vat' => $goc->goc_price_add_vat,
                            ];
                            
                            if ($type == 'cart') {
                                $tmpOption['ct_id'] = $v['option'][$goc->goc_id]['ct_id'];
                                $tmpOption['ct_check_opt'] = 'Y';
                                $tmpOption['go_required'] = $go->go_required;
                            } else if ($type == 'order') {
                                $tmpOption['price'] = $d_arrange[$gd_id]['option'][$goc->goc_id]['odo_price'];
                                $tmpOption['price_add_vat'] = rrp($d_arrange[$gd_id]['option'][$goc->goc_id]['odo_price']);
                            }
                            $rst['lists'][$gd->gd_pa_id??0][] = $tmpOption;
                        }
                    }
                } else {    //  상품번호가 없으면 ( 견적때 만들어낸 상품이라면 )
                    foreach ($v['model'] as $v2) {
                        $tmpModel = [   'type'              => 'model',
                                        'gd_id'             => 0,
                                        'pa_name'           => NULL,
                                        'pa_type'           => NULL,
                                        'pa_dlvy_p'         => 0,
                                        'pa_dlvy_p_add_vat' => 0,
                                        'gm_id'             => 0,
                                        'ea'                => $v2->odm_ea,
                                        'gd_name'           => $v2->odm_gd_name,
                                        'gm_name'           => $v2->odm_gm_name,
                                        'gm_catno'          => $v2->odm_gm_catno,
                                        'gm_code'           => $v2->odm_gm_code,
                                        'gm_spec'           => $v2->odm_gm_spec,
                                        'gm_unit'           => $v2->odm_gm_unit,
                                        'mk_name'           => $v2->odm_mk_name,
                                        'price'             => $v2->odm_price,
                                        'price_add_vat'     => rrp($v2->odm_price),];
                        if ($type == 'order') {
                            $tmpModel['dlvy_check_opt'] = 'N';  //  관리자 주문 상세페이지 일괄 배송정보 등록시 사용
                        }
                        $rst['lists'][0][] = $tmpModel;
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
                $rst['lists'][$pa_id][0]['pa_dlvy_p'] = rrp($paSum) < $this->free_dlvy_max ? $this->dlvy_fee : 0;
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

    public function search($req, $r_type=null) {
        if ($req->filled('keyword')) {    
            $kw = trim($req->keyword);
            $is_catno = preg_match("/\d{2}-([\d-]{5,10})/", $kw);   //  cat no 체크
            if ($req->filled('keyword_extra')) {
                $ft_kw = "+{$kw}* +{$req->keyword_extra}*";
            }
/*
            +	AND, 반드시 포함하는 단어
            –	NOT, 반드시 제외하는 단어
            >	포함하며, 검색 순위를 높일 단어
                +mysql >tutorial
                : mysql과 tutorial가 포함하는 행을 찾을 때, tutorial이 포함되면 검색 랭킹이 높아짐
            <	포함하되,검색 순위를 낮출 단어
                +mysql <training
                : mysql과 training가 포함하는 행을 찾지만, training이 포함되면 검색 랭킹이 낮아짐
            ()	하위 표현식으로 그룹화 (포함, 제외, 순위 지정 등)
                +mysql +(>tutorial <training)
                : mysql AND tutorial, mysql AND training 이지만, tutorial의 우선순위가 더욱 높게 지정
            ~	Negate. 
                '-' 연산자와 비슷하지만 제외 시키지는 않고 검색 조건을 낮춤
            *	Wildcard. 와일드카드
                my*
                : mysql, mybatis 등 my 뒤의 와일드 카드로 붙음
            “”	구문 정의
*/


            // if (preg_match("/[-+*.]/", $kw)) 	$ftWord = "\"{$req->keyword}*\"";
            // if (preg_match("/[-+<>~*]/", $kw)) 	$ft_kw = "\"{$kw}*\"";
            // else 								$ft_kw = $kw.'*';
            $ft_kw = $kw;
            if (preg_match("/[-+<>~*]/", $kw)) 	$ft_kw = $ft_kw.'*';
            
            if ( $req->filled('mode') ) {
                if($req->mode == 'cat_no' && !$is_catno) // 캣넘버 검색인테 캣넘버 형식이 아니라면
                    return 'no-catno';
                
                $gd_name = $req->mode == 'gd_name' ? true : NULL;
                $maker   = $req->mode == 'maker'   ? true : NULL;
                $gm_name = $req->mode == 'gm_name' ? true : NULL;
                $cat_no  = $req->mode == 'cat_no'  ? true : NULL;
                $gm_code = $req->mode == 'gm_code' ? true : NULL;
            } else {
                $gd_name = $maker = $gm_name = $cat_no = $gm_code = true;
            }

            if($gd_name) $gd_name = DB::table('shop_goods')->select('gd_id')->whereFullText('gd_name', $ft_kw, ['mode' => 'boolean']);
            if($maker)   $maker   = DB::table('shop_goods')->select('gd_id')->join('shop_makers AS mk', 'shop_goods.gd_mk_id', '=', 'mk.mk_id')->where('mk_name', 'like', "{$kw}%");
            if($gm_name) $gm_name = DB::table('shop_goods_model')->select('gm_gd_id')->whereFullText('gm_name', $ft_kw, ['mode' => 'boolean']);
            if($cat_no && $is_catno) {
                         $catno_arr = explode('-', $kw); 
                         $cat_no  = DB::table('shop_goods_model')->select('gm_gd_id')->where('gm_catno01', $catno_arr[0])->where('gm_catno02', $catno_arr[1]);
            }
            if($gm_code) $gm_code = DB::table('shop_goods_model')->select('gm_gd_id')->whereFullText('gm_code', $ft_kw, ['mode' => 'boolean']);

            if(!$req->filled('mode')) {
                $ft_kw = str_replace('-', 'ΩΩ', $ft_kw);
                $ft_kw = str_replace('.', 'ΣΣ', $ft_kw);
                $keyword = DB::table('shop_goods')->select('gd_id')->whereFullText('gd_keyword_chg', $ft_kw, ['mode' => 'boolean']);
                $sub = $gd_name->union($maker)->union($gm_name)->union($gm_code)->union($keyword);
                if($is_catno) $sub = $sub->union($cat_no);
            } else {
                if($gd_name)  $sub = $gd_name;
                if($maker)    $sub = $maker;
                if($gm_name)  $sub = $gm_name;
                if($cat_no)   $sub = $cat_no;
                if($gm_code)  $sub = $gm_code;
            }
        }

        if( $r_type == 'group' ) 
            return $sub;   

        $qry = Goods::Enable();
        if($req->filled('keyword')) {
            $qry->joinSub($sub, 'sub', function ($q) { $q->on('sub.gd_id', '=', 'shop_goods.gd_id'); });
                // ->addSelect(DB::raw('STRAIGHT_JOIN la_shop_goods.*'));
        }

        $qry->when($req->ca01, function ($q, $v) { return $q->join('shop_goods_category AS gc', 'shop_goods.gd_id', '=', 'gc.gc_gd_id')->where('gc_ca01', $v); })
            ->when($req->ca02,  fn ($q, $v) => $q->where('gc_ca02',  $v))
            ->when($req->ca03,  fn ($q, $v) => $q->where('gc_ca03',  $v))
            ->when($req->ca04,  fn ($q, $v) => $q->where('gc_ca04',  $v))
            ->when($req->mk_id, fn ($q, $v) => $q->where('gd_mk_id', $v))
            ->when(!$req->filled('keyword'), fn ($q) => $q->groupBy('gd_id'));
            
        return $qry;
    }
}