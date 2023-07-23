import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Loader } from '../components/index';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Root = () => {
  return (
    <>
      <Header />
      <TopMargin id="top margin">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </TopMargin>
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
