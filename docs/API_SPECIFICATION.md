# ossref-web Backend API 명세서

> 작성일: 2026-03-29
> 프로젝트: ossref-web — 아키텍처를 참고할 수 있는 오픈소스 추천 서비스

---

## 1. 개요

ossref-web 프론트엔드는 현재 `src/api/mock.ts`에서 하드코딩된 Mock 데이터를 사용하고 있습니다.
실제 백엔드 API 연동을 위해 아래 엔드포인트들이 필요합니다.

**Base URL**: `/api` (또는 환경변수 `REACT_APP_API_BASE_URL`로 설정)

---

## 2. 데이터 모델

### 2.1 Repo (오픈소스 프로젝트)

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `id` | `number` | 고유 식별자 | `1` |
| `name` | `string` | 프로젝트 이름 | `"spring-petclinic"` |
| `owner` | `string` | GitHub owner | `"spring-projects"` |
| `desc` | `string` | 프로젝트 설명 | `"A sample Spring-based application"` |
| `stars` | `string` | GitHub 스타 수 | `"7.2k"` |
| `url` | `string` | GitHub URL | `"https://github.com/spring-projects/spring-petclinic"` |
| `fw` | `string` | 프레임워크 | `"spring"` |
| `arch` | `string` | 아키텍처 패턴 | `"layered"` |
| `lang` | `string` | 프로그래밍 언어 | `"Java"` |
| `commit` | `string` | 마지막 커밋 시점 | `"2주 전"` |
| `tree` | `string[]` | 주요 폴더 구조 | `["src/main/java/…", "…"]` |

### 2.2 필터 옵션 값

| 필터 | 허용 값 |
|------|---------|
| `fw` (Framework) | `all`, `spring`, `fastapi`, `express`, `nestjs` |
| `arch` (Architecture) | `all`, `layered`, `clean`, `hexagonal`, `mvc` |

---

## 3. API 엔드포인트

### 3.1 레포지토리 목록 조회

프론트엔드의 핵심 데이터 소스입니다. 현재 `fetchRepos(filters)` 함수가 이 역할을 Mock으로 수행하고 있습니다.

```
GET /api/repos
```

**Query Parameters**:

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|----------|------|------|--------|------|
| `fw` | `string` | N | `all` | 프레임워크 필터 |
| `arch` | `string` | N | `all` | 아키텍처 필터 |
| `q` | `string` | N | - | 검색어 (이름/설명 대상, 향후 확장용) |
| `page` | `number` | N | `1` | 페이지 번호 (향후 페이지네이션 대비) |
| `size` | `number` | N | `20` | 페이지당 항목 수 |

**응답 (200 OK)**:

```json
{
  "data": [
    {
      "id": 1,
      "name": "spring-petclinic",
      "owner": "spring-projects",
      "desc": "A sample Spring-based application",
      "stars": "7.2k",
      "url": "https://github.com/spring-projects/spring-petclinic",
      "fw": "spring",
      "arch": "layered",
      "lang": "Java",
      "commit": "2주 전",
      "tree": [
        "src/main/java/org/springframework/samples/petclinic/",
        "src/main/resources/",
        "src/test/"
      ]
    }
  ],
  "total": 42,
  "page": 1,
  "size": 20
}
```

---

### 3.2 필터 옵션 목록 조회

필터 드롭다운에 표시할 옵션들을 동적으로 가져옵니다. 현재는 `Filters.tsx`에 하드코딩되어 있습니다.

```
GET /api/filters
```

**응답 (200 OK)**:

```json
{
  "frameworks": [
    { "value": "all", "label": "전체" },
    { "value": "spring", "label": "Spring Boot" },
    { "value": "fastapi", "label": "FastAPI" },
    { "value": "express", "label": "Express" },
    { "value": "nestjs", "label": "NestJS" }
  ],
  "architectures": [
    { "value": "all", "label": "전체" },
    { "value": "layered", "label": "Layered" },
    { "value": "clean", "label": "Clean" },
    { "value": "hexagonal", "label": "Hexagonal" },
    { "value": "mvc", "label": "MVC" }
  ]
}
```

---

### 3.3 레포지토리 상세 조회

