import React from 'react';
import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const createWrapper = () => {
  const queryClient = new QueryClient();

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

// re-export everything
export * from '@testing-library/react';

// overried render method
export { renderWithContext as render };
