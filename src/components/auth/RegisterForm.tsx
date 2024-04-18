import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterSchema, registerSchema } from '../../schema/schema';
import { register } from '../../api/auth';
import { mobileQuery, notify } from '../../utils';
import { Button, FormInput } from '../index';
import { ButtonProps } from '../../types/types';

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
};

const RegisterForm = () => {
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isUsernameDuplicated, setIsUsernameDuplicated] = useState(false);
  const isDuplicated = isEmailDuplicated || isUsernameDuplicated;
  const formType = 'register';
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isValid, isSubmitSuccessful },
    getFieldState,
    control,
    trigger,
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
      navigate('/login');
    }
  }, [isSubmitSuccessful, reset, navigate]);

  const onSubmitRegister = async (data: RegisterSchema) => {
    try {
      await register(data);
      notify({
        status: 'success',
        message: 'Successfully Registered!',
        icon: '🎉',
      });
    } catch (e) {
      notify({
        status: 'error',
        message: 'Registration Failed..',
        icon: '🥹',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitRegister)} name={formType}>
      <Title>NutriNotes</Title>
      <FormTitle>{formType.toUpperCase()}</FormTitle>
      <FormInput
        name="email"
        type="text"
        control={control}
        trigger={trigger}
        onUpdate={(isDuplicated: boolean) => setIsEmailDuplicated(isDuplicated)}
        formType={formType}
      />
      <FormInput
        name="password"
        type="password"
        control={control}
        trigger={trigger}
        formType={formType}
      />

      <FormInput
        name="passwordConfirm"
        type="password"
        control={control}
        trigger={trigger}
        disabled={getFieldState('password').invalid}
        formType={formType}
      />
      <FormInput
        name="username"
        type="text"
        control={control}
        trigger={trigger}
        onUpdate={(isDuplicated: boolean) => setIsUsernameDuplicated(isDuplicated)}
        formType={formType}
      />

      <BottomContainer>
        <Message to="/login">Already have an account?</Message>
        <ConfirmButton disabled={!isValid || isDuplicated} type="submit">
          Next
        </ConfirmButton>
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

interface ConfirmButtonProps {
  disabled: boolean;
}

const ConfirmButton = styled((props: ButtonProps) => <Button {...props} />)<ConfirmButtonProps>`
  && {
    color: #fff;
    font-weight: 500;
    border-radius: 1rem;
    background-color: ${({ disabled }) =>
      disabled ? 'var(--border)' : 'var(--button-point-color)'};
  }
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default RegisterForm;
