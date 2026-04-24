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

            [구성 - 반드시 순서대로]

            1. 제품 개요
            - 제품 설명 (3~5줄 이상)
            - 어떤 문제를 해결하는지

            2. 주요 특징
            - 번호 리스트 (1~5번)
            - 각 항목 설명 2줄 이상

            3. 구매 추천 포인트
            - bullet 4~6개
            - 실무 관점 설명

            4. 사양 요약
            - table 형식 (항목 / 내용)
            - 최소 5개 이상

            5. 고객 대상
            - 어떤 업종 / 어떤 사람
            - 리스트 형태

            6. 추가 정보
            - 신뢰 요소 (인증, 사용처 등)
            - 실제 활용 사례 느낌

            7. 제공 기능 (있으면)
            - 기능 / 설명 table

            아래 '스타일 예시'를 반드시 참고하여
            동일한 스타일과 구성으로 HTML을 생성하라.

            [스타일 규칙 - 매우 중요]
            - 각 섹션 제목 앞에 이모지 사용 (예: 📄 ⭐ 📊 🔬 ⚠️)
            - 제목은 h3 또는 h2 사용
            - 설명은 단락 2~3개로 나눔
            - 중요한 키워드는 <strong> 강조
            - 읽기 쉽게 줄바꿈 충분히 사용
            - 리스트는 가독성 있게 작성
            - 전체적으로 '설명서 + 쇼핑몰' 혼합 스타일

            [구성]
            1. 📄 제품 설명
            2. ⭐ 주요 특징
            3. 📊 제품 사양
            4. 🔬 활용 분야
            5. ⚠️ 주의사항

            [디자인 요구]
            - 너무 단순한 문서 금지
            - 사용자 가독성 최우선
            - 설명은 충분히 자세하게 작성

            [출력 규칙]
            - ```html 금지
            - ``` 금지
            - 설명 금지
            - 순수 HTML만 출력
            - 길게 작성 (최소 1500자 이상)

            [중요]
            - 반드시 이모지 포함
            - 반드시 보기 좋게 작성
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