<?php
namespace App\Traits;

class HTTPResponse {
    public $code;
    public $response;
    public $url;
    public $info;
    public $raw;

    public function __construct($ch) {
        $temp = curl_exec($ch);

        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);

        // $header = substr($data, 0, $headerSize);
        $this->response = substr($temp, $headerSize);
        $this->code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $this->url      = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        $this->info     = curl_getinfo($ch);
        $this->raw      = $temp;

        curl_close($ch);
    }
    public function printInfo() {
        var_dump($this->info);
        // echo $this->code;
        // echo $this->url;
        // echo $this->response;
        // echo $this->info;
    }
}
class Curl {
    public static function get($url, $params, $header = array('Accept: application/json', 'Content-Type: application/json')) {
        //$query= http_build_query(Curl::parseParams($params));

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url . '?' . $params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        //echo curl_errno($ch);
        return new HTTPResponse($ch);
    }
}
