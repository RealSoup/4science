<?php
//  쿼리 출력
if (! function_exists('echo_query')) {
    function echo_query($obj) {
        dump(array_reduce($obj->getBindings(), function($sql, $binding){
            return preg_replace('/\?/', is_numeric($binding) ? $binding : "'".$binding."'" , $sql, 1);
        }, $obj->toSql()));
        echo "exit exist";
        exit;
    }
}

if (! function_exists('isImg')) {
    function isImg ($type) {
        return preg_match("/(jpg|png|gif|bmp|jpeg)/", $type);
    }
}

// if (! function_exists('getModelPrice')) {
//     function getModelPrice ($model) {
//         if ($model->bundleDc()->exists()) { // 묶음할인이 있다면 적용
//             foreach($model->bundleDc as $dc){
//                 if ($model->ea < $dc->bd_ea)      { break; }
//                 else if ($model->ea == $dc->bd_ea){ $model->gm_price = $dc->bd_price; break; }
//                 else if ($model->ea > $dc->bd_ea) { $model->gm_price = $dc->bd_price; }
//             }
//         }
//         return $model->gm_price;
//     }
// }


if (! function_exists('rrp')) { //  RECOMMENDED RETAIL PRICE     권장 소비자가격
    function rrp($price, $comma=0) {    //  가격 + 부가세
        $price = $price+surtax($price);
        return $comma ? number_format($price) : $price;
    }
}

if (! function_exists('surtax')) { //  부가세 계산
    function surtax($price, $comma=0) {
        $price = floor($price*0.1);
        return $comma ? number_format($price) : $price;
    }
}

// if (! function_exists('price_calculator')) { //  가격 계산
//     function price_calculator($price) {
//         $price['surtax_p'] = surtax($price['goods_p']+$price['option_p'], 0);
//         $price['goods_p'] = rrp($price['goods_p'], 0);
//         $price['option_p'] = rrp($price['option_p'], 0);
//         $price['dlvy_p'] = rrp($price['dlvy_p'], 0);
//         $price['total_p'] = $price['goods_p']+$price['option_p'];
//         $price['final_p'] = $price['total_p']+$price['dlvy_p'];
//         return $price;
//     }
// }

if (! function_exists('noImg')) { //  이미지 없을때 대체 이미지
    function noImg($f=false) {
        if(!$f) $f = 'noimg.jpg';
        return "/storage/goods/{$f}";
    }
}

if (! function_exists('sendSms')) {
    // 문자 발송
    function sendSms($receiver_num, $receiver_name, $od_no, $content){

        $subject    = "입금 정보 알림";
        $message    = $receiver_name."님\n".$content['bank']." ".$content['account']."\n"."주문번호"." ".$od_no."\n"."합계"." ".$content['price']."\n-".cache('biz')['company']."-";

        $data1 = [
            "user_id"   => "admin",
        	"sms_type"  => "S",
        	"receiver"=> $receiver_num,
            "sender"   => cache('biz')['tel'],
        	"subject" => $subject,
        	"message"=> $message,
        	//"send_date"=> "2019-04-01 15:40:11",
        	"file"=> ""
        ];

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.hiworks.com/office/v2/sms/send",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode($data1),
            CURLOPT_HTTPHEADER => array(
            	// Set here requred headers
                "Authorization: Bearer e106a633b531c76200c5fd44272f9ea6",
                "content-type: application/json",
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            // print_r(json_decode($response));
            return json_decode($response);
        }
    }
}


if (! function_exists('mailer')) {  //  라라벨은 메일이 잘 안된다
    // 메일 보내기 (파일 여러개 첨부 가능)
    // type : text=0, html=1, text+html=2
    function mailer($fname, $fmail, $to, $subject, $content, $type=0, $file="", $cc="", $bcc="")
    {
        if ($type != 1) {
            $content = nl2br($content);
        }

        $mail = new PHPMailer\PHPMailer\PHPMailer(); // defaults to using php "mail()"  
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = config('mail.mailers.smtp.host');             //  smtp host
        $mail->SMTPAuth = true;
        $mail->Username = config('mail.mailers.smtp.username');   //  sender username
        $mail->Password = config('mail.mailers.smtp.password');       // sender password
        $mail->SMTPSecure = config('mail.mailers.smtp.encryption');                  // encryption - ssl/tls
        $mail->Port = config('mail.mailers.smtp.port');        

        $mail->CharSet = 'UTF-8';
        $mail->From = $fmail;
        $mail->FromName = $fname;
        $mail->Subject = $subject;
        $mail->AltBody = ""; // optional, comment out and test
        $mail->msgHTML($content);
        $mail->addAddress($to);

        if ($cc) {
            $mail->addCC($cc);
        }
        if ($bcc) {
            $mail->addBCC($bcc);
        }
        if ($file != "") {
            foreach ($file as $f) {
                $mail->addAttachment($f['path'], $f['name']);
            }
        }

        if( !$mail->send() ) {
            return $mail->ErrorInfo;
        } else return 1;
        // return $mail->send();
    }
}

