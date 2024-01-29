import React from 'react';
import { AuthContainer } from '../styles/styled/Common';
import { RegisterForm } from '../components/index';

const Register = () => {
  return (
    <AuthContainer aria-label="register">
      <RegisterForm />
    </AuthContainer>
  );
};

export default Register;
