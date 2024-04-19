import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  #root {
    min-height: 100vh;
    width: 100%;
    font-size: 2rem;
    font-family: 'Londrina Solid', 'Rubik', Inter, Avenir, Helvetica, Arial, sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   

  }



  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    box-sizing: border-box;
    min-height: 100%;
    width: 100%;
    
    --red: #FC2B0A; 
    --dark-red: #C32020;
    --green: #22C745;

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


    background-color: var(--bg-color);
    color: var(--font-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: scroll;
  }

  html {
    height: 100%;
    
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  a {
  color: inherit;
  text-decoration: none;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: inherit;

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

  .Toastify__toast-body {
    padding: 1rem;
    font-size: 1.1rem;
    font-family: 'Rubik';
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
