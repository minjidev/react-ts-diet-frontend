import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import { Header, Loader, ErrorFallback, CustomError } from '../components/index';
import 'react-toastify/dist/ReactToastify.css';
import { hasMargin } from '../utils/index';

const handleError = (error: unknown) => {
  if (error instanceof CustomError) {
    console.error(error);
  }
};

const Root = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Main $hasMargin={hasMargin(pathname)}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Main>
      <ToastContainer
        draggablePercent={60}
        role="alert"
        closeOnClick
        autoClose={1000}
        transition={Slide}
        position="bottom-right"
        hideProgressBar
      />
    </>
  );
};

const Main = styled.main<{ $hasMargin: boolean }>`
  margin-top: ${({ $hasMargin }) => ($hasMargin ? '5rem' : '')};
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Root;
