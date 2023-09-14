import React, { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header, Loader } from '../components/index';
import { styled } from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  const { pathname } = useLocation();
  const shouldApplyMargin = pathname === '/' || pathname === '/search';
  return (
    <>
      <Header />
      <Main $shouldApplyMargin={shouldApplyMargin}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Main>
      <ToastContainer
        draggablePercent={60}
        role="alert"
        closeOnClick
        autoClose={1000}
        transition={Slide}
        position="bottom-right"
        hideProgressBar={true}
      />
    </>
  );
};

const Main = styled.main<{ $shouldApplyMargin: boolean }>`
  margin-top: ${({ $shouldApplyMargin }) => ($shouldApplyMargin ? '5rem' : '')};
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Root;
