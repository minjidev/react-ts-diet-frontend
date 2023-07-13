import React from 'react';
import { styled } from 'styled-components';
import { AuthForm } from '../components/index';

const SignUp = () => {
  return (
    <Container id="signup">
      <AuthForm formType="signup" />
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

export default SignUp;
