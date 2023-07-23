import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  #root {
    min-height: 100%;
    min-width: 100%;
    font-size: 2rem;
    font-family: 'Londrina Solid', 'Rubik', Inter, Avenir, Helvetica, Arial, sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   

    --red: #FC2B0A; 
    --dark-red: #C32020;
    --green: #22C745;
  }

  body[data-theme='light'] {
    --bg-color: #fff;
    --bg-secondary-color: #fff;

    --font-color: #000;

    --button-color : #f8f8f8;
    --button-disabled-color : #c4bdbd;
    --button-hover-color: #f7f7f7;
    --button-click-color: #c4bdbd;
    --button-point-color: #FFA202;
    --button-dark-point-color: #E96002;

    --border: #ababab;
    --border-primary: #ababab;
    --border-secondary: #eee;
    --border-tertiary: #000;

 
  }

  body[data-theme='dark'] {
    --bg-color: #22272e; /* 진한 회색  */
    --bg-secondary-color: #353C45; /* 연한 회색 */
    --bg-dark-color: #161B22;/* 가장 진한 회색 */

    --font-color: #CDD9E5; /* 연한 글자 회색 */
    --font-secondary: #549bf5; /* 중복 확인 */

    --button-color: #2D333B; /* 유저 정보 페이지 버튼 */ 
    --button-disabled-color : #353C45;
    --button-hover-color: #46515C;
    --button-click-color: #46515C;

    --border: none;
    --border-primary: #5d646e;
    --border-secondary: #373E47;
    --border-tertiary: #fff;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    min-height: 100%;
    

    background-color: var(--bg-color);
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-x: scroll;
  }

  html {
    height: 100%;
    
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  * {
    box-sizing: inherit;
    /* font-family: 'Noto Sans KR', sans-serif; */

    ::-webkit-scrollbar {
      display: none;
    }
  }

  code {
    font-family: monospace; 
  }
  
  button {
    border: none;
    outline: none;
 
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }

  .sr-only {
  overflow: hidden;
  position: absolute;
  clip: rect(0, 0, 0, 0);
  clip-path: polygon(0 0, 0 0, 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
}
`;

export default GlobalStyle;
