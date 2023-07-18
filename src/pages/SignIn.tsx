import React from 'react';
import { AuthForm } from '../components/index';
import { AuthContainer } from '../styles/styled/Common';

const SignIn = () => {
  return (
    <AuthContainer>
      <AuthForm formType="signin" />
    </AuthContainer>
  );
};

export default SignIn;
