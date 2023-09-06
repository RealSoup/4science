<?php
namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{FileInfo, FileGoods, User};
use App\Models\Shop\{Category, Goods, GoodsModel, GoodsCategory, GoodsSearch, BundleDc, Maker, GoodsOption, GoodsOptionChild, PurchaseAt};
use App\Traits\FileControl;
use App\Http\Requests\SaveGoodsRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Storage;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Lib\SphinxClient;

class GoodsController extends Controller {
    use FileControl;

    protected $goods;
    protected $goods_model;
    protected $goods_option;
    protected $goods_option_child;
	protected $maker;
    protected $bd;

	public function __construct( Goods $gd, GoodsModel $gm, GoodsOption $option, GoodsOptionChild $optionChild, Maker $mk, BundleDc $bd ) {
        $this->goods = $gd;
        $this->goods_model = $gm;
        $this->goods_option = $option;
        $this->goods_option_child = $optionChild;
        $this->maker = $mk;
        $this->bd = $bd;
    }

    public function index (Request $req) {       
        /*
            스핑크스(Sphinx) 검색 엔진은 기본적으로 limit 20이 설정되어있고 뺄수 없다
            페이지를 위해 검색된 count 재설정
        */
        $req->merge(array('sort' => "new"));

        $total = $this->goods->search_cnt($req);
        $page = intval($req->filled('page') ? $req->page : 1);
        $limit = 15;
        $offset = ($page*$limit)-$limit;
        if($offset>intval($total)) {
            $page = ceil($total / $limit);
            $offset = ($page*$limit)-$limit;
        }
        $qry = $this->goods->search($req, $offset, $limit);
     
        if( gettype($qry) == 'string' && $qry == 'no-catno' )
            return response()->json($qry);
        
        $data_rst = $qry->get();
        $data['list'] = new LengthAwarePaginator($data_rst, $total, $limit, $page, ['path' => $req->url(), 'query' => $req->query()]);
        if($req->filled('is_first') && $req->is_first) {
            $data['mng_off'] = json_decode(Redis::get('UserMngOff'));
            $data['makers'] = $this->maker->orderBy('mk_name')->get();
        }
		return response()->json($data);
    }


    public function index__(Category $cate, Request $req) {
        $gd_chk = ($req->startDate||$req->endDate||$req->gd_mk_id||$req->deleted_at);
        $model_chk = $req->filled('keyword')&&($req->mode=='gm_name'||$req->mode=='gm_code'||$req->mode=='cat_no');
        $gs = GoodsSearch::FROM( 'shop_goods_search AS gs' )->with('goods')
            ->SELECT("gs.gd_name", "gs.mk_name", "gc_ca01_name", "gc_ca02_name", "gc_ca03_name", "gc_ca04_name", 
                     "gs.gd_id", "gs.gd_enable", "gs.updated_id", "gs.updated_at", "gs.gd_seq" )
            //  shop_goods 필드 검색이 없다면 속도하되니 조인하지말자
            ->when($gd_chk,          fn ($q    ) => $q->leftJoin('shop_goods AS gd', 'gd.gd_id', '=', 'gs.gd_id'))
            ->when($req->startDate,  fn ($q, $v) => $q->whereDate('gd.created_at', '>=', $v))
            ->when($req->endDate,    fn ($q, $v) => $q->whereDate('gd.created_at', '<=', $v))
            ->when($req->gd_enable,  fn ($q, $v) => $q->where('gs.gd_enable', $v))
            ->when($req->gd_mk_id,   fn ($q, $v) => $q->where('gd.gd_mk_id', $v))
            ->when(!$req->gd_type,   fn ($q, $v) => $q->where('gs.gd_type', 'NON'))
            ->when($req->gd_type,    fn ($q, $v) => $q->where('gs.gd_type', $v))
            ->when($req->deleted_at, function ($q, $v) { 
                if ($v == 'Y') return $q->whereNotNull('gd.deleted_at'); 
                elseif ($v == 'N') return $q->whereNull('gd.deleted_at'); 
            })
            ->when($req->gd_seq, fn ($q, $v) => $q->where('gs.gd_seq', '<', 999999)->orderBy('gs.gd_seq'))
            ->when(!$req->ca01, fn ($q, $v) => $q->where('gs.gc_prime', 'Y'))
            ->when($req->ca01, fn ($q, $v) => $q->where('gs.gc_ca01', $v))
            ->when($req->ca02, fn ($q, $v) => $q->where('gs.gc_ca02', $v))
            ->when($req->ca03, fn ($q, $v) => $q->where('gs.gc_ca03', $v))
            ->when($req->ca04, fn ($q, $v) => $q->where('gs.gc_ca04', $v))
            ->latest('gs.gd_id');

        if ($req->filled('keyword')){
            if (preg_match("/[-+*.]/", $req->keyword)) 	$ftWord = '"'.$req->keyword.'"';
			else 									    $ftWord = $req->keyword.'*';
          
            if ( $req->mode == 'gd_name' ) $gs->whereFullText('gs.gd_name', $ftWord, ['mode' => 'boolean']);
            if ( $req->mode == 'gm_name' ) $gs->whereFullText('gs.gm_name', $ftWord, ['mode' => 'boolean']);
            if ( $req->mode == 'gm_code' ) $gs->whereFullText('gs.gm_code', $ftWord, ['mode' => 'boolean']);
            if ( $req->mode == 'cat_no' )  $gs->whereFullText('gs.gm_catno', $ftWord, ['mode' => 'boolean']);
            if ( $req->mode == 'manager' ) {
                $uid = User::Name($req->keyword)->Admin()->first();
                $gs->where("gs.updated_id", $uid->id);
            }
        }
        
        //  상품의 하위 모델 상세 검색이 아니면 속도하되니 groupBy하지말자
        //  (gc_prime, Y)(gm_prime, Y)  이것으로 같은 효과
        $gs->when($model_chk, fn ($q) => $q->groupBy('gs.gd_id'))
            ->when(!$model_chk, fn ($q) => $q->where('gs.gm_prime', 'Y'));
        $data['list'] = $gs->paginate($req->filled('limit') ? $req->limit : 10);
        $data['list']->appends($req->all())->links();

        $data['mng_off'] = json_decode(Redis::get('UserMngOff'));
        
		return response()->json($data);
    }

