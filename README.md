[![ko](https://img.shields.io/badge/lang-ko-FCE38A.svg)](https://github.com/minjidev/react-ts-diet-frontend/blob/main/README.md)
[![en](https://img.shields.io/badge/lang-en-F38181.svg)](https://github.com/minjidev/react-ts-diet-frontend/blob/main/README.en.md)

# 📒 NutriNotes

- [프로젝트 소개](#프로젝트-소개)
  - [프로젝트 개요](#프로젝트-개요)
  - [주요 기능](#주요-기능)
  - [고민했던 지점들](#고민했던-지점들)
- [설치 가이드](#설치-가이드)
  - [요구사항](#요구사항)
  - [프론트엔드](#프론트엔드)
  - [백엔드](#백엔드)
- [기술 스택](#기술-스택)
- [기타](#기타)
  - [커밋 컨벤션](#커밋-컨벤션)

<br />
<br />

## 프로젝트 소개

### 프로젝트 개요

- 기획 배경: 컴퓨터와 함께 오랜 시간 자리에 앉아서 매일 햄버거(🍔)를 먹고 있는 저를 발견하고, **일자별로 식단을 기록하고 관리하는 서비스에 대한 필요성**을 느꼈습니다.

- 한 줄 설명: **식단을 검색/기록/분석하여 효과적으로 식습관을 관리**할 수 있도록 하는 서비스입니다.

- 대상: 식단 관리가 어려운 사람들

- 개인 프로젝트

- 개발 기간: 2023/07 ~ 진행 중

- 배포 주소: [<u>https://nutrinotes.net</u>](https://nutrinotes.net)

<br />

### 주요 기능

**🥗 식단 둘러보기**

카테고리별 식단을 캐러셀로 둘러볼 수 있고, 각 식단 카드를 선택하면 상세 영양 성분을 확인할 수 있습니다.
![recipes](https://github.com/Team-Hoisting/mychelin-guide-frontend/assets/68722909/03c47f36-e31b-4911-b18c-78dd313f1f5a)

**🔎 식단 검색**

외부 API(EDAMAM)에서 가져온 식단을 검색하고, 상세 영양 정보를 확인할 수 있습니다.
![search](https://github.com/Team-Hoisting/mychelin-guide-frontend/assets/68722909/f1187bdd-8acf-4891-b2f0-9bfe8d86bdfd)

 <br />
 
**✏️ 식단 기록**

캘린더에서 일자를 지정해 식단을 저장하여 대시보드에서 해당 일자에 저장된 식단과 영양 성분을 분석해 시각화한 차트를 확인할 수 있습니다.
![dashboard](https://github.com/Team-Hoisting/mychelin-guide-frontend/assets/68722909/4c3ac9c2-e307-4c1a-a968-fdebce44fba1)

 <br />
 
**📃 회원 가입 & 로그인**

JWT를 활용한 회원가입 및 로그인을 구현했습니다. React Hook Form과 Zod를 사용해 타입 안정성을 보장하는 스키마를 기반으로 폼을 관리하고, debounce를 사용해 이벤트 중복 호출을 방지하였습니다.
![register](https://github.com/Team-Hoisting/mychelin-guide-frontend/assets/68722909/a226b9aa-4b87-41be-83d4-8881711e6fd6)
![login](https://github.com/Team-Hoisting/mychelin-guide-frontend/assets/68722909/d83e92e0-bd70-4779-8bfc-341958d7e1a6)

### 고민했던 지점들

📒 [(<u>노션에서 보기</u>)](https://www.notion.so/NutriNotes-ccbee51756e340a588350f638217f42a?pvs=4#9b72b6740bb64289b4bf54b09169389f])

**1. 웹 사이트 성능 최적화**

프론트엔드 성능이 사용자 경험에 영향을 미칠 수 있다는 것을 알고, 개선점을 찾고자 했습니다. [(<u>블로그</u>)](https://bichoninthefront.tistory.com/110)

- **초기 번들 사이즈 감소를 통한 초기 로딩 속도 향상**

  - 불필요한 패키지 정리. 큰 부분을 차지하던 Lodash의 경우, 트리쉐이킹을 위해 default import로 필요한 함수만 받아오도록 수정.

  - 페이지 기반 dynamic import를 통해 필요한 시점에 자바스크립트를 로드하여 초기에 로드하는 자바스크립트 번들 사이즈를 감소.

- **이미지 레이지 로딩을 통한 이미지 로딩 최적화**

  - `loading=lazy`를 활용하고, 이를 지원하지 않는 브라우저를 위해 IntersectionObserver를 사용한 LazyImg 컴포넌트를 만들어 사용. `useObserver` 훅에서 옵저버를 생성하여 공유하고, 뷰포트와 intersecting하는 경우, 저해상도 이미지를 고해상도 이미지로 변경.

  - 이때, 유의할 점은 초기 화면에 나오는 이미지를 레이지 로딩하지 않아야한다는 것. 불필요한 리소스 로드 지연을 방지하기 위해 캐러셀의 첫 페이지에는 EagerLoad 이미지를, 이후에는 LazyLoad 이미지를 사용.

- **데이터 Prefetch 및 Preload를 통한 [render-as-you-fetch](https://tanstack.com/query/v4/docs/framework/react/guides/suspense#fetch-on-render-vs-render-as-you-fetch)**

  - React Router의 `loader`를 활용해 **라우트 진입 전 필요한 데이터를 prefetch**하고, 이후 TanStack Query의 `useQuery`를 활용해 **캐싱 및 무효화**.

  - `prefetchQuery`를 통해 **유저 인터랙션(e.g. 검색 키워드 hover) 발생 시 데이터를 prefetch**하여 최대한 빠르게 로딩을 시작하고, `useQuery`에서 캐싱된 데이터를 사용

> 💭 웹 성능 개선을 통해 FCP 0.6초, LCP 1.5초 개선하여 초기 로딩 속도를 단축했습니다. 이 과정에서 네트워크 요청 시 로딩을 최적화하기 위해 고려해야 할 요소들을 알고, 상황에 따른 적절한 최적화의 중요성을 깨달았습니다.
>
> 아쉬웠던 점은 현재 third-party api를 사용하고 있기 때문에 성능에 큰 영향을 미칠 수 있는 이미지 압축, WebP, AVIF와 같은 웹 페이지에 최적화된 형식을 사용하지 못했던 점입니다. 추후 백엔드에서 간단한 작업 뿐만 아니라 이미지를 직접 관리한다면 더 효율적인 개선이 가능할 것으로 보입니다.

**2. 접근성 및 SEO 최적화**

사용자가 어떤 브라우저나 기기를 사용하더라도 화면을 동일하게 보고, 신체적, 환경적 조건에 관계 없이 정보에 접근할 수 있는 서비스를 만들고자 하였습니다.

- 시맨틱 마크업 적용 [(<u>블로그</u>)](https://bichoninthefront.tistory.com/82)

  header, h, section, article, button과 같은 역할을 명시적으로 드러내는 시맨틱 태그를 사용한 마크업.

- aria 및 image alt 태그 사용

  section과 article 태그의 경우 보여지는 제목이 있는 경우 aria-labelledby를, 그렇지 않은 경우 aria-label을 사용해 역할을 명시.

- Open Graph 및 메타 태그 활용

  title, description, author, keywords 등의 메타 태그 및 OpenGraph를 활용하여 SEO를 최적화.

> 웹 표준 및 웹 접근성을 고려한 마크업 및 SEO 개선 작업을 통해 웹 접근성과 SEO의 중요성을 이해하고, LightHouse 기준 평균 지표 19.76% 향상이라는 성과를 도출하였습니다.

**3. AWS 배포**

- **네트워크 요청 문제**

  - CORS 에러
    - 개발 환경에서는 프록시를 사용해 요청을 redirect했지만, 배포 환경에서는 서버에서 cors 미들웨어를 사용해 CORS 헤더 설정하여 해결.
  - Mixed Content:
    - 프론트엔드 서버 요청을 CloudFront를 사용해 HTTPS로 redirect했을 때 문제가 발생하여 백엔드 서버 요청도 LoadBalancer에 SSL/TLS를 설정하여 해결.

- **S3 버킷 업데이트와 배포 환경 불일치**

  - 동적 import한 코드를 배포했을 때, `Failed to fetch dynamically loaded module` 에러가 발생.

  - 버킷의 내용을 삭제하고 내용을 업데이트했지만, 배포 환경에 반영되지 않는 문제가 발생했습니다. CloudFront의 로그를 확인하여 캐싱 문제인 것을 확인했고, 브라우저 캐시 삭제 및 강제 새로고침을 했지만 해결되지 않았음.

  - 이를 해결하기 위해 코드 분할이 되지 않은 이전 버전을 먼저 업로드하고 CloudFront에서 캐시를 전체 무효화한 후 코드 분할한 코드를 업로드하여 해결.

- **프론트엔드 및 백엔드 HTTPS 구성**

  - Route53에서 사용하는 하나의 도메인으로 서버 구조를 구성의 어려움.

  - [프론트] Route53의 도메인은 S3로 연결하고, CloudFront에서 https로 redirect.

  - [백엔드] 사용하고 있는 도메인의 서브 도메인을 만들어 LoadBalancer에서 https로 redirect하고, 이를 target group에 들어온 요청을 처리할 EC2 포트를 명시해 연결.

> SSL/TLS를 적용한 안전한 연결을 보장하고, 쾌적한 사용자 경험을 위한 기본적인 클라우드 환경 구성을 할 수 있게 되었습니다. 배포 과정에서 캐시 및 버전 관리의 중요성을 이해하고, 로그 분석을 통한 문제 해결 능력을 키웠습니다.

 <br />

## 설치 가이드

NutriNotes를 로컬에서 실행하기:

### 요구사항

- Node 20.5.1
- Npm 10.0.0

### 프론트엔드

1. **클론**
   `git clone https://github.com/minjidev/react-ts-diet-frontend.git`
2. **디렉토리로 이동** `cd react-ts-diet-frontend`
3. **의존성 설치** `npm install`
4. **`.env` 파일을 생성하세요.**

   ```jsx
   VITE_EDAMAM_APP_ID = YOUR_EDAMAM_APP_ID;
   VITE_EDAMAM_APP_KEY = YOUR_EDAMAM_APP_KEY;
   VITE_API_BASE_URL = BACKEND_ENDPONT;
   ```

5. **개발 서버 시작**: `npm run dev`

### 백엔드

1. **클론** `git clone https://github.com/minjidev/react-ts-diet-backend.git`
2. **디렉토리로 이동** `cd react-ts-diet-backend`
3. **의존성 설치** `npm install`
4. **`.env` 파일을 생성**

   ```jsx
   PORT = BACKEND_PORT;
   JWT_SECRET_KEY = YOUR_JWT_SECRET_KEY;
   ```

5. **nodemon 실행**: `npm start`

 <br />

## 기술 스택

**환경**

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

**프론트엔드**

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)

![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=React%20Router&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=React%20Query&logoColor=white)
![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![styled-components](https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=React%20Hook%20Form&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=Zod&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=Chart.js&logoColor=white)

**백엔드**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=Mongoose&logoColor=white)

**배포**

![Amazon S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white)
![Amazon Route 53](https://img.shields.io/badge/Amazon%20Route%2053-8C4FFF?style=for-the-badge&logo=Amazon%20Route%2053&logoColor=white)

 <br />

## 기타

### 커밋 컨벤션

| Type     | 설명                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------- |
| Feat     | 새로운 기능 추가                                                                                      |
| Fix      | 버그 수정                                                                                             |
| Refactor | 코드 리팩토링, 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우, 파일을 삭제하는 작업만 수행한 경우 |
| Style    | CSS 및 레이아웃 작업수정                                                                              |
| Docs     | 문서 수정                                                                                             |
| Chore    | 유지보수                                                                                              |
