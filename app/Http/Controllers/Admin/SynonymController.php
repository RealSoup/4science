<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GoodsElasticSearch;

//  검색 동의어 관리 - 지금 손님이 쓰는 인덱스(config/search.php)의 동의어를 편집
//  동의어 세트 인덱스(shop_goods_v2): ES 안에 저장, 저장하면 바로 반영 / 그 외(shop_goods): ES config 폴더의 txt 파일
class SynonymController extends Controller {
    protected $set;         //  ES 동의어 세트 이름 (null이면 txt 파일 방식)
    protected $filePath;
    protected $esHost;
    protected $esUser;
    protected $esPassword;

    public function __construct() {
        $index = GoodsElasticSearch::index();
        $this->set        = config("search.synonym_sets.{$index}");
        $this->filePath   = dirname(env('SYNONYM_FILE_PATH')) . '/' . config("search.synonym_files.{$index}", basename(env('SYNONYM_FILE_PATH')));
        $this->esHost     = env('ELASTICSEARCH_HOST');
        $this->esUser     = env('ELASTICSEARCH_USER');
        $this->esPassword = env('ELASTICSEARCH_PASSWORD');
    }

    // 목록 조회
    public function index(Request $req) {
        $page = $req->get('page', 1);
        $search = $req->get('search', '');
        $perPage = 50;

        $lines = array_column($this->rules(), 'raw');

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
        // 쉼표 기준으로 분리 후 각 단어 trim 하고 다시 합치기
        $keywords = implode(',', array_map('trim', explode(',', $request->keywords)));

        if ($this->set)
            $this->es('PUT', "/_synonyms/{$this->set}/" . md5($keywords), ['synonyms' => $keywords]);
        else
            file_put_contents($this->filePath, "\n" . $keywords, FILE_APPEND);
        return response()->json(['success' => true]);
    }

    public function update(Request $request, $id) {
        $oldKeyword = trim($request->old_keyword);
        $newKeyword = implode(',', array_map('trim', explode(',', $request->keyword)));

        if ($this->set) {
            if ($rule = collect($this->rules())->firstWhere('raw', $oldKeyword))
                $this->es('PUT', "/_synonyms/{$this->set}/{$rule['id']}", ['synonyms' => $newKeyword]);
            return response()->json(['success' => true]);
        }

        $lines = $this->getLines();
        $lines = array_map(function($line) use ($oldKeyword, $newKeyword) {
            return trim($line) === trim($oldKeyword) ? $newKeyword : $line;
        }, $lines);

        file_put_contents($this->filePath, implode("\n", $lines));
        return response()->json(['success' => true]);
    }

    // 삭제
    public function destroy(Request $request, $id) {
        $keyword = $request->get('keyword'); // Vue에서 raw 값 넘겨줘야 함

        if ($this->set) {
            if ($rule = collect($this->rules())->firstWhere('raw', trim($keyword)))
                $this->es('DELETE', "/_synonyms/{$this->set}/{$rule['id']}");
            return response()->json(['success' => true]);
        }

        $lines = $this->getLines();
        $lines = array_filter($lines, fn($line) => !empty(trim($line)));
        $lines = array_values($lines);

        // id 가 아니라 실제 내용으로 찾아서 삭제
        $lines = array_values(array_filter($lines, fn($line) => trim($line) !== trim($keyword)));

        file_put_contents($this->filePath, implode("\n", $lines));
        return response()->json(['success' => true]);
    }

    // ES reload (동의어 세트는 저장할 때 자동 반영 - 눌러도 문제없음)
    public function reload() {
        $response = $this->es('POST', '/' . GoodsElasticSearch::index() . '/_reload_search_analyzers', null, false);

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

    //  txt로 내려받기 (백업용)
    public function download() {
        return response(implode("\n", array_column($this->rules(), 'raw')) . "\n", 200, [
            'Content-Type'        => 'text/plain; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="synonyms_' . GoodsElasticSearch::index() . '_' . date('Ymd') . '.txt"',
        ]);
    }

    //  동의어 줄 목록 [['id' => 규칙 번호(세트만), 'raw' => "피펫, pipette"], ...] - 빈 줄·주석(#) 제외
    private function rules(): array {
        if ($this->set)
            return collect($this->es('GET', "/_synonyms/{$this->set}?size=10000")->json('synonyms_set') ?? [])
                ->map(fn($r) => ['id' => $r['id'], 'raw' => trim($r['synonyms'])])->all();

        return collect($this->getLines())->map(fn($l) => trim($l))
            ->filter(fn($l) => $l !== '' && $l[0] !== '#')
            ->map(fn($l) => ['id' => null, 'raw' => $l])->values()->all();
    }

    //  ES 요청 - 실패하면 예외 (화면에 오류 표시)
    private function es(string $method, string $path, ?array $body = null, bool $throw = true) {
        $res = \Http::withBasicAuth($this->esUser, $this->esPassword)
            ->withoutVerifying()
            ->send($method, $this->esHost . $path, $body === null ? [] : ['json' => $body]);
        return $throw ? $res->throw() : $res;
    }

    private function getLines() {
        $content = file_get_contents($this->filePath);
        return explode("\n", $content);
    }
}