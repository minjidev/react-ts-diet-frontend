import React from 'react';
import { styled } from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Content>Header</Content>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 80%;
  background: white;
  height: 90%;
  height: 3rem;
  border-radius: 2rem;
  padding-left: 1.4rem;

  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 800;
  border: 1px solid var(--border);
`;

export default Header;
