import React, { useEffect } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import GlobalStyle from './styles/GlobalStyle';
import router from './router/router';

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

const App = () => {
  useEffect(() => {
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
