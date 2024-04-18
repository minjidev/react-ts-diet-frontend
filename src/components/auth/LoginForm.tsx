import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginSchema, LoginSchema } from '../../schema/schema';
import { FormInput, Button } from '../index';
import { notify, mobileQuery } from '../../utils/index';
import { ButtonProps } from '../../types/types';
import { login } from '../../api/auth';
import { userState } from '../../recoil/atoms/userState';

const LoginForm = () => {
  const formType = 'login';
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const { state } = useLocation();

  const { handleSubmit, control, trigger } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitLogin = async (data: LoginSchema) => {
    try {
      const { user } = await login(data);

      setUser(user);
      notify({ status: 'success', message: 'Successfully Logged In! ', icon: '✅' });

      if (state) {
        navigate(state);
      } else navigate('/');
    } catch (e) {
      notify({ status: 'error', message: 'Log In Failed..', icon: '🥹' });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitLogin)} name={formType}>
      <Title>NutriNotes</Title>
      <FormTitle>{formType.toUpperCase()}</FormTitle>
      <FormInput name="email" type="text" control={control} trigger={trigger} formType={formType} />
      <FormInput
        name="password"
        type="password"
        control={control}
        trigger={trigger}
        formType={formType}
      />

      <BottomContainer>
        <Message to="/register">Create an account</Message>
        <ConfirmButton type="submit">Next</ConfirmButton>
      </BottomContainer>
    </Form>
  );
};

const Title = styled.div`
  font-weight: 500;
  font-size: 2.4rem;
  padding-bottom: 1rem;

  color: var(--button-point-color);

  ${mobileQuery} {
    display: none;
  }
`;

const Form = styled.form`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${mobileQuery} {
    padding: 0;
    width: 100%;
  }
`;

const FormTitle = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  padding: 1.2rem;

  ${mobileQuery} {
    padding: 2rem;
  }
`;

const Message = styled(Link)`
  font-family: Rubik;
  font-size: 1rem;
  margin: 0.6rem 0 1rem 0;
  margin-right: auto;

  &:hover {
    text-decoration: 3px underline var(--button-point-color);
  }
`;

const ConfirmButton = styled((props: ButtonProps) => <Button {...props} />)`
  && {
    color: #fff;
    font-weight: 500;
    border-radius: 1rem;
    background-color: var(--button-point-color);
  }
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default LoginForm;
