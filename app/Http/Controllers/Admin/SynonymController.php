<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SynonymController extends Controller {
    protected $filePath;
    protected $esHost;
    protected $esUser;
    protected $esPassword;

    public function __construct() {
        $this->filePath   = env('SYNONYM_FILE_PATH');
        $this->esHost     = env('ELASTICSEARCH_HOST');
        $this->esUser     = env('ELASTICSEARCH_USER');
        $this->esPassword = env('ELASTICSEARCH_PASSWORD');
    }

    // 목록 조회
    public function index(Request $req) {
        $page = $req->get('page', 1);
        $search = $req->get('search', '');
        $perPage = 50;

        $lines = $this->getLines();
        $lines = array_filter($lines, fn($line) => !empty(trim($line)) && substr(trim($line), 0, 1) !== '#');
        $lines = array_values($lines);

        if ($search) {
            $lines = array_values(array_filter($lines, fn($line) => str_contains($line, $search)));
        }

        $total = count($lines);
        $slice = array_slice($lines, ($page - 1) * $perPage, $perPage);

        $list = collect($slice)->map(function ($line, $index) use ($page, $perPage) {
            return [
                'id'       => ($page - 1) * $perPage + $index,
                'keywords' => array_map('trim', explode(',', $line)),
                'raw'      => $line,
            ];
        });

        return response()->json([
            'list'      => $list,
            'total'     => $total,
            'page'      => (int) $page,
            'per_page'  => $perPage,
            'last_page' => ceil($total / $perPage),
        ]);
    }

    // 추가
    public function store(Request $request) {
        $keywords = $request->keywords;
        
        // 쉼표 기준으로 분리 후 각 단어 trim 하고 다시 합치기
        $keywords = implode(',', array_map('trim', explode(',', $keywords)));
        
        file_put_contents($this->filePath, "\n" . $keywords, FILE_APPEND);
        return response()->json(['success' => true]);
    }

    public function update(Request $request, $id) {
        $oldKeyword = trim($request->old_keyword);
        $newKeyword = implode(',', array_map('trim', explode(',', $request->keyword)));

        $lines = $this->getLines();
        $lines = array_map(function($line) use ($oldKeyword, $newKeyword) {
            return trim($line) === trim($oldKeyword) ? $newKeyword : $line;
        }, $lines);

        file_put_contents($this->filePath, implode("\n", $lines));
        return response()->json(['success' => true]);
    }

    // 삭제
    public function destroy(Request $request, $id) {
        $lines = $this->getLines();
        $lines = array_filter($lines, fn($line) => !empty(trim($line)));
        $lines = array_values($lines);

        // id 가 아니라 실제 내용으로 찾아서 삭제
        $keyword = $request->get('keyword'); // Vue에서 raw 값 넘겨줘야 함
        $lines = array_values(array_filter($lines, fn($line) => trim($line) !== trim($keyword)));

        file_put_contents($this->filePath, implode("\n", $lines));
        return response()->json(['success' => true]);
    }

    // ES reload
    public function reload() {
        $url = $this->esHost . '/shop_goods/_reload_search_analyzers';
        
        $response = \Http::withBasicAuth($this->esUser, $this->esPassword)
            ->withoutVerifying()
            ->send('POST', $url);

        if ($response->successful()) {
            return response()->json(['success' => true]);
        } else {
            return response()->json([
                'success' => false,
                'status'  => $response->status(),
                'message' => $response->body(),
            ]);
        }
    }

    private function getLines() {
        $content = file_get_contents($this->filePath);
        return explode("\n", $content);
    }
}