import React from 'react';
import { AuthForm } from '../components/index';
import { AuthContainer } from '../styles/styled/Common';

const SignIn = () => {
  const formType = 'login';
  return (
    <AuthContainer aria-label={formType}>
      <AuthForm formType={formType} />
    </AuthContainer>
  );
};

export default SignIn;
