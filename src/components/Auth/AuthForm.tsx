/**
 * - onChange일 때 validate -> 에러 메시지 표시
 * - onSubmit일 때 validate -> formState가 valid하면 버튼 활성화
 */

import React from 'react';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signInSchema, SignInSchema, SignUpSchema } from '../../schema/schema';
import { Input } from '../../components/index';

interface AuthFormProps {
  formType: 'signin' | 'signup'; // 타입 상수화하자
}

const AuthForm = ({ formType = 'signin' }: AuthFormProps) => {
  const schema = formType === 'signup' ? signUpSchema : signInSchema;
  type schemaType = typeof formType extends 'signin' ? SignInSchema : SignUpSchema;

  const { handleSubmit, formState, control, trigger } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      username: '',
    },
    // mode: 'onChange',
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
      <Input name="password" control={control} trigger={trigger} />
      {formType === 'signup' && (
        <>
          <Input name="confirm" control={control} trigger={trigger} />
          <Input name="username" control={control} trigger={trigger} />
        </>
      )}
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

export default AuthForm;
