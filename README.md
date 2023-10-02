[![en](https://img.shields.io/badge/lang-en-F38181.svg)](https://https://github.com/minjidev/react-ts-diet-frontend.git/blob/main/README.md)
[![ko](https://img.shields.io/badge/lang-ko-FCE38A.svg)](https://github.com/minjidev/react-ts-diet-frontend/blob/main/README.ko.md)

# 📒 NutriNotes

- This service helps users to effectively manage their diet by **searching, recording, and analyzing your meals**.
- Personal project
- Development period: July 2023 ~ Ongoing

 <br />

## ✔️ Deployment URL

[nutrinotes.net](https://nutrinotes.net)

 <br />

## ✔️ Project Introduction

### Background

- I discovered myself eating burgers every day, sitting at the computer for long hours.
- There was a need for a service to record and manage daily meals for healthier life.

### Key Features

🔎 **Search Meals**: Users can search for meals fetched from an external API (EDAMAM API) and check its detailed nutritional information.

🥗 **Explore Meals**: Users can browse meals by category through a carousel.

✏️ **Record Meals**: Users can save their meals by specifying a date on the calendar.

🧐 **Plan Meals**: Users can check the meals saved for a specific date and visualized nutritional component chart on the dashboard.

### Future Additions

- Responsive design

 <br />

## ✔️ Installation Guide

To run NutriNotes locally:

### Prerequisites

- Node 20.5.1
- Npm 10.0.0

### Frontend

1. **Clone**: `git clone https://github.com/minjidev/react-ts-diet-frontend.git`
2. **Navigate to the directory**: `cd react-ts-diet-frontend`
3. **Install dependencies**: `npm install`
4. Create a `.env` file with the following content:

   ```jsx
   VITE_EDAMAM_APP_ID = YOUR_EDAMAM_APP_ID;
   VITE_EDAMAM_APP_KEY = YOUR_EDAMAM_APP_KEY;
   VITE_API_BASE_URL = BACKEND_ENDPONT;
   ```

5. Start the development server: npm run dev

### Backend

1. **Clone**: `git clone https://github.com/minjidev/react-ts-diet-backend.git`
2. **Navigate to the directory**: `cd react-ts-diet-backend`
3. **Install dependencies**: `npm install`
4. Create a `.env` file with the following content:

```jsx
PORT = BACKEND_PORT;
JWT_SECRET_KEY = YOUR_JWT_SECRET_KEY;
```

5. Run nodemon: npm start

## ✔️ Tech Stack

**Environment**

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

**Frontend**

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

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=Express&logoColor=white)
![JSON Web Tokens](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=JSON%20Web%20Tokens&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=Mongoose&logoColor=white)

**Deployment**

![Amazon S3](https://img.shields.io/badge/Amazon%20S3-569A31?style=for-the-badge&logo=Amazon%20S3&logoColor=white)
![Amazon EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white)
![Amazon Route 53](https://img.shields.io/badge/Amazon%20Route%2053-8C4FFF?style=for-the-badge&logo=Amazon%20Route%2053&logoColor=white)

 <br />

## ETC

### Commit Convention

| Type     | Description                                                |
| -------- | ---------------------------------------------------------- |
| Feat     | Add a new feature                                          |
| Fix      | Fix a bug                                                  |
| Refactor | Refactor code, Modify/Move/Delete name of a file or folder |
| Style    | Change CSS or layout                                       |
| Docs     | Add/Modify Documents                                       |
