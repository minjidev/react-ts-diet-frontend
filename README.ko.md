[![en](https://img.shields.io/badge/lang-en-F38181.svg)](https://github.com/minjidev/react-ts-diet-frontend/blob/main/README.md)
[![ko](https://img.shields.io/badge/lang-ko-FCE38A.svg)](https://github.com/minjidev/react-ts-diet-frontend/blob/main/README.ko.md)

# 📒 NutriNotes

- **식단을 검색/기록/분석하여 효과적으로 식습관을 관리**할 수 있도록 하는 서비스입니다.
- 개인 프로젝트
- 개발 기간: 2023/07 ~ 진행 중

 <br />

## 배포 주소

[nutrinotes.net](https://nutrinotes.net)

 <br />

## 프로젝트 소개

### 기획 배경

- 컴퓨터와 함께 오랜 시간 자리에 앉아서 매일 햄버거를 먹고 있는 나를 발견..!
- 일자별로 식단을 기록하고 관리하는 서비스에 대한 필요성을 느끼게 되었습니다.

### 주요 기능

🔎 **식단 검색**: 외부 API(EDAMAM)에서 가져온 식단을 검색하고, 상세 영양 정보를 확인할 수 있습니다.

🥗 **식단 둘러보기**: 카테고리별 식단을 캐러셀로 둘러볼 수 있습니다.

✏️ **식단 기록** : 캘린더에서 일자를 지정해 식단을 저장할 수 있습니다.

🧐 **식단 관리** : 대시보드에서 해당 일자에 저장된 식단과 영양 성분 분석 차트를 확인할 수 있습니다.

### 추후 추가 기능

- 반응형

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
