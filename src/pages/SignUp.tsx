import React from 'react';
import { AuthForm } from '../components/index';
import { AuthContainer } from '../styles/styled/Common';

const SignUp = () => {
  return (
    <AuthContainer>
      <AuthForm formType="register" />
    </AuthContainer>
  );
};

export default SignUp;