    public function show($id) {
        $data = $this->goods;
        if ($id) {
            $data = $data->find($id);
        }
        return response()->json($data);
    }

    public function create() {
        $data['makers'] = $this->maker::Select('mk_id', 'mk_name')->orderBy('mk_name')->get(); //  상품등록시 제조사 연결
        $data['purchaseAt'] = PurchaseAt::orderBy('pa_name')->get(); //  매입처 직배송
        // $params['categorys'] = $this->category->getSltCate($this->ca_id);
        // $params['purchaseAt'] = PurchaseAt::enable()->orderBy('pa_name')->get(); //  매입처 직배송
        // $params['goods'] = new class{};
        // $params['goods']->goodsModel = collect([new class{}]);
        // $params['goods']->goodsModel[0]->bundleDc = collect([new class{}]);
        // $params['goods']->option = collect([new class{}]);
        // $params['goods']->option[0]->optionChild = collect([new class{}]);
        // $params['act_nm'] = 'create';
        // $params['upload_path'] = 'storage/goods/';
        return response()->json($data);
    }

    public function edit($gd_id) {
        $data['goods'] = $this->goods->select("shop_goods.*",
							DB::raw("(SELECT mk_name FROM la_shop_makers WHERE la_shop_goods.gd_mk_id = mk_id) as gd_mk_name"),)
                        ->with('goodsModel')->with('goodsOption')->with('goodsCategory')->find($gd_id);
        foreach($data['goods']->goodsModel as $md) $md->bundleDc;
        foreach($data['goods']->goodsOption as $go) $go->goodsOptionChild;
        $data['goods']->fileGoodsGoods;
        $data['goods']->fileGoodsAdd;
        $data['purchaseAt'] = PurchaseAt::orderBy('pa_name')->get(); //  매입처 직배송
        return response()->json($data);
    }

