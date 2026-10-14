<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\GoodsElasticSearch;

//  검색 동의어 관리 - ES 동의어 세트(GoodsElasticSearch::SYNONYM_SET)를 편집, 저장하면 바로 검색에 반영
class SynonymController extends Controller {

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

        $this->es('PUT', '/_synonyms/' . GoodsElasticSearch::SYNONYM_SET . '/' . md5($keywords), ['synonyms' => $keywords]);
        return response()->json(['success' => true]);
    }

    public function update(Request $request, $id) {
        $oldKeyword = trim($request->old_keyword);
        $newKeyword = implode(',', array_map('trim', explode(',', $request->keyword)));

        if ($rule = collect($this->rules())->firstWhere('raw', $oldKeyword))
            $this->es('PUT', '/_synonyms/' . GoodsElasticSearch::SYNONYM_SET . "/{$rule['id']}", ['synonyms' => $newKeyword]);
        return response()->json(['success' => true]);
    }

    // 삭제
    public function destroy(Request $request, $id) {
        $keyword = $request->get('keyword'); // Vue에서 raw 값 넘겨줘야 함

        if ($rule = collect($this->rules())->firstWhere('raw', trim($keyword)))
            $this->es('DELETE', '/_synonyms/' . GoodsElasticSearch::SYNONYM_SET . "/{$rule['id']}");
        return response()->json(['success' => true]);
    }

    // ES reload (동의어 세트는 저장할 때 자동 반영 - 눌러도 문제없음)
    public function reload() {
        $response = $this->es('POST', '/' . GoodsElasticSearch::INDEX . '/_reload_search_analyzers', null, false);

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

    //  txt로 내려받기 (백업용 - ES를 새로 만들 때 search:rebuild --synonyms로 다시 넣을 수 있음)
    public function download() {
        return response(implode("\n", array_column($this->rules(), 'raw')) . "\n", 200, [
            'Content-Type'        => 'text/plain; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="synonyms_' . GoodsElasticSearch::SYNONYM_SET . '_' . date('Ymd') . '.txt"',
        ]);
    }

    //  동의어 줄 목록 [['id' => 규칙 번호, 'raw' => "피펫, pipette"], ...]
    private function rules(): array {
        return collect($this->es('GET', '/_synonyms/' . GoodsElasticSearch::SYNONYM_SET . '?size=10000')->json('synonyms_set') ?? [])
            ->map(fn($r) => ['id' => $r['id'], 'raw' => trim($r['synonyms'])])->all();
    }

    //  ES 요청 - 실패하면 예외 (화면에 오류 표시)
    private function es(string $method, string $path, ?array $body = null, bool $throw = true) {
        $res = GoodsElasticSearch::http()->send($method, $path, $body === null ? [] : ['json' => $body]);
        return $throw ? $res->throw() : $res;
    }
}
