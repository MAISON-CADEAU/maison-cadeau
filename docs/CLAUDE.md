# CLAUDE.md

## 프로젝트 개요
MAISON CADEAU (메종카도) - 센스 있는 선물 큐레이션 플랫폼

## 기술 스택
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS
- **State Management**: Zustand
- **Server State**: TanStack React Query
- **Form**: React Hook Form + Zod
- **Database & Auth**: Supabase
- **Animation**: Framer Motion, Lottie

## 버전
- Node: v22.15.1
- pnpm: v10.14.0

---

## 코드 컨벤션

### 네이밍 규칙

#### 변수/함수/클래스
| 종류 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트, 클래스, 타입 | PascalCase | `GiftCard`, `UserProfile` |
| 인터페이스 | I 접두사 + PascalCase | `IFormRepository`, `IUserData` |
| 훅 | use 접두사 + camelCase | `useAuth`, `useScrap` |
| 그 외 변수/함수 | camelCase | `giftList`, `handleClick` |
| HTML class/id | snake_case | `gift_card`, `main_header` |

#### 파일명
| 종류 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트, DTO, Entity | PascalCase | `GiftCard.tsx`, `CreateTodo.dto.ts` |
| 이미지, 정적 파일, 라우팅 폴더 | kebab-case | `gift-image.png`, `my-page` |
| 동적 라우팅 폴더 | camelCase | `[giftId]` |
| 그 외 | camelCase | `formatPrice.ts` |
| 긴 파일명 | dot notation 사용 | `createTodo.usecase.ts`, `todo.test.ts` |

### 함수 선언
- 페이지/레이아웃 컴포넌트: `function` 선언 (Next.js 공식 컨벤션)
- 그 외: 화살표 함수

```tsx
// 페이지/레이아웃
export default function RootLayout() {}

// 그 외 컴포넌트
const Modal = () => {};
```

### Import/Export 규칙
- `export default` 대신 `export const` 사용
- 컴포넌트 폴더는 `index.ts`로 재export
- 1뎁스(`../`) 넘어가면 `@` alias 사용

```tsx
// Good
import { Input } from "@/components/common/Input";
import { Input } from "./Input";

// Bad
import { Input } from "../../components/common/Input";
```

### Lint 규칙
- `var` 사용 금지
- Double Quote(`""`) 사용
- 세미콜론 허용
- 템플릿 리터럴 허용

### 시맨틱 태그
- 페이지 최상위: `<main>` 태그 사용
- `<section>` 내에 반드시 제목 태그 포함
- 헤더 메인로고: `<h1>`과 `<a>`로 감싸기

---

## 브랜치 전략

| 종류 | 사용 패턴 | 특징 |
|------|----------|------|
| main | `main` | 프로덕션 배포 버전 |
| dev | `dev` | 개발 통합 브랜치 (기본 브랜치) |
| feature | `feature/component_이름` 또는 `feature/page_이름` | dev에 병합 |
| issue | `issue/이슈명(PascalCase)` | dev에 병합 |
| hotfix | `hotfix/핫픽스명(PascalCase)` | main에 병합 |

### Feature 브랜치 예시
```bash
feature/component_GiftCard
feature/page_Feed
feature/hook_useAuth
feature/api_gifts
```

---

## 커밋 컨벤션

### 형식
```
타입: 제목 (70자 이내, 끝에 . 금지)

본문 (선택)
```

### 타입
| 타입 | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `merge` | 브랜치 병합 |
| `style` | 코드 스타일 변경 (기능 영향 없음) |
| `refactor` | 코드 리팩토링 |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 환경 설정, 빌드 프로세스 변경 |
| `init` | 프로젝트 초기화 |
| `build` | 빌드 관련 변경 |
| `ci` | CI 설정 파일 변경 |
| `schema` | DB 스키마 변경 |
| `migration` | DB 마이그레이션 |
| `release` | 버전 배포 (main PR 전 최종 커밋에만 사용) |

### 예시
```bash
feat: 사용자 로그인 기능 구현

- 로그인 폼 구현
- 스타일 수정
```

```bash
release: v1.2.4 버전 배포

- 바뀐내용
- 바뀐내용2
```

---

## PR 규칙

### PR 제목
```
타입 / 브랜치명 - 간단한 작업내용
```

### PR 본문
- 반영 브랜치 명시
- PR 타입 체크 (기능 추가/삭제, 버그 수정, 환경 변수 등)
- 작업 내용 설명
- 테스트 결과/스크린샷 (선택)
- 리뷰 요구사항 (선택)

### PR 본문 템플릿
```markdown
## 작업 내용
[작업에 대한 간략한 설명]

## 변경 사항
- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] UI/UX 개선
- [ ] 리팩토링
- [ ] 문서 수정

✅ [주요 섹션명]
* [세부 변경 내용]
* [세부 변경 내용]

## 스크린샷 (선택)

## 테스트 체크리스트
- [ ] 로컬에서 정상 동작 확인
- [ ] 빌드 에러 없음 (`pnpm build`)
- [ ] 린트 에러 없음 (`pnpm lint`)
- [ ] [기능별 추가 확인 항목]

## 관련 이슈
```

### 리뷰 규칙
- 최소 1명의 Approve 필요
- Comment는 코드 외 리뷰에만 사용
- Start a review로 임시저장 후 submit

---

## 팀 규칙

### To Do
- 모든 PR은 팀원들과 사전/사후 대화를 통해 진행
- 이견 발생 시 다수결로 진행
- 질문을 부담스러워하지 않기
- 작업 진행 상황 정기적으로 공유
- 코드 리뷰는 "대화" 중심으로 진행
- TASK/FEATURE ISSUE 발생 시 우선 해결

### Not To Do
- 논의 없이 push/merge 금지
- 정해진 시간 약속 준수
- 개인 감정 담긴 피드백 지양
- 다른 팀원 작업 무단 수정 금지

---

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 인증 페이지
│   ├── (main)/            # 메인 페이지들
│   └── api/               # API Routes
├── components/
│   ├── common/            # 공통 컴포넌트
│   ├── domain/            # 도메인별 컴포넌트
│   └── layout/            # 레이아웃 컴포넌트
├── features/              # 기능별 모듈
├── lib/                   # 라이브러리 설정
│   ├── supabase/          # Supabase 클라이언트
│   └── utils/             # 유틸리티 함수
├── styles/                # SCSS 스타일
├── types/                 # TypeScript 타입 정의
└── constants/             # 상수
```
