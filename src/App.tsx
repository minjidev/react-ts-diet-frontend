import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import useRouter from './router/useRouter';

const App = () => {
  useEffect(() => {
    document.body.setAttribute('data-theme', 'light');
    window.scrollTo({ top: 0 });
  }, []);

  const router = useRouter();

  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
