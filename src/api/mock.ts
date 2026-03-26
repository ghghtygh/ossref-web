import { Repo, FilterState } from '../types';

const mockRepos: Repo[] = [
  {
    name: "spring-petclinic",
    owner: "spring-projects",
    desc: "Spring 공식 레퍼런스 앱. 전형적인 Layered 구조로 컨트롤러-서비스-레포지토리 패턴을 명확하게 보여줌.",
    stars: "7.2k",
    url: "https://github.com/spring-projects/spring-petclinic",
    fw: "spring", arch: "layered", lang: "Java",
    commit: "2주 전",
    tree: [
      "src/main/java/org/springframework/samples/",
      "├── owner/",
      "│   ├── Owner.java",
      "│   ├── OwnerController.java",
      "│   └── OwnerRepository.java",
      "├── pet/",
      "│   ├── Pet.java",
      "│   └── PetController.java",
      "└── vet/",
      "    └── VetController.java"
    ]
  },
  {
    name: "realworld-springboot",
    owner: "gothinkster",
    desc: "Medium 클론 풀스택 앱. JWT 인증, 페이징, 관계형 데이터 처리가 포함된 실전형 Spring 프로젝트.",
    stars: "3.1k",
    url: "https://github.com/gothinkster/spring-boot-realworld-example-app",
    fw: "spring", arch: "layered", lang: "Java",
    commit: "1개월 전",
    tree: [
      "src/main/java/io/spring/",
      "├── api/",
      "│   └── exception/",
      "├── application/",
      "│   ├── ArticleService.java",
      "│   └── UserService.java",
      "└── infrastructure/",
      "    └── mybatis/"
    ]
  },
  {
    name: "fastapi-realworld",
    owner: "nsidnev",
    desc: "FastAPI + PostgreSQL로 구현한 RealWorld 앱. Dependency Injection과 레이어 분리가 잘 된 Clean 구조.",
    stars: "2.8k",
    url: "https://github.com/nsidnev/fastapi-realworld-example-app",
    fw: "fastapi", arch: "clean", lang: "Python",
    commit: "3개월 전",
    tree: [
      "app/",
      "├── api/",
      "│   └── routes/",
      "├── core/",
      "│   └── settings.py",
      "├── db/",
      "│   ├── queries/",
      "│   └── repositories/",
      "└── models/"
    ]
  },
  {
    name: "nestjs-realworld",
    owner: "lujakob",
    desc: "NestJS + TypeORM 기반 RealWorld 구현. NestJS의 모듈 시스템과 데코레이터 패턴을 실전에서 활용한 사례.",
    stars: "2.4k",
    url: "https://github.com/lujakob/nestjs-realworld-example-app",
    fw: "nestjs", arch: "mvc", lang: "TypeScript",
    commit: "2개월 전",
    tree: [
      "src/",
      "├── article/",
      "│   ├── article.controller.ts",
      "│   ├── article.service.ts",
      "│   └── article.entity.ts",
      "├── user/",
      "│   └── user.module.ts",
      "└── shared/"
    ]
  },
  {
    name: "hexagonal-spring",
    owner: "thombergs",
    desc: "《만들면서 배우는 클린 아키텍처》 예제 코드. Hexagonal 아키텍처를 Spring으로 구현한 교과서적 사례.",
    stars: "5.1k",
    url: "https://github.com/thombergs/buckpal",
    fw: "spring", arch: "hexagonal", lang: "Java",
    commit: "1개월 전",
    tree: [
      "src/main/java/",
      "├── account/",
      "│   ├── adapter/",
      "│   │   ├── in/web/",
      "│   │   └── out/persistence/",
      "│   ├── application/",
      "│   │   ├── port/",
      "│   │   └── service/",
      "│   └── domain/"
    ]
  },
  {
    name: "express-api-starter",
    owner: "w3tecch",
    desc: "Express + TypeScript 기반 REST API. 미들웨어 구성, 에러 핸들링, DI 패턴이 잘 구성된 실전형 스타터.",
    stars: "1.9k",
    url: "https://github.com/w3tecch/express-typescript-boilerplate",
    fw: "express", arch: "layered", lang: "TypeScript",
    commit: "5개월 전",
    tree: [
      "src/",
      "├── api/",
      "│   ├── controllers/",
      "│   ├── middlewares/",
      "│   └── services/",
      "├── config/",
      "└── database/"
    ]
  }
];

export async function fetchRepos(filters: FilterState): Promise<Repo[]> {
  // 실제 API 연동 시 이 부분만 교체하면 됩니다
  await new Promise(resolve => setTimeout(resolve, 300));

  return mockRepos.filter(r => {
    const fwMatch = filters.fw === 'all' || r.fw === filters.fw;
    const archMatch = filters.arch === 'all' || r.arch === filters.arch;
    return fwMatch && archMatch;
  });
}
