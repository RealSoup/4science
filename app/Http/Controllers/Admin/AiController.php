<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AiController extends Controller {
    public function req_desc(Request $req) {
        $keyword = trim($req->keyword);

        if (!$keyword) {
            return response()->json([
                'error' => 'keyword required'
            ], 400);
        }

        $prompt = "
            상품명: {$keyword}

            너는 쇼핑몰 상세페이지 UI 디자이너다.

            아래 조건에 맞춰 HTML을 생성하라.

            [중요 제한]
            - <html>, <head>, <body>, <style> 절대 사용 금지
            - 모든 스타일은 인라인 스타일로 작성
            - section, div, table, ul 등만 사용

            [구성]
            1. 상단 헤더
            2. 주요 특징 (카드형)
            3. 구매 포인트
            4. 제품 사양 (table)
            5. 고객 대상
            6. 추가 정보

            [디자인 요구]
            - border-radius
            - padding 충분히
            - box-shadow 사용
            - background-color 활용
            - 보기 좋게 카드 UI 구성

            [출력 규칙]
            - ```html 금지
            - ``` 금지
            - 설명 금지
            - 순수 HTML만 출력
            ";

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
            ])->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o-mini',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => $prompt
                    ]
                ],
                'temperature' => 0.7,
            ]);

            if (!$response->successful()) {
                return response()->json([
                    'error' => 'OpenAI error',
                    'detail' => $response->body()
                ], 500);
            }

            $content = $response->json()['choices'][0]['message']['content'] ?? '';

            return response()->json([
                'html' => $content
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'server error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}