if(! function_exists('ver_asset')) {
    function ver_asset($path)
    {
        return asset($path). '?ver='. Carbon\Carbon::now()->format('Ymd');
    }
}

if(! function_exists('quotient')) {
    function quotient($a, $b) {
        return ($a-($a%$b))/$b;
    }
}

if(! function_exists('newCrc32')) {
    //  crc32 함수는 부호가 있고 없고에 대한 버그가 있어서 다음과 같이 처리
    function newCrc32($val){
        $checksum = crc32($val);
        if($checksum < 0) $checksum += 4294967296;
        return $checksum;
    }
}

if(! function_exists('mk_dir')) {
    function mk_dir($f_path){
        if(!is_dir($f_path)) {
            if (!mkdir($f_path, 0755, true) && !is_dir($f_path)) {
                echo "디렉토리 생성 실패  -  {$f_path}";
                exit;
            }
        }
    }
}

if(! function_exists('startsWith')) {
    function startsWith($haystack, $needle) {
        return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== false;
    }
}

if(! function_exists('strStartWithInArray')) {
    //  문자열이 배열에 있는 항목으로 시작하는지 체크
    function strStartWithInArray($array, $str) {
        return array_reduce($array, function ($contains, $item) use ($str) {
            return $contains = $contains || (strpos($str, $item) === 0);
        }, false);
    }
}




if(! function_exists('saleEnv')) {
    function saleEnv () {
        $sale_env = "P";
        $mobile_agent = '/(iPod|iPhone|Android|BlackBerry|SymbianOS|SCH-M\d+|Opera Mini|Windows CE|Nokia|SonyEricsson|webOS|PalmOS)/';
        if(preg_match($mobile_agent, $_SERVER['HTTP_USER_AGENT'])) { // preg_match() 함수를 이용해 모바일 기기로 접속하였는지 확인
            $sale_env = "M"; 
            if (strpos($_SERVER['HTTP_USER_AGENT'], 'Safari/') == false)
                $sale_env = 'A'; // IOS 웹뷰 접속
            else if (isset($_SERVER['HTTP_X_REQUESTED_WITH']))
                $sale_env = 'A'; // Android 웹뷰 접속
        }
        return $sale_env;
    }
}

if(! function_exists('cal_dc')) {
    function cal_dc ($p, $dc) {
        return ($dc<=99) ? ($p*(100-intval($dc)))/100 : $p-$dc;
    }
}

if(! function_exists('cal_dc_price')) {
    function cal_dc_price ($p, $dc) { //   쿠폰은 소수점 버림 한다. 
        return ($dc<=99) ? floor($p*intval($dc)/100) : $dc;
    }
}

if(! function_exists('translator')) {
    function translator ($txt) {
        $client_id = 'pb6q07kqau';
        $client_secret = 'kOsx6diC5j4N7gHHIkpUIcdSXywivhVr1g6X2y2n';
        $encText = urlencode($txt);
        $postvars = "source=ko&target=en&text=".$encText;
        $url = "https://naveropenapi.apigw.ntruss.com/nmt/v1/translation";
        $is_post = true;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, $is_post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt($ch,CURLOPT_POSTFIELDS, $postvars);
        $headers = array();
        $headers[] = "X-NCP-APIGW-API-KEY-ID: ".$client_id;
        $headers[] = "X-NCP-APIGW-API-KEY: ".$client_secret;
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec ($ch);
        $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
       
        curl_close ($ch);
        
        if($status_code == 200) return json_decode($response)->message->result->translatedText;
        else return NULL;
    }
}