개별 프로젝트의 상세 정보를 조회합니다. 카드 클릭 시 상세 페이지 또는 모달에서 사용할 수 있습니다.

```
GET /api/repos/:id
```

**Path Parameters**:

| 파라미터 | 타입 | 설명 |
|----------|------|------|
| `id` | `number` | 레포지토리 고유 ID |

**응답 (200 OK)**:

```json
{
  "id": 1,
  "name": "spring-petclinic",
  "owner": "spring-projects",
  "desc": "A sample Spring-based application",
  "stars": "7.2k",
  "url": "https://github.com/spring-projects/spring-petclinic",
  "fw": "spring",
  "arch": "layered",
  "lang": "Java",
  "commit": "2주 전",
  "tree": ["src/main/java/…"],
  "readme": "# Spring PetClinic …",
  "topics": ["spring-boot", "java", "sample"],
  "license": "Apache-2.0",
  "contributors": 156,
  "forks": "1.8k",
  "archDescription": "전형적인 3-tier Layered Architecture로 Controller → Service → Repository 계층 구조를 따릅니다."
}
```

**응답 (404 Not Found)**:

```json
{
  "error": "NOT_FOUND",
  "message": "해당 레포지토리를 찾을 수 없습니다."
}
```

---

> **참고**: 프론트엔드 에러 로깅은 Sentry, Datadog RUM 등 전용 서비스를 사용하여 처리합니다.
> 현재 `src/utils/errorLogger.ts`에 백엔드 전송 코드가 있으나, 전용 서비스 연동으로 대체 예정입니다.

---

## 4. 향후 확장 가능 API

서비스 성장 시 추가로 필요할 수 있는 엔드포인트입니다.

### 4.1 GitHub 데이터 동기화 (관리자용)

등록된 레포지토리의 스타 수, 커밋 시점 등을 GitHub API로부터 갱신합니다.

```
POST /api/admin/sync
```

### 4.2 레포지토리 등록 요청 (사용자 제안)

사용자가 새로운 오픈소스 프로젝트를 추천할 수 있는 기능입니다.

```
POST /api/repos/suggest
```

**Request Body**:

```json
{
  "githubUrl": "https://github.com/example/project",
  "fw": "spring",
  "arch": "hexagonal",
  "reason": "클린 아키텍처 참고하기 좋은 프로젝트입니다."
}
```

### 4.3 인기순/최신순 정렬

```
GET /api/repos?sort=stars&order=desc
```

| 파라미터 | 허용 값 | 설명 |
|----------|---------|------|
| `sort` | `stars`, `commit`, `name` | 정렬 기준 |
| `order` | `asc`, `desc` | 정렬 방향 |

---

## 5. 공통 사항

### 5.1 에러 응답 형식

모든 API 에러는 동일한 형식으로 반환합니다.

```json
{
  "error": "ERROR_CODE",
  "message": "사용자에게 표시할 메시지"
}
```

| HTTP 상태 코드 | error 코드 | 설명 |
|---------------|------------|------|
| 400 | `BAD_REQUEST` | 잘못된 요청 파라미터 |
| 404 | `NOT_FOUND` | 리소스를 찾을 수 없음 |
| 500 | `INTERNAL_ERROR` | 서버 내부 오류 |

### 5.2 CORS

프론트엔드 개발 서버(`localhost:3000`)에서 API 서버로의 요청을 허용해야 합니다.

### 5.3 Content-Type

- 요청: `application/json`
- 응답: `application/json; charset=utf-8`

---

## 6. 프론트엔드 연동 포인트

백엔드 API가 준비되면 프론트엔드에서 수정이 필요한 파일:

| 파일 | 변경 내용 |
|------|-----------|
| `src/api/mock.ts` | Mock 데이터 → 실제 HTTP 호출(`fetch` 또는 `axios`)로 교체 |
| `src/types/index.ts` | `id` 필드 추가, 응답 래퍼 타입(`PaginatedResponse`) 추가 |
| `src/components/Filters.tsx` | 하드코딩 옵션 → `GET /api/filters` 응답으로 교체 |
| `.env` | `REACT_APP_API_BASE_URL` 환경변수 추가 |
