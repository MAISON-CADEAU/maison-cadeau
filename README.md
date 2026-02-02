# MAISON CADEAU (메종카도)

센스 있는 선물 큐레이션 플랫폼

## 프로젝트 소개

MAISON CADEAU는 AI 기반 선물 추천, 트렌디한 선물 피드, 스크랩 기능을 제공하는 선물 큐레이션 서비스입니다.

## 기술 스택

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Form**: React Hook Form + Zod
- **Animation**: Framer Motion, Lottie

### Backend
- **Database & Auth**: Supabase
- **API**: Next.js API Routes

### 주요 라이브러리
- `@tanstack/react-query` - 서버 상태 관리
- `@supabase/ssr` - Supabase SSR 지원
- `html2canvas` - 이미지 저장/공유
- `date-fns` - 날짜 처리

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 입력하세요:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI (AI 추천용)
OPENAI_API_KEY=your_openai_api_key

# Kakao
NEXT_PUBLIC_KAKAO_APP_KEY=your_kakao_app_key
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 페이지 (로그인, 회원가입)
│   ├── (main)/            # 메인 페이지들
│   │   ├── feed/          # 선물 피드
│   │   ├── ai-recommend/  # AI 추천
│   │   ├── scraps/        # 스크랩
│   │   ├── fortune/       # 포춘쿠키
│   │   └── my-page/       # 마이페이지
│   └── api/               # API Routes
│
├── components/
│   ├── common/            # 공통 컴포넌트 (Button, Input 등)
│   ├── layout/            # 레이아웃 (Header, Footer)
│   └── domain/            # 도메인별 컴포넌트
│
├── features/              # 비즈니스 로직
│   ├── auth/              # 인증 관련
│   ├── gift/              # 선물 관련
│   ├── scrap/             # 스크랩 관련
│   └── ...
│
├── lib/                   # 라이브러리 설정
│   ├── supabase/          # Supabase 클라이언트
│   └── utils/             # 유틸리티 함수
│
├── types/                 # TypeScript 타입 정의
└── constants/             # 상수
```

## 주요 기능

### 1. 인증
- 이메일 로그인/회원가입
- 카카오 소셜 로그인

### 2. 선물 피드
- 카테고리별 선물 탐색
- 무한 스크롤
- 선물 상세 정보

### 3. AI 선물 추천
- 키워드 기반 맞춤 추천
- 연령대, 성별, 스타일, 예산 선택

### 4. 스크랩
- 선물 저장
- 나만의 컬렉션 만들기

### 5. 포춘쿠키
- 하루 1회 운세 확인
- 공유 기능

## 카카오 로그인 설정

### Kakao Developers 설정
1. https://developers.kakao.com 에서 앱 생성
2. **앱 → 플랫폼 키 → REST API 키 수정**
3. **카카오 로그인 리다이렉트 URI** 등록:
   ```
   https://[YOUR_SUPABASE_URL].supabase.co/auth/v1/callback
   ```
4. **클라이언트 시크릿** 활성화 및 코드 복사
5. **제품 설정 → 카카오 로그인 → 동의항목** 설정:
   - 닉네임: 필수 동의
   - 프로필 사진: 선택 동의
   - 카카오계정(이메일): 선택 동의

### Supabase 설정
1. Authentication → Providers → Kakao
2. REST API Key 입력
3. Client Secret Code 입력
4. Enable Kakao 활성화

## 스크립트

```bash
pnpm dev       # 개발 서버 실행
pnpm build     # 프로덕션 빌드
pnpm start     # 프로덕션 서버 실행
pnpm lint      # ESLint 검사
```

## 라이선스

MIT License

---

© 2026 Gift Project. All Rights Reserved.
