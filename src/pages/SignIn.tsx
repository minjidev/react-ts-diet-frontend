import React from 'react';
import { styled } from 'styled-components';
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
