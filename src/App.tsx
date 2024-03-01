import React from 'react';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import useRouter from './router/useRouter';

const App = () => {
  const router = useRouter();

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
