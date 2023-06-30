<?php
//  쿼리 출력
if (! function_exists('echo_query')) {
    function echo_query($obj) {
        dump(array_reduce($obj->getBindings(), function($sql, $binding){
            return preg_replace('/\?/', is_numeric($binding) ? $binding : "'".$binding."'" , $sql, 1);
        }, $obj->toSql()));
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
        return Storage::disk('s3')->url("goods/{$f}");
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