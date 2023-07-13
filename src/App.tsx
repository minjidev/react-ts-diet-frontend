import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Root, SignIn, SignUp } from './pages/index';
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
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
    ],
  },
]);

const App = () => {
  React.useEffect(() => {
    document.body.setAttribute('data-theme', 'light');
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
