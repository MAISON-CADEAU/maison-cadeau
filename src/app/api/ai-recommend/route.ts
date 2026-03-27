import { NextRequest, NextResponse } from "next/server";

interface PriceRange {
  min: number | null;
  max: number | null;
}

const BUDGET_PRICE_RANGE: Record<string, PriceRange> = {
  "만원 이하":              { min: null,    max: 10000   },
  "만원이상 ~ 3만원 이하":  { min: 10000,   max: 30000   },
  "3만원 이상 ~ 5만원 이하":{ min: 30000,   max: 50000   },
  "10만원 이하":            { min: null,    max: 100000  },
  "10~20만원대":            { min: 100000,  max: 200000  },
  "20~30만원대":            { min: 200000,  max: 300000  },
  "30~50만원대":            { min: 300000,  max: 500000  },
  "100만원 이하":           { min: null,    max: 1000000 },
  "100만원 이상":           { min: 1000000, max: null    },
  "금액 상관없어요":         { min: null,    max: null    },
};

// Gemini REST API (v1) 직접 호출 - SDK v1beta 문제 우회
async function generateKeywordsWithAI(
  situation: string | null,
  preference: string[] | string | null,
  gender: string | null,
  budget: string | null,
  priceRange: PriceRange
): Promise<{ keywords: string[]; reason: string }> {
  const prefs = Array.isArray(preference) ? preference : preference ? [preference] : [];
  const priceLabel = priceRange.min && priceRange.max
    ? `${priceRange.min.toLocaleString()}원 ~ ${priceRange.max.toLocaleString()}원`
    : priceRange.max
    ? `${priceRange.max.toLocaleString()}원 이하`
    : priceRange.min
    ? `${priceRange.min.toLocaleString()}원 이상`
    : "제한 없음";

  const prompt = `당신은 한국 네이버 쇼핑 검색 전문가입니다.
아래 조건에 맞는 선물을 네이버 쇼핑에서 검색할 수 있는 구체적인 검색 키워드 4개를 생성해주세요.

[조건]
- 선물 상황: ${situation ?? "특별한 상황 없음"}
- 받는 사람 취향: ${prefs.length > 0 ? prefs.join(", ") : "특별한 취향 없음"}
- 받는 사람 성별: ${gender ?? "무관"}
- 예산: ${budget ?? "제한 없음"} (실제 가격 기준 ${priceLabel})

[키워드 생성 규칙]
1. 네이버 쇼핑에서 실제로 검색 가능한 구체적인 단일 상품명으로 작성 (예: "에어팟 프로 2세대", "다이슨 에어랩")
2. 반드시 예산 범위(${priceLabel}) 안에서 구매 가능한 실제 제품이어야 함
3. 키워드 4개는 서로 다른 카테고리의 선물이어야 함
4. 취향과 성별을 최우선으로 반영할 것
5. 복합 단어보다 명확한 상품명 위주로 작성 (예: "블루투스 이어폰" O, "블루투스 이어폰 스마트기기" X)
6. 한국어로 작성

[응답 형식 - JSON만 출력, 다른 텍스트 없이]
{"keywords": ["키워드1", "키워드2", "키워드3", "키워드4"], "reason": "추천 이유 한 문장 (50자 이내)"}`;

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini REST API 오류 ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Gemini 응답 파싱 실패: " + text);

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    keywords: parsed.keywords?.slice(0, 4) ?? [],
    reason: parsed.reason ?? "센스 있는 선물을 추천드립니다.",
  };
}

// Gemini 실패 시 규칙 기반 fallback (단일 키워드로 수정)
function generateKeywordsFallback(
  situation: string | null,
  preference: string[] | string | null,
  gender: string | null,
  priceRange: PriceRange
): { keywords: string[]; reason: string } {
  const { min } = priceRange;

  // 가격대별 테크기기 키워드 예시 (취향별로 분기)
  const PREF_MAP_LOW: Record<string, string>  = {
    "테크기기 덕후":        "블루투스 이어폰",
    "음악을 좋아하는":      "블루투스 스피커",
    "귀여운/러블리한":      "캐릭터 소품",
    "심플한/실용적인":      "생활 소품",
    "우아한/고급스러운":    "향수",
    "힙한/트렌디한":       "패션 잡화",
    "홈카페러버":          "커피 용품",
    "건강한/운동을 좋아하는":"헬스 용품",
    "반려동물 집사":       "반려동물 간식",
    "아웃도어/자연친화적":  "캠핑 용품",
    "음식/요리를 좋아하는": "주방 용품",
    "여행을 좋아하는":     "여행 소품",
  };
  const PREF_MAP_HIGH: Record<string, string> = {
    "테크기기 덕후":        min && min >= 300000 ? "삼성 갤럭시버즈" : "애플워치",
    "음악을 좋아하는":      min && min >= 300000 ? "소니 헤드폰" : "블루투스 스피커",
    "건강한/운동을 좋아하는": "스마트워치",
    "아웃도어/자연친화적":  "캠핑 장비",
    "홈카페러버":          "커피머신",
    "음식/요리를 좋아하는": "에어프라이어",
  };

  const isHighBudget = min && min >= 100000;
  const PREF_MAP = isHighBudget ? { ...PREF_MAP_LOW, ...PREF_MAP_HIGH } : PREF_MAP_LOW;

  const SITU_MAP: Record<string, string> = {
    "생일선물": "생일 선물", "집들이 선물": "인테리어 소품",
    "연인·배우자에게": "커플 선물", "졸업선물": "졸업 선물",
    "직장동료에게": "사무용품", "부모님께 드리는": "건강식품",
    "어버이날": "건강식품", "스승의 날": "문구 소품",
  };

  const prefs = Array.isArray(preference) ? preference : preference ? [preference] : [];
  const keywords: string[] = [];

  for (const p of prefs.slice(0, 2)) {
    if (PREF_MAP[p]) keywords.push(PREF_MAP[p]);
  }
  if (situation && SITU_MAP[situation]) keywords.push(SITU_MAP[situation]);
  if (gender === "여성") keywords.push("여성 뷰티");
  if (gender === "남성") keywords.push("남성 지갑");

  const defaults = isHighBudget
    ? ["스마트기기", "명품 지갑", "고급 향수", "프리미엄 가방"]
    : ["감성 소품", "디퓨저", "머그컵", "캔들"];
  let di = 0;
  while (keywords.length < 4) keywords.push(defaults[di++ % defaults.length]);

  const prefs0 = prefs[0] ?? "";
  const reason = [situation, prefs0, gender ? `${gender}에게 어울리는` : ""]
    .filter(Boolean).join(", ") + " 선물로 딱 맞는 아이템을 골랐어요.";

  return { keywords: keywords.slice(0, 4), reason };
}

