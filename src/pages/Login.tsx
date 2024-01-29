import React from 'react';
import { AuthContainer } from '../styles/styled/Common';
import { LoginForm } from '../components/index';

const Login = () => {
  return (
    <AuthContainer aria-label="login">
      <LoginForm />
    </AuthContainer>
  );
};

export default Login;
