import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Root, SignIn, SignUp, Main, Home, Search, About, DashBoard } from './pages/index';
import GlobalStyle from './styles/GlobalStyle';

//data-theme='light'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // default 3
      suspense: true,
      refetchOnWindowFocus: false,
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
        path: '/',
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
        path: 'search',
        element: <Search />,
      },
    ],
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