function stripHtml(str: string) {
  return str.replace(/<[^>]*>/g, "");
}

async function searchNaverShopping(
  keyword: string,
  priceRange: PriceRange
): Promise<{ title: string; image: string; price: string; link: string; mallName: string } | null> {
  const { min, max } = priceRange;

  // min >= 100,000: 내림차순(dsc)으로 고가 상품부터 탐색
  // max만 있거나 소액: 오름차순(asc)으로 저가부터 탐색
  // 제한 없음: 유사도순(sim)
  let sort = "sim";
  if (min && min >= 100000) sort = "dsc";
  else if (max) sort = "asc";

  const params = new URLSearchParams({ query: keyword, display: "100", sort });

  const res = await fetch(`https://openapi.naver.com/v1/search/shop.json?${params}`, {
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`[Naver API] ${res.status} - "${keyword}" - ${errText}`);
    return null;
  }

  const data = await res.json();
  const allItems = data.items ?? [];

  // lprice는 최저가 판매자 기준이라 실제 소비자가보다 20~30% 낮을 수 있음
  // → 최솟값에 70% 허용치 적용 (예: 30만원 이상 → 21만원 이상으로 필터)
  const filterMin = min ? Math.floor(min * 0.7) : null;
  const filtered = allItems.filter((it: { lprice: string }) => {
    const price = Number(it.lprice);
    if (filterMin && price < filterMin) return false;
    if (max && price > max) return false;
    return true;
  });

  const rangeLabel = `${filterMin ? filterMin.toLocaleString("ko-KR") + "원(lprice기준)" : "0원"} ~ ${max ? max.toLocaleString("ko-KR") + "원" : "제한없음"}`;
  console.log(`[Naver] "${keyword}" → 전체 ${allItems.length}개 중 예산(${rangeLabel}) 내 ${filtered.length}개`);

  const item = filtered[0];
  if (!item) {
    console.warn(`[Naver] "${keyword}" → 예산 범위 내 상품 없음`);
    return null;
  }

  const rawPrice = Number(item.lprice);
  console.log(`[Naver] 선택: "${stripHtml(item.title)}" - ${rawPrice.toLocaleString("ko-KR")}원`);

  return {
    title: stripHtml(item.title),
    image: item.image,
    price: rawPrice.toLocaleString("ko-KR") + "원",
    link: item.link,
    mallName: item.mallName,
  };
}

export async function POST(request: NextRequest) {
  try {
    const { situation, preference, gender, budget } = await request.json();
    const priceRange: PriceRange = BUDGET_PRICE_RANGE[budget] ?? { min: null, max: null };

    console.log(`[추천] 입력 → 상황: "${situation}", 취향: ${JSON.stringify(preference)}, 성별: "${gender}", 예산: "${budget}"`);

    let keywords: string[];
    let reason: string;

    try {
      const result = await generateKeywordsWithAI(situation, preference, gender, budget, priceRange);
      keywords = result.keywords;
      reason = result.reason;
      console.log(`[Gemini] 키워드: ${JSON.stringify(keywords)}`);
    } catch (aiError) {
      console.warn("[Gemini] 실패, fallback 사용:", aiError);
      const fallback = generateKeywordsFallback(situation, preference, gender, priceRange);
      keywords = fallback.keywords;
      reason = fallback.reason;
      console.log(`[Fallback] 키워드: ${JSON.stringify(keywords)}`);
    }

    const productResults = await Promise.all(
      keywords.map((keyword) => searchNaverShopping(keyword, priceRange))
    );

    const items = productResults
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .map((item, index) => ({ id: String(index + 1), ...item }));

    return NextResponse.json({ items, reason });
  } catch (error) {
    console.error("추천 오류:", error);
    return NextResponse.json(
      { error: "추천을 가져오는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
