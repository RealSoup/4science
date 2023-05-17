<?php
namespace app\Http\Controllers\shop;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Shop\{Goods, Category, GoodsCategory, GoodsSearch, Hash};
use Illuminate\Support\Facades\DB;

class GoodsController extends Controller {
    protected $goods;

	public function __construct( Goods $gd ) { $this->goods = $gd; }
    
    public function index(Request $req) {
        abort_if((!$req->filled('ca01') && !$req->filled('keyword')), 501, '검색값이 없습니다.');
        abort_if((
            ($req->filled('ca01') && Category::where('ca_id', $req->ca01)->doesntExist()) ||
            ($req->filled('ca02') && Category::where('ca_id', $req->ca02)->doesntExist()) ||
            ($req->filled('ca03') && Category::where('ca_id', $req->ca03)->doesntExist()) ||
            ($req->filled('ca04') && Category::where('ca_id', $req->ca04)->doesntExist()) 
        ), 501, '존재 하지 않는 카테고리 입니다.');
        $data['categorys'] = Category::getSelectedCate( $req->filled('ca01') ? $req->ca01 : 0, 
                                                        $req->filled('ca02') ? $req->ca02 : 0, 
                                                        $req->filled('ca03') ? $req->ca03 : 0 );

        $gs = GoodsSearch::FROM( 'shop_goods_search AS gs' )->with('goods')->with('goodsModelPrime')
            ->SELECT("gs.gd_name", "gs.gm_name", "gs.gm_code", "gs.mk_name", "gs.gm_catno",
                "gc_ca01", "gc_ca01_name", "gc_ca02", "gc_ca02_name", "gc_ca03", "gc_ca03_name", "gc_ca04", "gc_ca04_name",
                "gs.gd_rank", "gd.gd_view_cnt", 'gs.gd_id'
            )
            ->join('shop_goods AS gd', 'gd.gd_id', '=', 'gs.gd_id')
            ->where('gs.gd_enable', 'Y')->groupBy('gs.gd_id');

        if ($req->filled('keyword')){
            // $ftWord = (preg_match("/[-+*.]/", $req->keyword)) ? '"'.$req->keyword.'"' : $req->keyword;
            $ftWord = $req->keyword.'*';
            if ( !$req->filled('mode') ) {
                $gs->selectRaw(" MATCH (la_gs.gd_name) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score01 , MATCH (la_gs.gm_name) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score02
                                , MATCH (la_gs.gm_code) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score03 , MATCH (la_gs.mk_name) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score04
                                , MATCH (la_gs.gm_catno) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score05 ")
                ->whereRaw('MATCH (la_gs.gd_name, la_gs.gm_name, la_gs.gm_code, la_gs.mk_name, la_gs.gm_catno) AGAINST (? IN BOOLEAN MODE)', [$ftWord]);
                
                if ($h = Hash::HsTag($ftWord)->first()) {
                    $hash  = DB::table('shop_hash_join')->select('gd_id')->where('hs_id', $h->hs_id);
                    $hj = DB::table('shop_hash_join AS hs' )
                    ->selectRaw("la_gs.gd_name, la_gs.gm_name, la_gs.gm_code, la_gs.mk_name, la_gs.gm_catno, 
                        gc_ca01, gc_ca01_name, gc_ca02, gc_ca02_name, gc_ca03, gc_ca03_name, gc_ca04, gc_ca04_name,
                        0 as score01, 0 as score02, 0 as score03, 0 as score04, 0 as score05, la_gs.gd_rank, 0 as gd_view_cnt, la_gs.gd_id "
                    )
                    ->join('shop_goods_search AS gs', 'hs.gd_id', '=', 'gs.gd_id')
                    ->whereIn('gs.gd_id', $hash)
                    ->groupBy('gs.gd_id');
                    $gs = $gs->union($hj); 
                }            
            } else {
                if ( $req->mode == 'gd_name' ) $gs->selectRaw(" MATCH (la_gs.gd_name) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score ")->whereFullText('gs.gd_name', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'gm_name' ) $gs->selectRaw(" MATCH (la_gs.gm_name) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score ")->whereFullText('gs.gm_name', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'gm_code' ) $gs->selectRaw(" MATCH (la_gs.gm_code) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score ")->whereFullText('gs.gm_code', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'cat_no' )  $gs->selectRaw(" MATCH (la_gs.gm_catno) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score ")->whereFullText('gs.gm_catno', $ftWord, ['mode' => 'boolean']);
                if ( $req->mode == 'maker' )   $gs->selectRaw(" MATCH (la_gs.mk_name) AGAINST ('".$ftWord."' IN BOOLEAN MODE) as score ")->whereFullText('gs.mk_name', $ftWord, ['mode' => 'boolean']);
            }

            $grouped = $gs->get();
            if ( $grouped->count()) {
                //  검색시 카테고리 상세 검색을 위한
                //  검생 상품이 속한 카테고리 배열정보
                // $grouped = collect($data['list']->items())->groupBy('gc_ca01');      
                
                $data['sch_cate_info']['all'] = count($grouped);

                $grouped = $grouped->groupBy('gc_ca01');
                
                foreach ($grouped as $v) {
                    $tmp['key'] = $v[0]->gc_ca01;
                    $tmp['name'] = $v[0]->gc_ca01_name;
                    $tmp['cnt'] = count($v);
                    $data['sch_cate_info']['ca01'][] = $tmp;
                }
                if ($req->filled('ca01')) {
                    $grouped = $grouped[$req->ca01]->groupBy('gc_ca02');
                    foreach ($grouped as $v) {
                        $tmp['key'] = $v[0]->gc_ca02;
                        $tmp['name'] = $v[0]->gc_ca02_name;
                        $tmp['cnt'] = count($v);
                        $data['sch_cate_info']['ca02'][] = $tmp;
                    }
                }

                if ($req->filled('ca02')) {
                    $grouped = $grouped[$req->ca02]->groupBy('gc_ca03');
                    foreach ($grouped as $v) {
                        $tmp['key'] = $v[0]->gc_ca03;
                        $tmp['name'] = $v[0]->gc_ca03_name;
                        $tmp['cnt'] = count($v);
                        $data['sch_cate_info']['ca03'][] = $tmp;
                    }
                }

                if ($req->filled('ca03')) {
                    $grouped = $grouped[$req->ca03]->groupBy('gd_mk_id');
                    foreach ($grouped as $v) {
                        $tmp['key'] = $v[0]->gd_mk_id;
                        $tmp['name'] = $v[0]->mk_name;
                        $tmp['cnt'] = count($v);
                        $data['sch_cate_info']['maker'][] = $tmp;
                    }
                }
            }
        }
        
        //  결과 내 카테고리 선택 Start
        $gs->when($req->ca01, function ($q, $v) use($req) {
            return $q->whereIn('gs.gd_id', function($q) use($req) {
                if ($req->ca04)      $q->select('gc_gd_id')->from('shop_goods_category')->where('gc_ca01', $req->ca01)->where('gc_ca02', $req->ca02)->where('gc_ca03', $req->ca03)->where('gc_ca04', $req->ca04);
                else if ($req->ca03) $q->select('gc_gd_id')->from('shop_goods_category')->where('gc_ca01', $req->ca01)->where('gc_ca02', $req->ca02)->where('gc_ca03', $req->ca03);
                else if ($req->ca02) $q->select('gc_gd_id')->from('shop_goods_category')->where('gc_ca01', $req->ca01)->where('gc_ca02', $req->ca02);
                else                 $q->select('gc_gd_id')->from('shop_goods_category')->where('gc_ca01', $req->ca01);
            });
        });
        $gs->when($req->mk_id, fn ($q, $v) => $q->maker($v));
        //  결과 내 카테고리 선택 End


      
        // 정렬 설정 Strart
        switch ($req->sort) {
            case 'hot':
                if ( $req->filled('mode') ) $gs->orderBy('score', 'DESC');
                else $gs->orderBy('score01', 'DESC')->orderBy('score02', 'DESC')->orderBy('score03', 'DESC')->orderBy('score04', 'DESC')->orderBy('score05', 'DESC');
            break;
            case 'new':     $gs = $gs->latest('gd_id');        break;
            case 'lowPri':  $gs = $gs->oldest('gm_price');     break;
            case 'highPri': $gs = $gs->latest('gm_price');     break;
        }
        $gs->orderBy('gd_rank')->orderBy('gd_view_cnt');
        // 정렬 설정 End
        
        // echo_query($gs);
        if ($req->filled('limit'))  //  메인 베스트
            $data['list'] = $gs->limit($req->limit)->get(); 
        else {
            $data['list'] = $gs->paginate();
            $data['list']->appends($req->all())->links();

                       
            $data['pick'][0] = $data['list']->take(6);
            if (count($data['list']) > 6)
                $data['pick'][1] = $data['list']->skip(6)->take(6);
            
        }
        
		return response()->json($data);
    }

    public function show(Category $cate, Request $req, $gd_id) {
        abort_if($this->goods::where('gd_id', $gd_id)->doesntExist(), 501, '존재 하지 않는 상품입니다.');

        $data['goods'] = $this->goods->with('maker')->with('purchaseAt')->with('fileGoodsAdd')->with('goodsOption')->with('goodsCategoryFirst')
            ->with(['goodsModel' => function ($query) { $query->where('gm_enable', 'Y'); } ])
            ->with('goodsRelate')
            ->find($gd_id);
        //  모델의 appends에 초기 값을 세팅 할수 있지만
        //  데이터를 가공하고 나면 
        //  나중에 appends 초기 세팅값이 들어가서
        //  가공한게 날아간다.
        foreach ($data['goods']->goodsModel as $val) {
            $val->ea = 0;
            $val->bundleDc;
        }
        
        foreach ($data['goods']->goodsOption as $go) {
            foreach ($go->goodsOptionChild as $goc)
                $goc->ea = 0;
        }

        foreach ($data['goods']->goodsRelate as $v)
            $v->goods;

        event(new \App\Events\GoodsView($data['goods']));  //  조회수 증가
        // $data['categorys'] = collect();
        // $data['categorys'][0] = $cate->getCate(0);
        // if ($data['goods']->goodsCategoryFirst->gc_ca01)    $data['categorys'][1] = $cate->getCate($data['goods']->goodsCategoryFirst->gc_ca01);
        // if ($data['goods']->goodsCategoryFirst->gc_ca02)    $data['categorys'][2] = $cate->getCate($data['goods']->goodsCategoryFirst->gc_ca02);
        // if ($data['goods']->goodsCategoryFirst->gc_ca03)    $data['categorys'][3] = $cate->getCate($data['goods']->goodsCategoryFirst->gc_ca03);

        $ca01 = $data['goods']->goodsCategoryFirst->gc_ca01 ? $data['goods']->goodsCategoryFirst->gc_ca01 : 0;
        $ca02 = $data['goods']->goodsCategoryFirst->gc_ca02 ? $data['goods']->goodsCategoryFirst->gc_ca02 : 0;
        $ca03 = $data['goods']->goodsCategoryFirst->gc_ca03 ? $data['goods']->goodsCategoryFirst->gc_ca03 : 0;

        $data['categorys'] = Category::getSelectedCate( $ca01, $ca02, $ca03);
        
        return response()->json($data);
    }

    public function recentGoods(Request $req) {
        // DB::enableQueryLog();
        $data = null;
        if ($req->filled('gd_id')) {
            $data = $this->goods->whereIn('gd_id', explode(',', $req->gd_id))->orderByRaw('FIELD(gd_id, '.$req->gd_id.')')->get();
        }
        // dd(DB::getQueryLog());
        // dd($data->toArray());
        return response()->json($data);
    }

    public function getDef(Request $req) {        
        return response()->json($this->goods);
    }
}
