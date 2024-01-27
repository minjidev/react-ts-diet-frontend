import React from 'react';
import { RenderHookOptions, render, renderHook } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        useErrorBoundary: true,
        retry: false,
        cacheTime: 0,
      },
    },
  });

  return function ({ children }: { children: React.ReactNode }) {
    return (
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Router>{children}</Router>
        </QueryClientProvider>
      </RecoilRoot>
    );
  };
};

type RenderParams = Parameters<typeof render>;

const renderWithContext = (ui: RenderParams[0], options?: RenderParams[1]) =>
  render(ui, { wrapper: createWrapper(), ...options });

const renderHookWithContext = <Result, Props>(
  hook: (intialProps: Props) => Result,
  options?: RenderHookOptions<Props>,
) => {
  return renderHook<Result, Props>(hook, { wrapper: createWrapper(), ...options });
};

// re-export everything
export * from '@testing-library/react';

// overried render method
export { renderWithContext as render };
export { renderHookWithContext as renderHook };
