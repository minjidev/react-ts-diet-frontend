/**
 * - onChange일 때 validate -> 에러 메시지 표시
 * - onSubmit일 때 validate -> formState가 valid하면 버튼 활성화
 *    - signUp : (email 중복 확인) 회원 추가
 *    - signIn : (회원 정보 확인) 로그인
 */

import React from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signInSchema, SignInSchema, SignUpSchema } from '../../schema/schema';
import { Input } from '../../components/index';
import { Link } from 'react-router-dom';

interface AuthFormProps {
  formType: 'signin' | 'signup';
}

const AuthForm = ({ formType = 'signup' }: AuthFormProps) => {
  const isSignUp = formType === 'signup';
  const schema = isSignUp ? signUpSchema : signInSchema;
  type schemaType = typeof formType extends 'signin' ? SignInSchema : SignUpSchema;
  const [isPasswordInvalid, setisPasswordInvalid] = React.useState(true);

  const {
    handleSubmit,
    formState: { isValid },
    control,
    trigger,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
    },
  });

  const onSubmit = (data: schemaType) => {
    // 회원 추가 api 요청
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} name={formType}>
      <Title>Logo</Title>
      <FormTitle>{formType.toUpperCase()}</FormTitle>
      <Input name="email" control={control} trigger={trigger} />
      <Input
        name="password"
        control={control}
        trigger={trigger}
        onUpdate={isPasswordValid => {
          setisPasswordInvalid(isPasswordValid);
        }}
      />
      {formType === 'signup' && (
        <>
          <Input name="passwordConfirm" control={control} trigger={trigger} disabled={isPasswordInvalid} />
          <Input name="username" control={control} trigger={trigger} />
        </>
      )}
      <BottomContainer>
        <Message to={isSignUp ? '/signin' : '/signup'}>
          {isSignUp ? 'Already have an account?' : 'Create an account'}
        </Message>
        <ConfirmButton disabled={!isValid}>Next</ConfirmButton>
      </BottomContainer>
    </Form>
  );
};

const Title = styled.h1`
  font-weight: 500;
  font-size: 2.4rem;
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

const ConfirmButton = styled.button`
  width: 5rem;
  height: 2.4rem;
  background-color: ${({ disabled }) => (disabled ? 'var(--border)' : 'var(--button-point-color)')};
`;

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 1rem;
`;

export default AuthForm;