    public function store(SaveGoodsRequest $req) {
	   	$goods = $this->goods_paramImplant($this->goods, $req);
		$goods->created_id = $goods->updated_id = auth()->user()->id;
	   	$rst = $goods->save();
        $cate_ist_info = [];
        $cat01 = $cat02 = '';

        if ($req->filled('gd_type') && $req->gd_type == 'REN') {
            $istArr['gc_gd_id'] = $goods->gd_id;
            $istArr['gc_prime'] = 'Y';
            $istArr['gc_ca01'] = 46;
            $istArr['gc_ca01_name'] = '렌탈';
            $ist_gc_id = GoodsCategory::insertGetId($istArr, 'gc_id');
            $istArr['gc_id'] = $ist_gc_id;
            $cate_ist_info[] = $istArr;      
            
            $fi_room = intval($goods->gd_id/1000)+1;
            foreach ($req->file_goods_goods as $k => $v) {
                // $s=Storage::disk('public')->copy('goods/trc.png', 'event/trc.png');
                $new_nm = uniqid().'.'.$v['fi_ext'];
                DB::table('file_goods')->insert([
                    'fi_key' => $goods->gd_id, 
                    'fi_room' => $fi_room,
                    'fi_kind' => 'goods',
                    'fi_original' => $v['fi_original'],
                    'fi_new' => $new_nm,
                    'fi_seq' => $k,
                    'fi_size' => $v['fi_size'],
                    'fi_ext' => $v['fi_ext'],
                    'created_id' => auth()->user()->id,
                    'ip' => $req->ip(),
                ]);
                if (!(strpos($v['fi_new'], "https://") === 0 || strpos($v['fi_new'], "http://") === 0)) {
                    Storage::disk('public')->copy("api_{$v['fi_group']}/{$v['fi_room']}/{$v['fi_kind']}/{$v['fi_new']}", "api_{$v['fi_group']}/{$fi_room}/{$v['fi_kind']}/{$new_nm}");
                    Storage::disk('public')->copy("api_{$v['fi_group']}/{$v['fi_room']}/{$v['fi_kind']}/thumb/{$v['fi_new']}", "api_{$v['fi_group']}/{$fi_room}/{$v['fi_kind']}/thumb/{$new_nm}");
                }
            }

            foreach ($req->file_goods_add as $k => $v) {
                $new_nm = uniqid().'.'.$v['fi_ext'];
                DB::table('file_goods')->insert([
                    'fi_key' => $goods->gd_id, 
                    'fi_room' => $fi_room,
                    'fi_kind' => 'add',
                    'fi_original' => $v['fi_original'],
                    'fi_new' => $new_nm,
                    'fi_seq' => $k,
                    'fi_size' => $v['fi_size'],
                    'fi_ext' => $v['fi_ext'],
                    'created_id' => auth()->user()->id,
                    'ip' => $req->ip(),
                ]);
                Storage::disk('public')->copy("api_{$v['fi_group']}/{$v['fi_room']}/{$v['fi_kind']}/{$v['fi_new']}", "api_{$v['fi_group']}/{$fi_room}/{$v['fi_kind']}/{$new_nm}");
            }
            $cat01 = 'R';
            $cat02 = $req->goods_model[0]['gm_catno02'];
            
        } else {
            
            foreach ($req->goods_category as $gc) {
                $istArr=[];
                $istArr['gc_gd_id'] = $goods->gd_id;
                $istArr['gc_prime'] = $gc['gc_prime'];
                $istArr['gc_ca01'] = $gc['gc_ca01'];
                $istArr['gc_ca01_name'] = $gc['gc_ca01_name'];
                if(count($gc) > 3) { $istArr['gc_ca02'] = $gc['gc_ca02']; $istArr['gc_ca02_name'] = $gc['gc_ca02_name']; }
                if(count($gc) > 5) { $istArr['gc_ca03'] = $gc['gc_ca03']; $istArr['gc_ca03_name'] = $gc['gc_ca03_name']; }
                if(count($gc) > 7) { $istArr['gc_ca04'] = $gc['gc_ca04']; $istArr['gc_ca04_name'] = $gc['gc_ca04_name']; }
                $ist_gc_id = GoodsCategory::insertGetId($istArr, 'gc_id');
                $istArr['gc_id'] = $ist_gc_id;
                $cate_ist_info[] = $istArr;
                unset($istArr);
            }

        }

        $cat[0] = $req->goods_category[0]['gc_ca01'];
        $cat[1] = $cat02 ? $cat02 : $this->goods_model->Catno01($cat[0])->max(DB::raw('CAST(gm_catno02 AS UNSIGNED)'))+1;
        $cat[1] = substr("00000".$cat[1], -6);
        $cat[2] = 0;

        foreach ($req->goods_model as $gm) {
            $cat[2] += 1;
            $gm_impl = $this->goodsModel_paramImplant($goods->gd_id, $gm);
            $gm_impl = Arr::collapse([$gm_impl, ['created_id'=>auth()->user()->id, 'gm_catno01'=>$cat01.$cat[0], 'gm_catno02'=>$cat[1], 'gm_catno03'=>substr("0".$cat[2], -2)]]);
            $ist_gm_id = GoodsModel::insertGetId($gm_impl, 'gm_id');

            if (!($req->filled('gd_type') && $req->gd_type == 'REN')) {
                foreach ($gm['bundle_dc'] as $bd) {
                    if (isset($bd['bd_ea'])){
                        $bd_impl = $this->bundleDc_paramImplant($ist_gm_id, $bd);
                        $this->bd->insert(Arr::collapse([$bd_impl, ['created_id'=>auth()->user()->id, 'ip' => $req->ip()]]));
                    }
                }
            }

            //  검색 테이블 insert
            foreach ($cate_ist_info as $v) {                
                $goods->gd_mk_name = $req->gd_mk_name;
                $gm_impl['gm_id'] = $ist_gm_id;
                DB::table('shop_goods_search')->insert($this->search_paramImplant($goods, $v, $gm_impl));
            }
            //  검색 테이블 insert
        }

        if (!($req->filled('gd_type') && $req->gd_type == 'REN')) {
            foreach ($req->goods_option as $go) {
                if (isset($go['go_name'])){
                    $go_id = $this->goods_option->insertGetId($this->option_paramImplant($goods->gd_id, $go), 'go_id');
                    foreach ($go['goods_option_child'] as $goc) {
                        if (isset($goc['goc_name'])) $this->goods_option_child->insert($this->optionChild_paramImplant($go_id, $goc));
                    }
                }
            }
        }

        if ($rst)
            return response()->json($goods->gd_id, 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
    }

    public function update(SaveGoodsRequest $req, $gd_id) {
        $goods = $this->goods->find($gd_id);
	   	$goods = $this->goods_paramImplant($goods, $req);
		$goods->updated_id = auth()->user()->id;
	   	$gd_rst = $goods->save();

        //  카테고리 추가
        $cate_ist_info = [];
        foreach ($req->goods_category as $k => $gc) {
            $ist_gc_id = 0;
            $istArr=[];
            if (!array_key_exists('gc_id', $gc)) {
                $istArr['gc_gd_id'] = $gd_id;
                $istArr['gc_prime'] = $gc['gc_prime'];
                $istArr['gc_ca01'] = $gc['gc_ca01'];
                $istArr['gc_ca01_name'] = $gc['gc_ca01_name'];
                if(count($gc) > 3) { $istArr['gc_ca02'] = $gc['gc_ca02']; $istArr['gc_ca02_name'] = $gc['gc_ca02_name']; }
                if(count($gc) > 5) { $istArr['gc_ca03'] = $gc['gc_ca03']; $istArr['gc_ca03_name'] = $gc['gc_ca03_name']; }
                if(count($gc) > 7) { $istArr['gc_ca04'] = $gc['gc_ca04']; $istArr['gc_ca04_name'] = $gc['gc_ca04_name']; }                
                $ist_gc_id = GoodsCategory::insertGetId($istArr, 'gc_id');
            }
            if($ist_gc_id != 0)
                $gc['gc_id'] = $ist_gc_id;
            $cate_ist_info[] = $gc;
            unset($istArr);
        }

        if ($req->filled('delete_goods_category')) {    //  카테고리 삭제
            foreach ($req->delete_goods_category as $id) {
                if ($id)
                    DB::table('shop_goods_category')->where('gc_id', $id)->delete();
            }
        }


        if ($req->filled('delete_goods_model')) {    //  모델 삭제
            //  하단에 삭제관련 소스를 모아두었지만
            //  캣넘버를 먼저 지워야 
            //  완전히 지워진 모델의 캣넘버가 다시 부여된다.
            //  ex) 23-12345 모든 모델을 지우고 다시 모델을 생성한다면
            //  오류에서는 23-12346 다음번호부터 생성됨
            //  수정 후 23-12345 마지막 숫자 "5" 부터 다시 부여됨
            foreach ($req->delete_goods_model as $id) {
                if ($id) {
                    DB::table('shop_goods_model')->where('gm_id', $id)->delete();
                    DB::table('shop_bundle_dc')->where('bd_gm_id', $id)->delete();
                }
            }
        }

        if(array_key_exists('gm_catno01', $req->goods_model[0]) && $req->goods_model[0]['gm_catno01']) {
            $cat[0] = $req->goods_model[0]['gm_catno01'];
            $cat[1] = $req->goods_model[0]['gm_catno02'];
            $cat[2] = collect($req->goods_model)->max('gm_catno03');
        } else {
            $cat[0] = $req->goods_category[0]['gc_ca01'];
            $cat[1] = $this->goods_model->Catno01($cat[0])->max(DB::raw('CAST(gm_catno02 AS UNSIGNED)'))+1;
            $cat[1] = substr("00000".$cat[1], -6);
            $cat[2] = 0;
        }

        //  검색 테이블 삭제했다가 다시 밀어넣기
        DB::table('shop_goods_search')->where('gd_id', $gd_id)->delete();
        foreach ($req->goods_model as $gm) {
            $gm_impl = $this->goodsModel_paramImplant($gd_id, $gm);
            $gm_impl_add = array();
            $gm_id = $gm['gm_id'] ?? 0;
            if ($gm_id) {   $gm_impl_add = ['updated_id' => auth()->user()->id];
            } else {
                $cat[2] += 1;
                $gm_impl_add = ['created_id' => auth()->user()->id, 'gm_catno01' => $cat[0], 'gm_catno02' => $cat[1], 'gm_catno03' => substr("0".$cat[2], -2) ]; 
            }
            $gm_impl = Arr::collapse([$gm_impl, $gm_impl_add, ['ip' => $req->ip()]]);
      
            $udt_gm = $this->goods_model->updateOrCreate(['gm_id' => $gm_id], $gm_impl);
                    
       
            foreach ($gm['bundle_dc'] as $bd) {
                if (isset($bd['bd_ea'])){
                    if (isset($bd['bd_id']) && $bd['bd_id'])    $col_nm = 'updated_id';
                    else                                        $col_nm = 'created_id';
                    $bd_impl = $this->bundleDc_paramImplant($udt_gm->gm_id, $bd);
                    $bd_impl = Arr::collapse([$bd_impl, [$col_nm => auth()->user()->id, 'ip' => $req->ip()]]);
                    $this->bd->updateOrCreate(['bd_id' => $bd['bd_id']], $bd_impl);                    
                }
            }

            //  검색 테이블        
            foreach ($cate_ist_info as $gc) {
                $goods->gd_mk_name = $req->gd_mk_name;
                DB::table('shop_goods_search')->insert($this->search_paramImplant($goods, $gc, $udt_gm));
            }
            //  검색 테이블
        }        

        if ($req->filled('delete_bundle_dc')) {    //  묶음할인 삭제
            foreach ($req->delete_bundle_dc as $id) {
                if ($id)
                    DB::table('shop_bundle_dc')->where('bd_id', $id)->delete();
            }
        }
        
        foreach ($req->goods_option as $go) {
            if (isset($go['go_name'])){
                $udt_go = $this->goods_option->updateOrCreate( ['go_id' => $go['go_id']], $this->option_paramImplant($gd_id, $go) );             
                foreach ($go['goods_option_child'] as $goc) {
                    if (isset($goc['goc_name']))
                        $this->goods_option_child->updateOrCreate( ['goc_id' => $goc['goc_id']], $this->optionChild_paramImplant($udt_go->go_id, $goc) );
                }
            }
        }

        if ($req->filled('delete_option')) {    //  옵션 삭제
            foreach ($req->delete_option as $id) {
                if ($id) {
                    DB::table('shop_goods_option')->where('go_id', $id)->delete();
                    DB::table('shop_goods_option_child')->where('goc_go_id', $id)->delete();
                }
            }
        }

        if ($req->filled('delete_option_child')) {    //  옵션 항목 삭제
            foreach ($req->delete_option_child as $id) {
                if ($id)
                    DB::table('shop_goods_option_child')->where('goc_id', $id)->delete();
            }
        }

        if ($gd_rst)
            return response()->json($gd_id, 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
    }

    public function fileUpload(Request $req) {
        if (is_array($req->file)) {
            foreach ($req['file'] as $k => $f) {
                if (gettype($f) == 'object') {
                    $this->file_upload($f, "api_{$req->fi_group}/{$req->fi_room}/{$req->fi_kind}/", $req->is_thumb);
                    DB::table('file_goods')->insert([
                        'fi_key' => $req->fi_key, 
                        'fi_room' => $req->fi_room,
                        'fi_kind' => $req->fi_kind,
                        'fi_original' => $f->getClientOriginalName(),
                        'fi_new' => $f->hashName(),
                        'fi_seq' => $k,
                        'fi_size' => $f->getSize(),
                        'fi_ext' => $f->getClientOriginalExtension(),
                        'created_id' => auth()->user()->id,
                        'ip' => $req->ip(),
                    ]);
                }
                if ($req->is_change_seq) {
                    if ( gettype($f) == 'string' ) {
                        $f = json_decode($f);
                        if (array_key_exists('fi_id', $f))
                            DB::table('file_goods')->where('fi_id', $f->fi_id)->update(['fi_seq' => $k]);
                    }
                }
            }
        }
        
        if ($req->filled('is_delete')) {
            foreach (json_decode($req->is_delete) as $fi_id)
                app('App\Http\Controllers\CommonController')->deleteFiles($fi_id, 'goods');
        }
        return response()->json("success", 200);
    }

    public function destroy($id) {    
        // foreach (FileGoods::Key($id)->get() as $v)
        //     app('App\Http\Controllers\CommonController')->deleteFiles($v->fi_id, 'goods');        
        // foreach (GoodsOption::Gd_id($id)->get() as $go) {
        //     foreach ($go->goodsOptionChild as $goc) 
        //         $goc->delete();
        //     $go->delete();
        // }
        // foreach (GoodsModel::Gd_id($id)->get() as $gm) {            
        //     foreach ($gm->bundleDc as $bd) 
        //         $bd->delete();
        //     $gm->delete();
        // }
        // DB::table('shop_goods_category')->where('gc_gd_id', $id)->delete();
        DB::table('shop_goods')->where('gd_id', $id)->update(['deleted_at' => \Carbon\Carbon::now()]);
        //  검색 테이블
        DB::table('shop_goods_search')->where('gd_id', $id)->delete();
    }

    public function goods_paramImplant($goods, $req){
        $gd_keyword_chg = str_replace('-', 'ΩΩ', $req->gd_keyword);
        $gd_keyword_chg = str_replace('.', 'ΣΣ', $gd_keyword_chg);
        $goods->gd_name     = $req->gd_name;
	   	$goods->gd_desc     = $req->gd_desc;
        $goods->gd_keyword  = $req->gd_keyword;
        $goods->gd_keyword_chg  = $gd_keyword_chg;
        $goods->gd_video    = $req->gd_video;
	   	$goods->gd_dlvy_at  = $req->gd_dlvy_at;
	   	$goods->gd_enable   = $req->filled('gd_enable') ? $req->gd_enable : 'N';
	   	$goods->gd_type     = $req->filled('gd_type') ? $req->gd_type : 'NON';
	   	$goods->gd_mk_id    = $req->gd_mk_id;
	   	$goods->gd_pa_id    = $req->gd_pa_id;
        $goods->gd_mng_info = $req->gd_mng_info;
        $goods->gd_seq      = $req->filled('gd_seq') ? $req->gd_seq : 999999;
        $goods->ip          = $req->ip();
        return $goods;
    }
    public function goodsModel_paramImplant($gd_id, $gm){
        return [    'gm_gd_id'  => $gd_id,
                    'gm_name'   => $gm['gm_name'],
                    'gm_code'   => $gm['gm_code'],
                    'gm_spec'   => $gm['gm_spec'],
                    'gm_unit'   => $gm['gm_unit'],
                    'gm_enable' => $gm['gm_enable'] ?? 'N',
                    'gm_price'  => $gm['gm_price'],
                    'gm_prime'  => $gm['gm_prime']];
    }
    public function option_paramImplant($gd_id, $go){
        return [    'go_gd_id'      => $gd_id,
                    'go_required'   => $go['go_required'] ?? 'N',
                    'go_name'       => $go['go_name'] ];
    }

    public function optionChild_paramImplant($go_id, $goc){
        return [    'goc_go_id'     => $go_id,
                    'goc_name'      => $goc['goc_name'],
                    'goc_price'     => $goc['goc_price'], ];
    }
    public function bundleDc_paramImplant($gm_id, $bd){
        return [    'bd_gm_id' => $gm_id,
                    'bd_ea'    => $bd['bd_ea'],
                    'bd_price' => $bd['bd_price']];
    }

    public function search_paramImplant($gd, $gc, $gm) {
        return ['gd_id'        => $gd->gd_id,
                'gd_enable'    => $gd->gd_enable,
                'gd_type'      => $gd->gd_type ? $gd->gd_type : 'NON',
                'gd_name'      => $gd->gd_name,
                'gd_keyword'   => $gd->gd_keyword,
                'gd_rank'      => $gd->gd_rank,
                'gd_seq'       => $gd->gd_seq,
                'mk_name'      => $gd->gd_mk_name,
                'gm_id'        => $gm['gm_id'],
                'gm_enable'    => $gm['gm_enable'],
                'gm_catno'     => "{$gm['gm_catno01']}-{$gm['gm_catno02']}-{$gm['gm_catno03']}",
                'gm_catno01'   => $gm['gm_catno01'],
                'gm_catno02'   => $gm['gm_catno02'],
                'gm_catno03'   => $gm['gm_catno03'],
                'gm_name'      => $gm['gm_name'],
                'gm_code'      => $gm['gm_code'],
                'gm_prime'     => $gm['gm_prime'],
                'gc_id'        => $gc['gc_id'],
                'gc_ca01'      => $gc['gc_ca01'],
                'gc_ca01_name' => $gc['gc_ca01_name'],
                'gc_ca02'      => array_key_exists('gc_ca02',      $gc) ? $gc['gc_ca02']      : NULL,
                'gc_ca02_name' => array_key_exists('gc_ca02_name', $gc) ? $gc['gc_ca02_name'] : NULL,
                'gc_ca03'      => array_key_exists('gc_ca03',      $gc) ? $gc['gc_ca03']      : NULL,
                'gc_ca03_name' => array_key_exists('gc_ca03_name', $gc) ? $gc['gc_ca03_name'] : NULL,
                'gc_ca04'      => array_key_exists('gc_ca04',      $gc) ? $gc['gc_ca04']      : NULL,
                'gc_ca04_name' => array_key_exists('gc_ca04_name', $gc) ? $gc['gc_ca04_name'] : NULL,
                'gc_prime'     => $gc['gc_prime'],
                'updated_id'   => $gd->updated_id ];
    }

    public function getModel(Request $req){
        $rst = null;
        $gm = $this->goods_model;

        switch ($req->type) {
            case 'em_catno':
                $gm_catno = explode('-', $req->key);
                $gm = $gm   ->where('gm_catno01', $gm_catno[0])
                            ->where('gm_catno02', $gm_catno[1])
                            ->when($gm_catno[2],    fn ($q, $v) => $q->where('gm_catno03', $gm_catno[2]));
            break;
            case 'em_code': $gm = $gm->Code($req->key); break;
            default: return response()->json('검색 자료 부족', 500); break;
        }
        //  머크쪽에서 머크 상품만 검색하기 위해 1차카테 검색
        $gm->when($req->ca01, fn ($q, $v) => $q->Catno01($v));

        $rst = $gm->orderBy('gm_catno01')->orderBy('gm_catno02')->orderBy('gm_catno03')->get();
        foreach ($rst as $gm) {
            $gm->bundleDc;
            $gm->goods->purchaseAt;
            $gm->goods->maker;
        }
        return response()->json($rst, 200);
    }

    public function getGoodsList(Request $req) {
        return response()->json($this->goods->SchGd_name($req->gd_name)->get(), 200);
    }

    // public function getGoods(Request $req){
    //     $rst = $this->goods->find($req->gd_id);
    //     $rst->maker;
    //     return response()->json($rst, 200);
    // }
    //
    // public function getGoodsMaker(int $gd_id) {
    //     return response()->json($this->goods->find($gd_id)->maker, 200);
    // }
}
