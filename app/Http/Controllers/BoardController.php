<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use App\Models\{Board, BoardGood, FileInfo};
use App\Events\{BoardView, UserMileage};
use App\Http\Requests\StoreBoard;
use DB;
use Gate;

class BoardController extends Controller {
    protected $board;
    protected $bo_if;
    protected $ASCII_A = 65;  //	A의 아스키코드
    protected $param;

    public function __construct(Request $req, Board $board) {
        $board->setCode(isset($req->bo_cd) ? $req->bo_cd : 'notice');
        $this->board = $board;
        $this->param['config'] = $board->config;
    }
    public function index(Request $req, $bo_cd) {
        $bo = $this->board
                ->where('bo_group', 0)
                ->whereNull('bo_seq_cd')
                ->orderByRaw('bo_seq, bo_seq_cd');
        if ( $bo_cd == 'gd_inquiry' )
            $bo = $bo->with('goods');
        
        if (( $bo_cd == 'gd_inquiry' || $bo_cd == 'review' ) &&  $req->filled('bo_gd_id'))
            $bo = $bo->where('bo_gd_id', $req->bo_gd_id);

        if ($req->filled('sch_txt')) {
            $sch_txt = trim($req->sch_txt);
            $bo = $bo->where(function (Builder $query) use ($sch_txt) {
                        $query->where('bo_subject', 'like', "%".$sch_txt."%")
                            ->orWhere('bo_content', 'like', "%".$sch_txt."%")
                            ->orWhere('bo_writer', 'like', "%".$sch_txt."%");
                    });
        }        
        
        $bo = $bo->paginate($req->filled('limit') ? $req->limit : 10);
        $bo->appends($req->all())->links();


        //  답변 가져오기
        if ( $this->param['config']['is_qna'] )
            foreach ($bo as $v)
                $v->answer = DB::table($this->board->getTable())->where('bo_seq', $v->bo_seq)->where('bo_seq_cd', 'A')->first();



        // if ( $this->param['config']['is_qna'] ) {
        //     for ($i=0; $i < count($bo); $i++)   //  다음에 답변이 있는지 체크하는 루프
        //         if(is_null($bo[$i]->bo_seq_cd)) //  질문 글 인가??
        //             if( isset($bo[$i+1]) && $bo[$i+1]->bo_seq_cd == 'A' && $bo[$i]->bo_seq == $bo[$i+1]->bo_seq )   //  답변이 있는가??
        //                 $bo[$i]->answer = true;
        //             else
        //                 $bo[$i]->answer = false;
        // }
        $this->param['list'] = $bo;

        return response()->json($this->param);

    }

    public function indexComment(Request $req, $bo_cd, $bo_id) {
        $comment = $this->board->where('bo_group', $bo_id)->orderByRaw('bo_co_seq, bo_co_seq_cd')->get();
        foreach ($comment as $key => $val) {
            if(count($val->fileInfo_bo)){
                if(isImg($val->fileInfo_bo[0]->fi_ext))
                    $val->fileInfo_bo[0]->src = $val->fileInfo_bo[0]->getSrc();
            }
        }
        return response()->json($comment);
    }

    public function show(Request $req, $bo_cd, $bo_id) {
        // dd($this->authorize('show', $this->board));
        $bo = $this->board->find($bo_id);
        event(new BoardView($req, $bo));
        
        $bo->img_file = collect();
        $bo->add_file = collect();
        foreach ($bo->fileInfo_bo as $fi) {
            if(isImg($fi->fi_ext)) $bo->img_file[] = $fi;
            else                $bo->add_file[] = $fi;
        }
 
        return response()->json($bo);
    }

    public function edit($bo_cd, $bo_id) {
        // $this->authorize('update', $this->board);
        // $this->param['act_type'] = 'edit';
        $bo = $this->board->find($bo_id);
        $bo->img_file = collect();
        $bo->add_file = collect();
        foreach ($bo->fileInfo_bo as $fi) {
            if(isImg($fi->fi_ext)) $bo->img_file[] = $fi;
            else                $bo->add_file[] = $fi;
        }
        return response()->json($bo);
    }

    public function create($bo_cd, $bo_papa_id=null) {
        $this->param['act_type'] = 'create';
        $this->param['bo_papa_id'] = $bo_papa_id;
        return response()->json($this->param);
    }

