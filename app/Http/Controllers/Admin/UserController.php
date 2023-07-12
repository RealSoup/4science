<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\{User, UserMng, UserAddr, UserBiz};
use Cache;
use DB;

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
        DB::table('users')->where('id', $id)->update([
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
        ]);
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

    public function sendEmail(Request $req) {
		$receiver = "";
		if ( $req->target == 0 ) {
			$temp = explode(";", $req->temp);
			foreach($temp as $k => $v)
				$list[] =  collect(['name' => 'A'.$k, 'email' => $v]);
            self::postman($req, collect($list));
		} else {
			$count = User::member()
            ->whereNotNull('email_verified_at')
            ->when($req->target == 1, fn ($q, $v) => $q->where('receive_mail', 'Y'))
            ->where('email', 'REGEXP', '^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9._-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\\.[a-zA-Z]{2,4}$')
            ->count();
            // 한번에 보낼수 있는 최고 양이 3만통
            $list = User::select('name', 'email')->member()
            ->whereNotNull('email_verified_at')
            ->when($req->target == 1, fn ($q, $v) => $q->where('receive_mail', 'Y'))
            ->where('email', 'REGEXP', '^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9._-]@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]\\.[a-zA-Z]{2,4}$');
            $limit = 20000;
            $i=0;
            while ($i < $count) {
                $list->offset($i)->limit($limit);
                self::postman($req, $list->get());
                $i+=$limit;
            }
		}
        // $receiver = "";
		// if ( $req->target == 'custom' ) {
		// 	$temp = explode(";", $req->temp);
		// 	foreach($temp as $k => $v)
		// 		$list[] =  collect(['name' => 'A'.$k, 'email' => $v]);
        //     self::postman($req, collect($list));
        // } else {
        //     $limit = 30000;
        //     $list = User::select('name', 'email')->member()->whereNotNull('email_verified_at');
        //     if ($req->target == 'agree')          self::postman($req, $list->where('receive_mail', 'Y')->get());
        //     else if ($req->target == 'all_0-3')   self::postman($req, $list->offset(0)->limit($limit)->get());
        //     else if ($req->target == 'all_3-6')   self::postman($req, $list->offset(30000)->limit($limit)->get());
        //     else if ($req->target == 'all_6-end') self::postman($req, $list->offset(60000)->limit($limit)->get());
		// }
    }

    public function postman($req, $list) {
		/******************** 인증정보 ********************/
		// 대량메일 인증 관련
		$sendmail_url = "https://science4.sendmail.cafe24.com/sendmail_api.php"; // 전송요청 URL
		$secureKey = "c0a3d12ec374f8ae2773159a14b85e60"; // 인증키
		$userId = "science4"; // 발송자ID

		/******************** 요청변수 처리 ********************/
		// 메일발송 관련
		$sender = '4science'; // 발송자 이름
		$email = 'admin@4science.net'; // 발송자 이메일

        $receiver = '';
        foreach($list as $k => $v){
            $receiver.=$v['name'].','.$v['email'].'
';
        }

		// 파일첨부 관련
		// $file_name = $req['file']?$req['file']['name']:null;
		// $tmp_name = $req['file']?$req['file']['tmp_name']:null;
		// $content_type = $req['file']?$req['file']['type']:null;

		/******************** 요청변수 처리 ********************/
		$mail['secureKey'] = $secureKey;
		$mail['userId'] = $userId;
		$mail['sender'] = base64_encode($sender);
		$mail['email'] = base64_encode($email);
		$mail['receiverlist'] = base64_encode($receiver);
		$mail['subject'] = base64_encode($req->subject);
		$mail['content'] = base64_encode($req->content);
		$mail['overlapType'] = 1;  //  1: 중복제외, 2: 중복발송허용      수신자 주소 중 중복주소 제거여부를 선택합니다.

		$host_info = explode("/", $sendmail_url);
		$host = $host_info[2];
		$path = $host_info[3];

		srand((double)microtime()*1000000);
		$boundary = "---------------------".substr(md5(rand(0,32000)),0,10);

		// 헤더 생성
		$header = "POST /".$path ." HTTP/1.0\r\n";
		$header .= "Host: ".$host."\r\n";
		$header .= "Content-type: multipart/form-data, boundary=".$boundary."\r\n";

		// 본문 생성
        $data='';
		foreach($mail AS $index => $value){
			$data .="--$boundary\r\n";
			$data .= "Content-Disposition: form-data; name=\"".$index."\"\r\n";
			$data .= "\r\n".$value."\r\n";
			$data .="--$boundary\r\n";
		}

		// 첨부파일
		// if (is_uploaded_file($req['file']['tmp_name'])) {
		// 	$data .= "--$boundary\r\n";
		// 	$content_file = join("", file($tmp_name));
		// 	$data .="Content-Disposition: form-data; name=\"addfile\"; filename=\"".$file_name."\"\r\n";
		// 	$data .= "Content-Type: $content_type\r\n\r\n";
		// 	$data .= "".$content_file."\r\n";
		// 	$data .="--$boundary--\r\n";
		// }
		$header .= "Content-length: " . strlen($data) . "\r\n\r\n";

		$fp = fsockopen($host, 80);

		$msg = "";
		if ($fp) {
			fputs($fp, $header.$data);

			$rsp = '';
			while(!feof($fp)) {
				$rsp .= fgets($fp,8192);
			}

			fclose($fp);

			$msg = explode("\r\n\r\n",trim($rsp));
			echo $msg[1];
		} else echo "Connection Failed";
		if ( $msg[1] == "SUCCESS" ) return response()->json('success', 200);
	}
}