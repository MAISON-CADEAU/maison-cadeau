# 기여 가이드 (Contributing Guide)

## 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/your-org/gift-curator.git
cd gift-curator

# 의존성 설치
pnpm install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일에 실제 값 입력

# 개발 서버 실행
pnpm dev
```

## 브랜치 전략

- `main` - 배포용 브랜치 (자동 배포)
- `develop` - 개발 통합 브랜치
- `feature/*` - 기능 개발 브랜치
- `fix/*` - 버그 수정 브랜치
- `hotfix/*` - 긴급 수정 브랜치

## 작업 흐름

### 1. 이슈 생성
작업 전 반드시 이슈를 먼저 생성해주세요.

### 2. 브랜치 생성
```bash
# develop 브랜치에서 시작
git checkout develop
git pull origin develop

# 새 브랜치 생성
git checkout -b feature/기능명
# 예: git checkout -b feature/login-page
```

### 3. 작업 및 커밋
```bash
# 변경사항 스테이징
git add .

# 커밋 (컨벤션 준수)
git commit -m "feat: 로그인 페이지 구현"
```

### 4. PR 생성
```bash
# 원격 저장소에 푸시
git push origin feature/기능명
```
GitHub에서 PR 생성 → 코드 리뷰 요청

### 5. 코드 리뷰 & 머지
- 최소 1명 이상의 승인 필요
- CI 통과 필수
- 승인 후 머지

## 커밋 메시지 컨벤션

```
타입: 제목

본문 (선택)
```

### 타입
- `feat` - 새로운 기능 추가
- `fix` - 버그 수정
- `docs` - 문서 수정
- `style` - 코드 포맷팅 (기능 변화 없음)
- `refactor` - 코드 리팩토링
- `test` - 테스트 추가/수정
- `chore` - 빌드, 설정 파일 수정

### 예시
```
feat: 카카오 로그인 기능 추가

- 카카오 SDK 연동
- 로그인 버튼 컴포넌트 생성
- 인증 콜백 처리
```

## 코드 스타일

- ESLint 규칙 준수
- Prettier 자동 포맷팅
- 커밋 전 `pnpm lint` 확인

## 폴더 구조

```
src/
├── app/              # Next.js App Router 페이지
├── components/       # 컴포넌트
│   ├── common/       # 공통 컴포넌트
│   ├── domain/       # 도메인별 컴포넌트
│   └── layout/       # 레이아웃 컴포넌트
├── features/         # 기능별 모듈
├── lib/              # 유틸리티, 설정
└── styles/           # 스타일 파일
```

## 질문이 있으면?

이슈에 `question` 라벨을 달아 질문해주세요!