    public function store(\App\Models\UserMileage $p, StoreBoard $req, $bo_cd) {       

        // abort_if(!auth()->check(), 401);
        //  StoreBoard 에서 처리함

        if ($req->wri_type == 'comment')    $pieces = $this->co_reqImplant($req);
        else if ($req->wri_type == 'reply') $pieces = $this->re_reqImplant($req);
        else                                $pieces = ['bo_seq' => ($this->board->min('bo_seq'))-1];

        if ($bo_cd == 'gd_inquiry') 
            $pieces = Arr::collapse([['bo_gd_id' => $req->bo_gd_id ], $pieces]);
        if ($bo_cd == 'review') {
            $pieces = Arr::collapse([[
                'bo_gd_id' => $req->filled('bo_gd_id') ? $req->bo_gd_id : 0,
                'bo_good' => $req->filled('bo_good') ? $req->bo_good : 100,
            ], $pieces]);
        }
        if ($bo_cd == 'as') {
            $pieces = Arr::collapse([[
                'bo_od_type' => $req->filled('bo_od_type') ? $req->bo_od_type : "ON",
                'bo_od_no' => $req->filled('bo_od_no') ? $req->bo_od_no : 0,
            ], $pieces]);
        }
        if ($bo_cd == 'cancel') 
            $pieces = Arr::collapse([['bo_type' => $req->bo_type ], $pieces]);
        $pieces = Arr::collapse([$this->bo_reqImplant($req), $pieces]);
        $pieces = Arr::collapse([['created_id' => auth()->user()->id ], $pieces]);
        $bo_id = $this->board->insertGetId($pieces);    //  가공된 자료DB insert

        if ($req->wri_type == 'comment') {
            event(new UserMileage("insert", 'board', $bo_id, $p->mileage['comment'], '댓글 작성', auth()->user()->id));
            if (isset($req->file)) {
                $rst_upload = app('App\Http\Controllers\CommonController')->upload($req);
                $fi_id[] = $rst_upload->getData()->fi_id;
                $req->request->add(['fi_id' => $fi_id]);
            }
        } else {
            $redirect = route('board.show', ['bo_cd'=>$bo_cd, 'bo_id'=>$bo_id]);
            // event(new Mileage("board", 'up'));
        }
        if (isset($req->fi_id))
            $this->fiKeySet($req->fi_id, $bo_id);  //  업로드된 파일 게시판 키 입력
        return response()->json(["msg"=>"success", 'bo_id'=>$bo_id], 200);
	   	// return redirect($redirect);
    }

    public function re_reqImplant($req) {
        $papa = $this->board->where('bo_id', $req->bo_papa_id)->first();
        $sibling_cnt = $this->board->where([ ['bo_seq', $papa->bo_seq], ['bo_seq_cd', 'like', $papa->bo_seq_cd.'%'] ])
                            ->whereRaw('LENGTH(bo_seq_cd) = ?', (strlen($papa->bo_seq_cd))+1)
                            ->count();
        $bo_seq_cd = $papa->bo_seq_cd.chr($this->ASCII_A+$sibling_cnt);
        return [    'bo_seq'    => $papa->bo_seq,
                    'bo_seq_cd' => $bo_seq_cd ];
    }

    public function co_reqImplant($req) {
        $papa = $this->board->where('bo_id', $req->bo_papa_id)->first();
        if ($papa->bo_group == 0) {
            $bo_co_seq = $this->board->where([['bo_group', $req->bo_papa_id], ['bo_co_seq_cd', 'A']])->max('bo_co_seq');
            $bo_co_seq += 1;
            $bo_group =  $papa->bo_id;
        } else {
            $bo_co_seq = $papa->bo_co_seq;
            $bo_group =  $papa->bo_group;
        }
        $sibling_cnt = $this->board->where([['bo_group', $papa->bo_group], ['bo_co_seq', $papa->bo_co_seq]])
                            ->whereRaw('LENGTH(bo_co_seq_cd) = ?', (strlen($papa->bo_co_seq_cd))+1)
                            ->count();
        $bo_co_seq_cd = $papa->bo_co_seq_cd.chr($this->ASCII_A+$sibling_cnt);
        return [    'bo_seq'       => $papa->bo_seq,
                    'bo_group'     => $bo_group,
                    'bo_co_seq'    => $bo_co_seq,
                    'bo_co_seq_cd' => $bo_co_seq_cd ];
    }


    public function update(StoreBoard $req, $bo_cd, $bo_id) {
        $bo = $this->board->where('bo_id', $bo_id)->first();
        $this->authorize('update', $bo);

        $pieces = ['updated_id' => auth()->user()->id, 'updated_at' => now()];
        if ($bo_cd == 'as') {
            $pieces = Arr::collapse([[
                'bo_od_type' => $req->filled('bo_od_type') ? $req->bo_od_type : "ON",
                'bo_od_no' => $req->filled('bo_od_no') ? $req->bo_od_no : 0,
            ], $pieces]);
        }
        if ($bo_cd == 'cancel') 
            $pieces = Arr::collapse([['bo_type' => $req->bo_type ], $pieces]);
        $pieces = Arr::collapse([$this->bo_reqImplant($req), $pieces]);
        $bo->update($pieces);

        if ($req->wri_type == 'comment') {
            if (isset($req->file)) {
                if ($req->prev_fi_id)
                    app('App\Http\Controllers\CommonController')->deleteFiles($req->prev_fi_id);
                $rst_upload = app('App\Http\Controllers\CommonController')->upload($req);
                $fi_id[] = $rst_upload->getData();
                $req->request->add(['fi_id' => $fi_id]);
            }
            if ($req->del_file > 0)
                app('App\Http\Controllers\CommonController')->deleteFiles($req->del_file);
        }
        if ($req->filled('fi_id'))
            $this->fiKeySet($req->fi_id, $bo_id);  //  업로드된 파일 게시판 키 입력

        return response()->json(["msg"=>"success", 'bo_id'=>$bo_id], 200);
    }

