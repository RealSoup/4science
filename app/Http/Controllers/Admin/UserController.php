<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{User, UserMng, UserAddr, UserBiz};
use Cache;
use DB;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
    public function index(User $user, Request $req) {
        $data['option'] = User::$option;

        if ($req->filled('startDate'))  $user = $user->StartDate($req->startDate);
        if ($req->filled('endDate'))    $user = $user->EndDate($req->endDate);
        if ($req->filled('group'))      $user = $user->Group($req->group);
        if ($req->filled('level'))      $user = $user->Level($req->level);
        if ($req->filled('keyword')){
            switch ($req->keyword_type) {
                case 'name':        $user = $user->Name($req->keyword); break;
                case 'email':       $user = $user->Email($req->keyword); break;
                case 'part':        $user = $user->Part($req->keyword); break;
                case 'company':     $user = $user->company($req->keyword); break;
                case 'tutor':       $user = $user->Tutor($req->keyword); break;
                case 'tel':         $user = $user->Tel($req->keyword); break;
                case 'hp':          $user = $user->Hp($req->keyword); break;
            }
        }

        $data['user'] = $user->latest()->paginate(20);
        $data['user']->appends($req->all())->links();

        foreach ($data['user'] as $v) {
            if ($v->code_01)
                $v->introducer = User::find($v->code_01);
            else $v->introducer = NULL;
        }
        return response()->json($data);
    }

    public function list(User $us, Request $req) {
        switch ($req->type) {
            case 'name':        $us = $us->Name($req->key); break;
            case 'email':       $us = $us->Email($req->key); break;
            case 'company':     $us = $us->Company($req->key); break;
            case 'hp':          $us = $us->Hp($req->key); break;
            default: return response()->json('검색 자료 부족', 500); break;
        }
        return response()->json($us->get(), 200);
    }

    public function edit(Request $req, $id) {
        $user = User::with('UserMng')->with('UserBiz')->find($id);
        if(!$user->userBiz->ub_id){
            $user->userBiz->file_info = [];
        }
        if ($user->code_01) $user->introducer = User::find($user->code_01);
        else                $user->introducer = NULL;
        $user->option = User::$option;
        $user->mng_list = User::whereHas('userMng', function ($query) { $query->where('um_status', 'Y'); })->get();
        $um = new UserMng;
        $user->mng_info = $um->getMngInfo();
        return response()->json($user, 200);
    }

    public function update(Request $req, $id) {
        $user_biz = null;
        $update = [
            'email' => $req->filled('email') ? $req->email : '',
            'name' => $req->filled('name') ? $req->name : '',
            'sex' => $req->filled('sex') ? $req->sex : 'male',
            'hp' => $req->filled('hp') ? $req->hp : '',
            'tel' => $req->filled('tel') ? $req->tel : '',
            'fax' => $req->filled('fax') ? $req->fax : '',
            'level' => $req->filled('level') ? $req->level : 1,
            'group' => $req->filled('group') ? $req->group : '일반',
            'birth' => $req->filled('birth') ? $req->birth : '',
            'job' => $req->filled('job') ? $req->job : '',
            'part' => $req->filled('part') ? $req->part : '',
            'company' => $req->filled('company') ? $req->company : '',
            'grade' => $req->filled('grade') ? $req->grade : '',
            'tutor' => $req->filled('tutor') ? $req->tutor : '',
            'offer' => $req->filled('offer') ? $req->offer : '',
            'offer_lab' => $req->filled('offer_lab') ? $req->offer_lab : '',
            
            'interest_etc' => $req->filled('interest_etc') ? $req->interest_etc : '',
            'join_route' => $req->filled('join_route') ? $req->join_route : '',
            'receive_sms' => $req->filled('receive_sms') ? $req->receive_sms : 'Y',
            'receive_mail' => $req->filled('receive_mail') ? $req->receive_mail : 'Y',
            'mng' => $req->filled('mng') ? $req->mng : 0,
        ];
        
        if ( $req->filled('password_confirmation') ) $update['password'] = bcrypt($req->password);
        DB::table('users')->where('id', $id)->update($update);
        
        // 'interest' => $req->filled('interest') ? implode(", ", $req->interest) : '',
        if ( in_array($req->level, [11, 12]) ) {
            $user_biz = UserBiz::updateOrCreate(
                [   'ub_papa_id' => $id ],
                [   'ub_name'      => array_key_exists('ub_name',      $req->user_biz) ? $req->user_biz['ub_name']      : '',
                    'ub_corp_name' => array_key_exists('ub_corp_name', $req->user_biz) ? $req->user_biz['ub_corp_name'] : '',
                    'ub_num'       => array_key_exists('ub_num',       $req->user_biz) ? $req->user_biz['ub_num']       : '',
                    'ub_tel'       => array_key_exists('ub_tel',       $req->user_biz) ? $req->user_biz['ub_tel']       : '',
                    'ub_zip'       => array_key_exists('ub_zip',       $req->user_biz) ? $req->user_biz['ub_zip']       : '',
                    'ub_addr1'     => array_key_exists('ub_addr1',     $req->user_biz) ? $req->user_biz['ub_addr1']     : '',
                    'ub_addr2'     => array_key_exists('ub_addr2',     $req->user_biz) ? $req->user_biz['ub_addr2']     : '',
                    'ub_type'      => array_key_exists('ub_type',      $req->user_biz) ? $req->user_biz['ub_type']      : '',
                    'ub_cond'      => array_key_exists('ub_cond',      $req->user_biz) ? $req->user_biz['ub_cond']      : '',
                    'updated_id'   => auth()->check()                                  ? auth()->user()->id             : 0, ]
            );
        } else if ( $req->level > 20 ) {
            DB::table('user_mng')->updateOrInsert(
            [   'um_user_id' => $id ],
            [   'um_status'         => array_key_exists('um_status', $req->user_mng) ? $req->user_mng['um_status'] : 'Y',
                'um_position'       => array_key_exists('um_position', $req->user_mng) ? $req->user_mng['um_position'] : 1,
                'um_group'          => array_key_exists('um_group', $req->user_mng) ? $req->user_mng['um_group'] : 'etc',
                'um_responsibility' => array_key_exists('um_responsibility', $req->user_mng) ? $req->user_mng['um_responsibility'] : NULL, ]);
            // Cache::forget("UserMng");
            DB::table('infos')->where('key', 'update_key_user_mng')->update(['val' => uniqid()]);
        }
        $rst = [ 'message' => 'success' ];
        if( $user_biz ) $rst['ub_id'] = $user_biz->ub_id;
        return response()->json($rst, 200);
    }

    public function exeEmailVerify(Request $req, $id) {
        User::where('id', $id)->update([
            'email_verified_at' => \Carbon\Carbon::now(),
            'updated_id' => auth()->user()->id,
        ]);
        return response()->json([ 'message' => 'success' ], 200);
    }

    public function indesAddr(Request $req, $id) {
        return response()->json(UserAddr::where('ua_key', $id)->get(), 200);
    }

    public function storeAddr (Request $req) {
        if ($req->filled('ua_def') && $req->ua_def == 'Y')
            DB::table('user_addr')->where('ua_key', $req->ua_key)->update(['ua_def' => 'N']);
        
        $id = DB::table('user_addr')->insertGetId( [
            "ua_key"    => $req->filled('ua_key')   ? $req->ua_key      : 0,
            "ua_def"    => $req->filled('ua_def')   ? $req->ua_def      : 'N',
            "ua_title"  => $req->filled('ua_title') ? $req->ua_title    : '',
            "ua_name"   => $req->filled('ua_name')  ? $req->ua_name     : '',
            "ua_hp"     => $req->filled('ua_hp')    ? $req->ua_hp       : '',
            "ua_zip"    => $req->filled('ua_zip')   ? $req->ua_zip      : '',
            "ua_addr1"  => $req->filled('ua_addr1') ? $req->ua_addr1    : '',
            "ua_addr2"  => $req->filled('ua_addr2') ? $req->ua_addr2    : '',
            "ua_memo"   => $req->filled('ua_memo')  ? $req->ua_memo     : '',
        ] );
        return response()->json("success", 200);
    }

    public function updateAddr (Request $req) {
        if ($req->filled('ua_def') && $req->ua_def == 'Y')
            DB::table('user_addr')->where('ua_key', $req->ua_key)->update(['ua_def' => 'N']);
        DB::table('user_addr')->where('ua_id', $req->ua_id)->update([
            "ua_def"    => $req->filled('ua_def')   ? $req->ua_def      : 'N',
            "ua_title"  => $req->filled('ua_title') ? $req->ua_title    : '',
            "ua_name"   => $req->filled('ua_name')  ? $req->ua_name     : '',
            "ua_hp"     => $req->filled('ua_hp')    ? $req->ua_hp       : '',
            "ua_zip"    => $req->filled('ua_zip')   ? $req->ua_zip      : '',
            "ua_addr1"  => $req->filled('ua_addr1') ? $req->ua_addr1    : '',
            "ua_addr2"  => $req->filled('ua_addr2') ? $req->ua_addr2    : '',
            "ua_memo"   => $req->filled('ua_memo')  ? $req->ua_memo     : '',
        ]);        
        return response()->json("success", 200);
    }

    public function destroyAddr ($id) {
		if(DB::table('user_addr')->where('ua_id', $id)->delete()) return response()->json('success', 200);
		else return response()->json("Fail", 500);
    }

    public function mailInfo() {
        $data['agree'] = User::member()->whereNotNull('email_verified_at')->where('receive_mail', 'Y')->count();
        $data['all'] = User::member()->whereNotNull('email_verified_at')->count();
        return response()->json($data, 200);
    }

    public function email_index(User $user, Request $req) {
        $data = DB::table('bulk_mail')->latest()->paginate(20);
        $data->appends($req->all())->links();
        return response()->json($data);
    }

    public function email_edit($id) {
        return response()->json(DB::table('bulk_mail')->find($id));
    }
    public function email_store(Request $req) {
        $id = DB::table('bulk_mail')->insertGetId([ 'title' => $req->title, 'body' => $req->body ]);
        return response()->json($id, 200);
    }
    public function email_update(Request $req, $id) {
        DB::table('bulk_mail')->where('id', $id)->update([ 'title' => $req->title, 'body' => $req->body ]);
    }
    public function email_destroy(Request $req, $id) {
        DB::table('bulk_mail')->where('id', $id)->delete();
    }
    public function email_send(Request $req, $id) {
        $mail = DB::table('bulk_mail')->find($id);

        $target = json_decode($req->target);
		if ( $req->target_type == 'custom' ) {
			foreach($target as $k => $v)          
				$list[] =  collect(['address' => $v, 'name' => 'A'.$k, 'type' => 'R']);            
		} else {
            // 한번에 보낼수 있는 최고 양이 10만통
            $list = DB::table('users')
            ->select(['email as address', 'name', DB::raw("'R' as type")])
            ->where('level', '<', 20)
            ->whereNotNull('email_verified_at')
            ->when($req->target_type == 'agree', fn ($q, $v) => $q->where('receive_mail', 'Y'))
            ->where('email', 'REGEXP', '^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9._-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\\.[a-zA-Z]{2,4}$')
            ->get()
            ->toArray();
            
			foreach($target as $k => $v) {
                $new = new class{};
                $new->address = $v->addr;
                $new->name = $v->name;
                $new->type = 'R';
                array_push($list, $new);
            }
		}

        list($microtime, $timestamp) = explode(' ',microtime());
        $timestamp = $timestamp.substr($microtime, 2, 3);
        $access_key = 'USRkR0y4hTSbyTHnexAM';
        $secret_key = '2IIkmTwjumWVzym6xUtGVpWrh3udNeY6umxP6R6g';

        $message = "POST";
        $message .= " ";
        $message .= "/api/v1/mails";
        $message .= "\n";
        $message .= $timestamp;
        $message .= "\n";
        $message .= $access_key;
            
        $signature = base64_encode(hash_hmac('sha256', $message, $secret_key, true));

        $headers = array(
            "Content-Type: application/json;"
            , "x-ncp-apigw-timestamp: " . $timestamp . ""
            , "x-ncp-iam-access-key: " . $access_key . ""
            , "x-ncp-apigw-signature-v2: " . $signature . ""
        );

        $mailContentsDataSet["senderAddress"] = "admin@4science.net";
        $mailContentsDataSet["senderName"] = "4science";
        $mailContentsDataSet["title"] =  $mail->title;
        $mailContentsDataSet["body"] =  stripslashes(htmlspecialchars_decode($mail->body)); 
        $mailContentsDataSet["recipients"] = $list;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://mail.apigw.ntruss.com/api/v1/mails");
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($mailContentsDataSet));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        if ($response === FALSE)
            echo 'An error has occurred: ' . curl_error($ch) . PHP_EOL;        
        else {
            preg_match_all("/\{.*?\}/", $response, $matches);
            // $rst = json_decode($matches[0][0]);
            // dd($rst->count);
            return response($matches[0][0]);
        }
        
    }

    public function origin($id) {
        return response()->json(Auth::guard('web')->loginUsingId($id));
    } 
}