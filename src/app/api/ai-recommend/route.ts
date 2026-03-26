import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const FEED_ITEMS = [
  { id: "1", title: "감성 캔들 세트", category: "me" },
  { id: "2", title: "플라워 리스", category: "friend" },
  { id: "3", title: "핸드메이드 머그컵", category: "family" },
  { id: "4", title: "디퓨저 세트", category: "friend" },
  { id: "5", title: "수제 초콜릿", category: "family" },
  { id: "6", title: "캘리그라피 엽서", category: "friend" },
  { id: "7", title: "핸드메이드 비누", category: "me" },
  { id: "8", title: "아로마 오일", category: "friend" },
  { id: "9", title: "수제 향초", category: "family" },
  { id: "10", title: "플라워 박스", category: "me" },
  { id: "11", title: "디자인 노트", category: "family" },
  { id: "12", title: "핸드메이드 주얼리", category: "me" },
];

export async function POST(request: NextRequest) {
  try {
    const { situation, preference, gender, budget } = await request.json();

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const feedList = FEED_ITEMS.map(
      (item) => `ID:${item.id} | 상품명:${item.title}`
    ).join("\n");

    const prompt = `당신은 선물 추천 전문가입니다. 아래 조건에 맞는 선물을 추천해주세요.

[선물 조건]
- 상황: ${situation ?? "상관없음"}
- 취향: ${preference ? preference.join(", ") : "상관없음"}
- 성별: ${gender ?? "상관없음"}
- 예산: ${budget ?? "상관없음"}

[추천 가능한 상품 목록]
${feedList}

위 상품 목록에서 조건에 가장 잘 맞는 상품 3개를 선택해주세요.
반드시 아래 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.

{"recommended_ids": ["ID1", "ID2", "ID3"], "reason": "추천 이유 한 문장"}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    });

    const content = completion.choices[0].message.content ?? "";

    let result: { recommended_ids: string[]; reason: string };
    try {
      result = JSON.parse(content);
    } catch {
      // JSON 파싱 실패 시 기본값
      result = {
        recommended_ids: ["1", "4", "10"],
        reason: "선물 조건에 맞는 상품을 추천했습니다.",
      };
    }

    // 추천된 ID의 상세 정보 포함
    const recommendedItems = result.recommended_ids
      .map((id) => FEED_ITEMS.find((item) => item.id === id))
      .filter(Boolean);

    return NextResponse.json({
      items: recommendedItems,
      reason: result.reason,
    });
  } catch (error) {
    console.error("AI 추천 오류:", error);
    // API 키 없거나 오류 시 fallback
    return NextResponse.json({
      items: [
        { id: "1", title: "감성 캔들 세트", category: "me" },
        { id: "4", title: "디퓨저 세트", category: "friend" },
        { id: "10", title: "플라워 박스", category: "me" },
      ],
      reason: "감각적인 라이프스타일 선물을 추천드립니다.",
    });
  }
}
