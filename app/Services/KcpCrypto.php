<?php
namespace App\Services;

class KcpCrypto {
    private static $a = "c2hhMjU2";
    private static $b = 10000;
    private static $c = 32;
    private static $d = "QUVTLTI1Ni1DQkM=";

    private static function deriveKey($p, $s)
    {
        return hash_pbkdf2(base64_decode(self::$a), $p, $s, self::$b, self::$c, true);
    }

    public static function encryptJson($data, $key, $site) {
        $s = random_bytes(16);
        $k = self::deriveKey($key, $s);
        $v = self::deriveKey($site, $s);
        $i = substr($v, 0, 16);
        $e = openssl_encrypt($data, base64_decode(self::$d), $k, OPENSSL_RAW_DATA, $i);
        return [
            "encData" => base64_encode($e),
            "rv"      => base64_encode($s)
        ];
    }

    public static function decryptJson($enc, $rv, $key, $site) {
        $s = base64_decode($rv);
        $k = self::deriveKey($key, $s);
        $v = self::deriveKey($site, $s);
        $i = substr($v, 0, 16);
        return openssl_decrypt(base64_decode($enc), base64_decode(self::$d), $k, OPENSSL_RAW_DATA, $i);
    }
}