import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Loader } from '../components/index';
import { styled } from 'styled-components';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
  return (
    <>
      <Header />
      <TopMargin id="top margin">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </TopMargin>
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

const TopMargin = styled.div`
  margin-top: 8rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Root;
