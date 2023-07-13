import React from 'react';
import { styled } from 'styled-components';
import { AuthForm } from '../components/index';

const SignIn = () => {
  return (
    <Container>
      <AuthForm formType="signin" />
    </Container>
  );
};

const Container = styled.div`
  width: 60%;
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SignIn;
