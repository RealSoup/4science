<?php
namespace app\Http\Controllers\admin\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\{FileInfo, FileGoods, User};
use App\Models\Shop\{Category, Goods, GoodsModel, BundleDc, Maker, Hash, HashJoin, Option, OptionChild, PurchaseAt};
use App\Traits\FileControl;
use App\Http\Requests\SaveGoodsRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;

class GoodsController extends Controller {
    use FileControl;

    protected $goods;
    protected $goods_model;
    protected $option;
    protected $optionChild;
	protected $maker;
    protected $bd;

	public function __construct( Goods $gd, GoodsModel $gm, Option $option, OptionChild $optionChild, Maker $mk, BundleDc $bd ) {
        $this->goods = $gd;
        $this->goods_model = $gm;
        $this->option = $option;
        $this->optionChild = $optionChild;
        $this->maker = $mk;
        $this->bd = $bd;
    }


    public function index(Category $cate, Request $req) {
        //  카테고리 검색때문에 with을 안쓰고 조인을 했다.
        $gd = $this->goods->with('fileGoodsGoods')->with('maker')->with('user')
                ->rightJoin(
                     DB::raw("
                        (SELECT 
                            gc_gd_id, gc_prime, 
                            gc_ca01, gc_ca01_name, 
                            gc_ca02, gc_ca02_name, 
                            gc_ca03, gc_ca03_name, 
                            gc_ca04, gc_ca04_name
                        from la_shop_goods_category
                        where gc_prime = 'Y') la_shop_goods_category
                    "), 'shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id'
                );
                // ->rightJoin('shop_goods_category', 'shop_goods.gd_id', '=', 'shop_goods_category.gc_gd_id')
                // ->where('gc_prime', 'Y');

                
        $gd->when($req->ca01, fn ($q, $v) => $q->whereGcCa01($v));
        // if ($req->ca01)         $gd = $gd->where('gc_ca01', $req->ca01);
        $gd->when($req->ca02, fn ($q, $v) => $q->whereGcCa02($v));
        $gd->when($req->ca03, fn ($q, $v) => $q->whereGcCa03($v));
        $gd->when($req->ca04, fn ($q, $v) => $q->whereGcCa04($v));
        $gd->when($req->startDate,  fn ($q, $v) => $q->StartDate($v));
        $gd->when($req->endDate,    fn ($q, $v) => $q->EndDate($v));
        $gd->when($req->gd_enable,  fn ($q, $v) => $q->Enable($v));
        $gd->when($req->gd_mk_id,   fn ($q, $v) => $q->Maker($v));

        if ($req->keyword){
            $gm = $this->goods_model;
            switch ($req->mode) {
                case 'gd_name':     $gd = $gd->SchGd_name($req->keyword); break;
                case 'gm_name':     $gd = $gd->SchGd_id($gm->Name($req->keyword)->pluck('gm_gd_id')); break;
                case 'gm_code':     $gd = $gd->SchGd_id($gm->Code($req->keyword)->pluck('gm_gd_id')); break;
                case 'manager':     $gd = $gd->SchWriter(User::Name($req->keyword)->pluck('id')); break;
                case 'cat_no':      $keyword = explode('-', $req->keyword);
                    if (count($keyword) == 3) {
                        $gd = $gd->SchGd_id($gm->where('gm_catno01', $keyword[0])
                                    ->where('gm_catno02', $keyword[1])
                                    ->where('gm_catno03', 'like', $keyword[2].'%')->pluck('gm_gd_id'));
                    } else if (count($keyword) == 2){
                        $gd = $gd->SchGd_id($gm->where('gm_catno01', $keyword[0])
                                    ->where('gm_catno02', 'like', $keyword[1].'%')->pluck('gm_gd_id'));
                    } else if (count($keyword) == 1){
                        $gd = $gd->SchGd_id($gm->where('gm_catno01', 'like', $keyword[0].'%')
                                    ->where('gm_catno02', 'like', $keyword[0].'%')
                                    ->where('gm_catno03', 'like', $keyword[0].'%')->pluck('gm_gd_id'));
                    }
                break;
                default:
                    $gd = $gd->where(function($query) use ($req){
                        $query->SchGd_name($req->keyword)->orWhere(function (Builder $query) use ($req) {
                            $query->SchWriter(User::SchName($req->keyword)->pluck('id'));
                        });
                    });
                break;
            }
        }
        $data['list'] = $gd->latest("gc_gd_id")->paginate($req->filled('limit') ? $req->limit : 10);
        $data['list']->appends($req->all())->links();
        
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
        $data['hashs'] = Hash::orderBy('hs_tag')->get(); //  키워드 연결
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

    public function edit(HashJoin $hj, $gd_id) {
        $data['goods'] = $this->goods->find($gd_id);
        $data['goods']->goodsCategory; 
        foreach ($data['goods']->goodsModel as $md) $md->bundleDc;
        foreach($data['goods']->option as $op) $op->optionChild;
        $data['goods']->fileGoodsGoods;
        $data['goods']->fileGoodsAdd;
        $data['makers'] = $this->maker::Select('mk_id', 'mk_name')->orderBy('mk_name')->get();    //  제조사
        $data['purchaseAt'] = PurchaseAt::orderBy('pa_name')->get(); //  매입처 직배송
        $data['hashs'] = Hash::orderBy('hs_tag')->get(); //  키워드 연결
        $data['goods']->hash_join = $hj->joinHash()->Gd_id($gd_id)->get();

        return response()->json($data);
    }

    public function store(SaveGoodsRequest $req) {
	   	$goods = $this->goods_paramImplant($this->goods, $req);
		$goods->created_id = auth()->user()->id;
	   	$rst = $goods->save();
        foreach ($req->goods_category as $gc) {
            $istArr['gc_gd_id'] = $goods->gd_id;
            $istArr['gc_ca01'] = $gc['gc_ca01'];
            $istArr['gc_ca01_name'] = $gc['gc_ca01_name'];
            if(count($gc) > 3) { $istArr['gc_ca02'] = $gc['gc_ca02']; $istArr['gc_ca02_name'] = $gc['gc_ca02_name']; }
            if(count($gc) > 5) { $istArr['gc_ca03'] = $gc['gc_ca03']; $istArr['gc_ca03_name'] = $gc['gc_ca03_name']; }
            if(count($gc) > 7) { $istArr['gc_ca04'] = $gc['gc_ca04']; $istArr['gc_ca04_name'] = $gc['gc_ca04_name']; }
            DB::table('shop_goods_category')->insert($istArr);
        }

        $cat[0] = $req->goods_category[0]['gc_ca01'];
        $cat[1] = $this->goods_model->Catno01($cat[0])->max('gm_catno02')+1;
        $cat[2] = 0;
        
        foreach ($req->goods_model as $gm) {
            $cat[2] += 1;
            $gm_impl = $this->goodsModel_paramImplant($goods->gd_id, $gm);
            $gm_impl = Arr::collapse([$gm_impl, ['created_id'=>auth()->user()->id, 'gm_catno01'=>$cat[0], 'gm_catno02'=>$cat[1], 'gm_catno03'=>$cat[2]]]);
            $ist_gm_id = GoodsModel::insertGetId($gm_impl, 'gm_id');

            foreach ($gm['bundle_dc'] as $bd) {
                if (isset($bd['bd_ea'])){
                    $bd_impl = $this->bundleDc_paramImplant($ist_gm_id, $bd);
                    $this->bd->insert(Arr::collapse([$bd_impl, ['created_id'=>auth()->user()->id, 'ip' => $req->ip()]]));
                }
            }
        }

        foreach ($req->option as $op) {
            if (isset($op['op_name'])){
                $op_id = $this->option->insertGetId($this->option_paramImplant($goods->gd_id, $op), 'op_id');
                foreach ($op['option_child'] as $opc) {
                    if (isset($opc['opc_name'])) $this->optionChild->insert($this->optionChild_paramImplant($op_id, $opc));
                }
            }
        }

        if ($req->filled('hash_join')) $this->hashStore($req->hash_join, $goods->gd_id);

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
        foreach ($req->goods_category as $gc) {
            if (!array_key_exists('gc_id', $gc)) {
                $istArr['gc_gd_id'] = $gd_id;
                $istArr['gc_ca01'] = $gc['gc_ca01'];
                $istArr['gc_ca01_name'] = $gc['gc_ca01_name'];
                if(count($gc) > 3) { $istArr['gc_ca02'] = $gc['gc_ca02']; $istArr['gc_ca02_name'] = $gc['gc_ca02_name']; }
                if(count($gc) > 5) { $istArr['gc_ca03'] = $gc['gc_ca03']; $istArr['gc_ca03_name'] = $gc['gc_ca03_name']; }
                if(count($gc) > 7) { $istArr['gc_ca04'] = $gc['gc_ca04']; $istArr['gc_ca04_name'] = $gc['gc_ca04_name']; }
                DB::table('shop_goods_category')->insert($istArr);
            }
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
            $cat[1] = $this->goods_model->Catno01($cat[0])->max('gm_catno02')+1;
            $cat[2] = 0;
        }
        
        foreach ($req->goods_model as $gm) {
            $gm_impl = $this->goodsModel_paramImplant($gd_id, $gm);
            $gm_impl_add = array();
            $gm_id = $gm['gm_id'] ?? 0;
            if ($gm_id) {   $gm_impl_add = ['updated_id' => auth()->user()->id];
            } else {
                $cat[2] += 1;
                $gm_impl_add = ['created_id' => auth()->user()->id, 'gm_catno01' => $cat[0], 'gm_catno02' => $cat[1], 'gm_catno03' => $cat[2] ]; 
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
        }        

        if ($req->filled('delete_bundle_dc')) {    //  묶음할인 삭제
            foreach ($req->delete_bundle_dc as $id) {
                if ($id)
                    DB::table('shop_bundle_dc')->where('bd_id', $id)->delete();
            }
        }
        
        foreach ($req->option as $op) {
            if (isset($op['op_name'])){
                $udt_op = $this->option->updateOrCreate( ['op_id' => $op['op_id']], $this->option_paramImplant($gd_id, $op) );             
                foreach ($op['option_child'] as $opc) {
                    if (isset($opc['opc_name']))
                        $this->optionChild->updateOrCreate( ['opc_id' => $opc['opc_id']], $this->optionChild_paramImplant($udt_op->op_id, $opc) );
                }
            }
        }

        if ($req->filled('delete_option')) {    //  옵션 삭제
            foreach ($req->delete_option as $id) {
                if ($id) {
                    DB::table('shop_option')->where('op_id', $id)->delete();
                    DB::table('shop_option_child')->where('opc_op_id', $id)->delete();
                }
            }
        }

        if ($req->filled('delete_option_child')) {    //  옵션 항목 삭제
            foreach ($req->delete_option_child as $id) {
                if ($id)
                    DB::table('shop_option_child')->where('opc_id', $id)->delete();
            }
        }

        if ($req->filled('hash_join')) $this->hashStore($req->hash_join, $gd_id);

        if ($gd_rst)
            return response()->json($gd_id, 200);
        else
            return response()->json(["msg"=>"Fail"], 500);
    }

    public function fileUpload(Request $req) {
        if (is_array($req->file)) {
            foreach ($req['file'] as $k => $f) {
                if (gettype($f) == 'object') {
                    $this->file_upload($f, "api_{$req->fi_group}/".(@intval($req->fi_key/1000)+1)."/{$req->fi_kind}/", $req->is_thumb);
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
        DB::table('shop_hash_join')->where('gd_id', $id)->delete();       
        foreach (FileGoods::Key($id)->get() as $v)
            app('App\Http\Controllers\CommonController')->deleteFiles($v->fi_id, 'goods');        
        foreach (Option::Gd_id($id)->get() as $op) {
            foreach ($op->optionChild as $opc) 
                $opc->delete();
            $op->delete();
        }
        foreach (GoodsModel::Gd_id($id)->get() as $gm) {            
            foreach ($gm->bundleDc as $bd) 
                $bd->delete();
            $gm->delete();
        }
        DB::table('shop_goods_category')->where('gc_gd_id', $id)->delete();
        DB::table('shop_goods')->where('gd_id', $id)->delete();
        DB::table('shop_listing')->where('li_gd_id', $id)->delete();
    }

    public function hashStore($hash_join, $gd_id){
        $prev = HashJoin::Gd_id($gd_id)->pluck('hs_id');
        foreach ($hash_join as $v) {
            $r = Hash::firstOrCreate( ['hs_id'=>$v['hs_id']], ['hs_tag'=>$v['hs_tag']] );
            HashJoin::firstOrCreate( ['gd_id'=>$gd_id, 'hs_id'=>$r->hs_id] );
            $prev->forget($prev->search($v['hs_id']));
        }
        foreach ($prev as $id)
            HashJoin::Gd_id($gd_id)->Hs_id($id)->delete();
    }

    public function goods_paramImplant($goods, $req){
        $goods->gd_name        = $req->gd_name;
	   	$goods->gd_desc        = $req->gd_desc;
        $goods->gd_video       = $req->gd_video;
	   	$goods->gd_dlvy_at     = $req->gd_dlvy_at;
	   	$goods->gd_enable      = $req->filled('gd_enable') ? $req->gd_enable : 'N';
	   	$goods->gd_mk_id       = $req->gd_mk_id;
	   	$goods->gd_pa_id       = $req->gd_pa_id;
        $goods->gd_mng_info    = $req->gd_mng_info;
        $goods->ip             = $req->ip();
        return $goods;
    }
    public function goodsModel_paramImplant($gd_id, $gm){
        return [    'gm_gd_id'  => $gd_id,
                    'gm_name'   => $gm['gm_name'],
                    'gm_code'   => $gm['gm_code'],
                    'gm_spec'   => $gm['gm_spec'],
                    'gm_unit'   => $gm['gm_unit'],
                    'gm_enable' => $gm['gm_enable'] ?? 'N',
                    'gm_price'  => $gm['gm_price']];
    }
    public function option_paramImplant($gd_id, $op){
        return [    'op_gd_id'      => $gd_id,
                    'op_required'   => $op['op_required'] ?? 'N',
                    'op_name'       => $op['op_name'] ];
    }

    public function optionChild_paramImplant($op_id, $opc){
        return [    'opc_op_id'     => $op_id,
                    'opc_name'      => $opc['opc_name'],
                    'opc_price'     => $opc['opc_price'], ];
    }
    public function bundleDc_paramImplant($gm_id, $bd){
        return [    'bd_gm_id' => $gm_id,
                    'bd_ea'    => $bd['bd_ea'],
                    'bd_price' => $bd['bd_price']];
    }

    public function getModel(Request $req){
        $rst = null;
        $gm = $this->goods_model;

        switch ($req->type) {
            case 'em_catno':
                $gm_catno = explode('-', $req->key);
                $gm = $gm   ->where('gm_catno01', $gm_catno[0])
                            ->where('gm_catno02', $gm_catno[1])
                            ->where('gm_catno03', 'like', $gm_catno[2].'%');
            break;
            case 'em_code': $gm = $gm->Code($req->key); break;
            default: return response()->json('검색 자료 부족', 500); break;
        }
        
        $gm->when($req->ca01, fn ($q, $v) => $q->Catno01($v));

        $rst['gd'] = $gm->orderBy('gm_catno01')->orderBy('gm_catno02')->orderBy('gm_catno03')->get();
        foreach ($rst['gd'] as $md)
            $md->bundleDc;
        if (!$rst['gd']->isEmpty()) {
            $rst['gd']->first()->goods->purchaseAt;
            $gd_id = $rst['gd']->first()->gm_gd_id;
            $rst['mk'] = $this->goods->find($gd_id)->maker;
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
