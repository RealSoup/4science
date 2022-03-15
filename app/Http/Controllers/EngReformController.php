<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreEngReform;
use App\Models\{EngReform, FileInfo};
use DB;

class EngReformController extends Controller {

    public function __construct() {
        // $this->middleware('auth');
    }

    public function index(Request $req) {
        $eng = auth()->user()->engReform()->latest();
        $eng = $eng->paginate(10);
        return response()->json($eng, 200);
    }

    public function store(StoreEngReform $req) {
        $er_id = EngReform::insertGetId([
            "er_name"        => $req->filled('er_name')         ? $req->er_name         : '',
            "er_email"       => $req->filled('er_email')        ? $req->er_email        : '',
            "er_hp"          => $req->filled('er_hp')           ? $req->er_hp           : '',
            "er_tel"         => $req->filled('er_tel')          ? $req->er_tel          : '',
            "er_depart"      => $req->filled('er_depart')       ? $req->er_depart       : '',
            "er_type"        => $req->filled('er_type')         ? $req->er_type         : '1',
            "er_dlvy_at"     => $req->filled('er_dlvy_at')      ? $req->er_dlvy_at      : '',
            "er_format"      => $req->filled('er_format')       ? $req->er_format       : 'NFM',
            "er_journal_url" => $req->filled('er_journal_url')  ? $req->er_journal_url  : '',
            "er_use"         => $req->filled('er_use')          ? $req->er_use          : '',
            "er_branch"      => $req->filled('er_branch')       ? $req->er_branch       : '',
            "er_editor"      => $req->filled('er_editor')       ? $req->er_editor       : '',
            "er_branch_sub"  => $req->filled('er_branch_sub')   ? $req->er_branch_sub   : '',
            "er_eng_style"   => $req->filled('er_eng_style')    ? $req->er_eng_style    : 'AM',
            "er_demand"      => $req->filled('er_demand')       ? $req->er_demand       : '',
            'ip'             => $req->ip(),
            'created_id'     => auth()->check()                 ? auth()->user()->id    : 0
        ]);

        if ($req->filled('file_info')){ //  업로드된 파일 매칭 키 입력
            foreach ($req->file_info as $fi_id)
                DB::table('file_info')->where('fi_id', $fi_id['fi_id'])->update(['fi_key' => $er_id]);
        }
        return response()->json(["msg"=>"success", 'er_id'=>$er_id], 200);
    }
}
