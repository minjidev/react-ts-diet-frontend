import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <Container>
      <Loading>Loading...</Loading>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Loading = styled.div`
  padding-bottom: 4rem;
`;

export default Loader;
