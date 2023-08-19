import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signInSchema, SignInSchema, SignUpSchema } from '../../schema/schema';
import { Button, Input } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../api/auth';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { useLocation } from 'react-router-dom';
import { notify } from '../../utils/notify';

interface AuthFormProps {
  formType: 'login' | 'register';
}

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
};

const AuthForm = ({ formType = 'login' }: AuthFormProps) => {
  const isSignUp = formType === 'register';
  type schemaType = typeof formType extends 'register' ? SignInSchema : SignUpSchema;
  const schema = isSignUp ? signUpSchema : signInSchema;

  const navigate = useNavigate();
  const { state } = useLocation();

  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isUsernameDuplicated, setIsUsernameDuplicated] = useState(false);
  const isDuplicated = isEmailDuplicated || isUsernameDuplicated;

  const setUser = useSetRecoilState(userState);

  const {
    handleSubmit,
    formState: { isValid, isSubmitSuccessful },
    getFieldState,
    control,
    trigger,
    reset,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmitSignIn = async (data: schemaType) => {
    try {
      const { user } = await signIn(data);

      setUser(user);
      notify({ status: 'success', message: 'Successfully Logged In! ', icon: '✅' });

      if (state) {
        navigate(state);
      } else navigate('/');
    } catch (e) {
      console.error(e);
      notify({ status: 'error', message: 'Log In Failed..', icon: '🥹' });
    } finally {
    }
  };

  const onSubmitSignUp = async (data: schemaType) => {
    // 회원가입
    try {
      await signUp(data);
      notify({
        status: 'success',
        message: 'Successfully Registered!',
        icon: '🎉',
      });
    } catch (e) {
      console.error(e);
      notify({
        status: 'error',
        message: 'Registration Failed..',
        icon: '🥹',
      });
    } finally {
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
      navigate('/signin');
    }
  }, [isSubmitSuccessful, reset]);

  const submitFn = isSignUp ? onSubmitSignUp : onSubmitSignIn;

  return (
    <Form onSubmit={handleSubmit(submitFn)} name={formType}>
      <Title>NutriNotes</Title>
      <FormTitle>{formType.toUpperCase()}</FormTitle>
      <Input
        name="email"
        type="text"
        control={control}
        trigger={trigger}
        onUpdate={(isDuplicated: boolean) => setIsEmailDuplicated(isDuplicated)}
        formType={formType}
      />
      <Input name="password" type="password" control={control} trigger={trigger} formType={formType} />
      {isSignUp && (
        <>
          <Input
            name="passwordConfirm"
            type="text"
            control={control}
            trigger={trigger}
            disabled={getFieldState('password').invalid}
            formType={formType}
          />
          <Input
            name="username"
            type="text"
            control={control}
            trigger={trigger}
            onUpdate={(isDuplicated: boolean) => setIsUsernameDuplicated(isDuplicated)}
            formType={formType}
          />
        </>
      )}
      <BottomContainer>
        <Message to={isSignUp ? '/signin' : '/signup'}>
          {isSignUp ? 'Already have an account?' : 'Create an account'}
        </Message>
        <ConfirmButton disabled={isSignUp ? !isValid || isDuplicated : false} type="submit">
          Next
        </ConfirmButton>
      </BottomContainer>
    </Form>
  );
};

const Title = styled.h1`
  font-weight: 500;
  font-size: 2.4rem;
  padding-bottom: 1rem;

  color: var(--button-point-color);
`;

const Form = styled.form`
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  padding: 1.2rem;
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

const ConfirmButton = styled(Button)<ConfirmButtonProps>`
  && {
    color: #fff;
    font-weight: 500;
    border-radius: 1rem;
    background-color: ${({ disabled }) => (disabled ? 'var(--border)' : 'var(--button-point-color)')};
  }
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default AuthForm;
