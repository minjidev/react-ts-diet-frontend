import React from 'react';
import { AuthForm } from '../components/index';
import { AuthContainer } from '../styles/styled/Common';

const SignUp = () => {
  return (
    <AuthContainer id="signup">
      <AuthForm formType="signup" />
    </AuthContainer>
  );
};

export default SignUp;
