<?php
namespace App\Traits;

use Illuminate\Support\Facades\Http; // Laravel 7+ 이상
use DOMDocument;

trait Crawling {

    public function crawl($url) {
        $response = Http::withOptions([
            'verify'    => false,
        ])->get($url);

        if ($response->successful()) {
            $html = (string)$response->body();
            $dom = new DOMDocument;
            libxml_use_internal_errors(true);
            // libxml_clear_errors();
            $dom->loadHTML($html);
            $element = $dom->getElementById('productOverview');

            $innerHTML = '';
            foreach ($element->childNodes as $child) {
                $innerHTML .= $dom->saveHTML($child);
            }

  
            return response()->json([
                'html' => $innerHTML ?? '<p>내용 없음</p>'
            ]);





        } else {
            return 'fail';
        }
    }
}