    public function destroy(Request $req, $bo_cd, $bo_id) {
        $bo = $this->board->where('bo_id', $bo_id)->first();
        $this->authorize('delete', $bo);

        $boType = '';
        if ($bo->bo_seq_cd)         $boType = "reply";
        else if ($bo->bo_co_seq_cd) $boType = "comment";
        else                        $boType = "board";

        $msg = "success";
        $resCode = 200;

        if ($boType == 'comment') {
            $co_cnt = $this->board->where([ ['bo_group', $bo->bo_group],
                                            ['bo_co_seq', $bo->bo_co_seq],
                                            ['bo_co_seq_cd', '<>', $bo->bo_co_seq_cd],
                                            ['bo_co_seq_cd', 'like', $bo->bo_co_seq_cd.'%']])->count();

            if ($co_cnt > 0)
                $msg = "댓글이 있습니다.";
        } else if ($boType == 'reply') {
            $co_cnt = $this->board->where('bo_group', $bo_id)->count();
            if ($co_cnt > 0)
                $msg = "댓글이 있습니다.";
            $re_cnt = $this->board->where([ ['bo_seq', $bo->bo_seq],
                                            ['bo_seq_cd', '<>', $bo->bo_seq_cd],
                                            ['bo_seq_cd', 'like', $bo->bo_seq_cd.'%']])->count();
            if ($re_cnt > 0)
                $msg = "답글이 있습니다.";
        } else {
            $co_cnt = $this->board->where('bo_group', $bo_id)->count();
            if ($co_cnt > 0)
                $msg = "댓글이 있습니다.";
            $re_cnt = $this->board->where('bo_seq', $bo->bo_seq)->whereNotNull('bo_seq_cd')->count();
            if ($re_cnt > 0)
                $msg = "답글이 있습니다.";
        }

        $img = DB::table('file_info')->where([['fi_group', 'board'], ['fi_kind', $this->board->code], ['fi_key', $bo_id]])->get();
        if (count($img) > 0) {
            foreach ($img as $v)
                app('App\Http\Controllers\CommonController')->deleteFiles($v->fi_id);
        }

        if ($msg == "success")  $this->board->where('bo_id', $bo_id)->delete();
        else                    $resCode = 500;
        
        return response()->json(["message"=>$msg], $resCode);
    }

    public function bo_reqImplant($req) {
        return [
            'bo_writer'  => auth()->user()->name,
            'bo_subject' => $req->filled('bo_subject') ? $req->bo_subject : '',
            'bo_content' => $req->filled('bo_content') ? $req->bo_content : '',
            'ip'         => $req->ip()
        ];
    }

    public function fiKeySet($fi_id, $bo_id) {
        foreach ($fi_id as $id) {
            $finfo = FileInfo::findOrFail($id);
            $finfo->fi_key	= $bo_id;
            $finfo->save();
        }
    }

    public function goodBad(App\Models\UserMileage $p, $bo_cd, $bo_id, $type) {
        $good = DB::table('board_good')->where([    ['bg_table', $bo_cd],
                                                    ['bg_bo_id', $bo_id],
                                                    ['created_id', auth()->user()->id]  ])->first();
        $bo = $this->board->where('bo_id', $bo_id)->first();
        $this->authorize('goodBad', $bo);
        $msg = 'success';
        if ($type == 'GOOD' || $type == 'BAD') {
            if ($good) {
                $msg = ($good->bg_type == $type) ? 'already' : 'reverse';
            } else {
                $bo->increment(($type=='GOOD')?'bo_good':'bo_bad');
                $bg_id = DB::table('board_good')->insertGetId([   'bg_table' => $bo_cd,
                                                    'bg_bo_id' => $bo_id,
                                                    'bg_type' => ($type=='GOOD')?'GOOD':'BAD',
                                                    'created_id' => auth()->user()->id ]);
                event(new UserMileage("insert", "boardGood", $bg_id, $p->mileage['good'], '게시물 추천/비추천', auth()->user()->id));
            }
        } else if ($type == 'already' || $type == 'reverse') {
            $bo->decrement(($good->bg_type=='GOOD')?'bo_good':'bo_bad');
            if ($type == 'reverse'){
                $bo->increment(($good->bg_type=='GOOD')?'bo_bad':'bo_good');
                DB::table('board_good')
                    ->where([ ['bg_table', $bo_cd], ['bg_bo_id', $bo_id], ['created_id', auth()->user()->id] ])
                    ->update( ['bg_type' => ($good->bg_type=='GOOD')?'BAD':'GOOD'] );
            } else {
                $bg = BoardGood::Table($bo_cd)->BoId($bo_id)->User(auth()->user()->id)->first();
                event(new UserMileage("delete", "boardGood", $bg->bg_id, $p->mileage['good'], '게시물 추천/비추천', auth()->user()->id));
                $bg->delete();
            }
        }

        return response()->json($msg, 200);
    }
}
