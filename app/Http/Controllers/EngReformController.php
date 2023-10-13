<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreEngReform;
use App\Models\{EngReform, FileInfo};
use App\Mail\MailEngReform;
use Mail;
use DB;

class EngReformController extends Controller {

    public function __construct() {
        // $this->middleware('auth');
    }

    public function index(Request $req) {
        $eng = EngReform::with('fileInfo')->where("created_id", auth()->user()->id)->latest()->paginate(10);
        return response()->json($eng, 200);
    }

    public function getOption () {
        return response()->json(EngReform::$option, 200);
    }

    public function show(Request $req, $er_id) {
        $data['con'] = EngReform::find($er_id);
        $data['con']->fileInfo;
        //  배열값을 넘겨줘야 하는데 values 함수 안쓰면 Object가 넘어온다.
        $data['con']->file_info_cplt = $data['con']->fileInfo->where('fi_kind', 'cplt')->values();
        $data['con']->mng;
        $data['option'] = EngReform::$option;
        return response()->json($data, 200);
    }

    public function store(StoreEngReform $req) {
        $er_id = EngReform::insertGetId([
            "er_name"        => auth()->check()                 ? auth()->user()->name    : '',
            "er_email"       => auth()->check()                 ? auth()->user()->email   : '',
            "er_hp"          => auth()->check()                 ? auth()->user()->hp      : '',
            "er_company"     => auth()->check()                 ? auth()->user()->company : '',

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

        $subject = '[4science] '.auth()->user()->name.'님, 요청하신 영문교정 메일입니다.';
        $params['con'] = EngReform::find($er_id);
        try {
            Mail::to(trim(auth()->user()->email))->queue(new MailEngReform(config('mail.mailers.smtp.username'), $subject, $params, "admin.eng_reform.request"));
        } catch(\Swift_TransportException $e){
            // if($e->getMessage()) dd($e->getMessage());
        }

        
        return response()->json(["msg"=>"success", 'er_id'=>$er_id], 200);
    }
}
