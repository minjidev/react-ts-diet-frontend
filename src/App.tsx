import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Root, SignIn, SignUp, Main, Home, Recipes, About, DashBoard, Result } from './pages/index';
import GlobalStyle from './styles/GlobalStyle';

//data-theme='light'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // default 3
      suspense: true,
    },
    mutations: {
      // useErrorBoundary: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'dashboard',
        element: <DashBoard />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'recipes',
        element: <Recipes />,
      },
    ],
  },
  {
    path: '/result/:resultString',
    element: <Result />,
  },
]);

const App = () => {
  React.useEffect(() => {
    document.body.setAttribute('data-theme', 'light');
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
