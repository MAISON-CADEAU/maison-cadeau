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

// Groq API 호출 (llama-3.3-70b, 무료 티어)
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
아래 조건에 맞는 선물을 네이버 쇼핑에서 검색할 수 있는 키워드 4개를 생성해주세요.

[조건]
- 선물 상황: ${situation ?? "특별한 상황 없음"}
- 받는 사람 취향: ${prefs.length > 0 ? prefs.join(", ") : "특별한 취향 없음"}
- 받는 사람 성별: ${gender ?? "무관"}
- 예산: ${budget ?? "제한 없음"} (실제 판매가 기준 ${priceLabel})

[키워드 생성 규칙]
1. 반드시 실제 한국 네이버 쇼핑에서 판매 중인 상품 기준으로 작성
2. 예산(${priceLabel}) 안에서 실제로 구매 가능한 상품이어야 함 — 이 규칙이 가장 중요
3. 브랜드명 또는 카테고리 단어 1~3개 조합 (예: "카시오 시계", "바디로션 선물세트", "무선 이어폰")
4. 형용사 수식어 최소화 ("빈티지 로즈골드 시계" X → "카시오 빈티지 시계" O)
5. 키워드 4개는 서로 다른 카테고리여야 함
6. 취향과 성별을 반영할 것
7. 한국어로 작성

[예산별 키워드 예시]
- 1~3만원: "향초 선물세트", "핸드크림 선물세트", "텀블러", "양말 선물세트"
- 3~5만원: "무선 이어폰", "디퓨저 선물세트", "스킨케어 선물세트", "캐시미어 머플러"
- 10~20만원: "카시오 시계", "블루투스 스피커", "가죽 지갑", "향수 선물세트"
- 20~30만원: "다이슨 헤어드라이어", "에어팟", "명품 지갑", "스마트워치"
- 30~50만원: "애플워치", "삼성 갤럭시버즈 프로", "다이슨 에어랩", "루이비통 카드지갑"

[응답 형식 - JSON만 출력, 다른 텍스트 없이]
{"keywords": ["키워드1", "키워드2", "키워드3", "키워드4"], "reason": "추천 이유 한 문장 (50자 이내)"}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 512,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API 오류 ${res.status}: ${err}`);
  }

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Groq 응답 파싱 실패: " + text);

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    keywords: parsed.keywords?.slice(0, 4) ?? [],
    reason: parsed.reason ?? "센스 있는 선물을 추천드립니다.",
  };
}

// Groq 실패 시 규칙 기반 fallback
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

  let sort = "sim";
  if (max) sort = "asc";
  else if (min) sort = "dsc";

  const filterMin = min ? Math.floor(min * 0.7) : null;
  const rangeLabel = `${filterMin ? filterMin.toLocaleString("ko-KR") + "원" : "0원"} ~ ${max ? max.toLocaleString("ko-KR") + "원" : "제한없음"}`;

  // 매칭 상품 없으면 start 파라미터로 페이지네이션 (최대 3페이지 = 300개)
  for (let page = 0; page < 3; page++) {
    const params = new URLSearchParams({
      query: keyword,
      display: "100",
      start: String(page * 100 + 1),
      sort,
    });
    if (min) params.set("s_price", String(filterMin!));
    if (max) params.set("d_price", String(max));

    const res = await fetch(`https://openapi.naver.com/v1/search/shop.json?${params}`, {
      headers: {
        "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID!,
        "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET!,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Naver] ${res.status} - "${keyword}" - ${errText}`);
      return null;
    }

    const data = await res.json();
    const allItems: { lprice: string; title: string; image: string; link: string; mallName: string }[] = data.items ?? [];

    if (allItems.length === 0) break; // 더 이상 결과 없음

    const filtered = allItems.filter((it) => {
      const price = Number(it.lprice);
      if (filterMin && price < filterMin) return false;
      if (max && price > max) return false;
      return true;
    });

    console.log(`[Naver] "${keyword}" p${page + 1} → ${allItems.length}개 중 예산(${rangeLabel}) 내 ${filtered.length}개`);

    const item = filtered[0];
    if (item) {
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
  }

  console.warn(`[Naver] "${keyword}" → 3페이지(300개) 탐색 후에도 예산 범위 내 상품 없음`);
  return null;
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
      console.log(`[Groq] 키워드: ${JSON.stringify(keywords)}`);
    } catch (aiError) {
      console.warn("[Groq] 실패, fallback 사용:", aiError);
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
