import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/index';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Root = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <>
      <Header />
      <TopMargin id="top margin">
        <Outlet />
      </TopMargin>
    </>
  );
};

const TopMargin = styled.div`
  margin-top: 8rem;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Root;
