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

            너는 기업용 제품 소개 페이지를 작성하는 전문 콘텐츠 기획자이며 또한 쇼핑몰 상세페이지를 만드는 UI 디자이너다.

            단순한 쇼핑몰 설명이 아니라
            '기업 소개서 수준의 상세페이지 HTML'을 생성하라.

            [중요 제한]
            - ``` 금지
            - <html>, <head>, <style> 금지
            - 모든 스타일은 인라인으로 작성

            ## 출력 형식 규칙

            모든 분석 결과는 아래 구조와 마크다운 형식을 반드시 따른다.

            ### 구조 규칙
            1. 최상단에 `[분석 주제]` 형식의 제목을 작성한다.
            2. 각 섹션은 `1. 섹션명**`, `2. 섹션명**` 형식의 번호 제목으로 구분한다.
            3. 단락형 내용은 들여쓰기 없이 일반 텍스트로 작성한다.
            4. 열거형 내용은 `•` 또는 `-` 불릿 포인트로 나열한다.
            5. 핵심 키워드나 강조 표현은 **굵게** 처리한다.

            ### 섹션 구성 (기업 분석의 경우)
            1. 한줄 요약** — 기업의 핵심을 1~2문장으로 압축
            2. 제품의 사양과 핵심 기술을 불릿으로 나열
            3. 경쟁 우위 포인트** — 차별화 요소를 불릿으로 3~5개 작성
            4. 적용 산업** — 해당 제품/기술이 쓰이는 산업군을 불릿으로 나열

            ### 문체 규칙
            - 간결하고 명확한 명사형 종결 사용 (예: '~기술 보유.', '~시장 진출.')
            - 불필요한 수식어 제거, 사실 중심으로 작성
            - 각 불릿은 1~3줄 이내로 유지
            - 전체 분량은 500~900자 내외로 조절

            [디자인 요구]
            - 너무 단순한 문서 금지
            - 사용자 가독성 최우선
            - 설명은 충분히 자세하게 작성

            [출력 규칙]
            - ```html 금지
            - ``` 금지
            - 설명 금지
            - 순수 HTML만 출력

            [중요]
            - 반드시 이모지 포함
            - 반드시 보기 좋게 작성
            - 검색결과물의 가격이나 판매처 정보는 제외하고 작성
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