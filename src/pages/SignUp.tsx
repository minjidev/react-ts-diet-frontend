import React from 'react';
import { AuthForm } from '../components/index';
import { AuthContainer } from '../styles/styled/Common';

const SignUp = () => {
  const formType = 'register';
  return (
    <AuthContainer aria-label={formType}>
      <AuthForm formType={formType} />
    </AuthContainer>
  );
};

export default SignUp;
