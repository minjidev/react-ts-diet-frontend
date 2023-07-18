import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useController, Control } from 'react-hook-form';
import { AxiosError } from 'axios';
import { checkEmailDuplicated, checkUsernameDuplicated } from '../../api/auth';

type FieldValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
};

interface InputProps {
  name: 'email' | 'password' | 'passwordConfirm' | 'username';
  type: string;
  control: Control<FieldValues>;
  trigger: any;
  disabled?: boolean;
  onUpdate?: (isDuplicated: boolean) => void;
}

const emailRegex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;

const Input = ({ name, control, trigger, onUpdate, disabled = false }: InputProps) => {
  const [duplicatedResult, setDuplicatedResult] = useState<string | null>(null);

  const {
    field: { value, onChange },
    fieldState: { error, invalid, isDirty },
  } = useController({
    name,
    control,
  });

  const checkDuplicated = (field: string) => async () => {
    try {
      const checkFn = emailRegex.test(field) ? checkEmailDuplicated : checkUsernameDuplicated;
      await checkFn(field);

      setDuplicatedResult('success');
      if (onUpdate) onUpdate(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        setDuplicatedResult(error.response?.data.message);
        if (onUpdate) onUpdate(true);
      }
    }
  };

  return (
    <>
      <Label htmlFor={name} className="sr-only">
        {name}
      </Label>
      <TextInputField>
        <TextInput
          id={name}
          name={name}
          value={value || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            if (name === 'password') {
              trigger('passwordConfirm');
            }
            if (duplicatedResult) setDuplicatedResult(null);
            trigger(name);
          }}
          disabled={disabled}
        />
        {name === 'email' || name === 'username' ? (
          <>
            <CheckButton $isvalid={isDirty && !invalid} onClick={checkDuplicated(value)}>
              Check
            </CheckButton>
            {isDirty && !error && (
              <Error $isvalid={duplicatedResult === 'success'}>
                {duplicatedResult !== null && duplicatedResult === 'success' ? `Confirmed` : duplicatedResult}
              </Error>
            )}
          </>
        ) : undefined}
        {isDirty && error && !disabled && <Error>{error?.message}</Error>}
      </TextInputField>
    </>
  );
};

const Label = styled.label`
  font-size: 1.2rem;
`;

const ConfirmButton = styled.button`
  width: 5rem;
  height: 2.4rem;
  background-color: ${({ disabled }) => (disabled ? 'var(--border)' : 'var(--button-point-color)')};
`;

interface CheckButtonProps {
  $isvalid: boolean;
}

const CheckButton = styled(ConfirmButton).attrs({
  type: 'button',
})<CheckButtonProps>`
  width: 4rem;
  font-size: 1rem;
  font-weight: 400;
  position: absolute;
  right: 2%;
  top: 8px;
  background-color: transparent;
  color: ${({ $isvalid }) => ($isvalid ? 'var(--button-point-color)' : 'var(--border)')};
`;

const TextInputField = styled.div`
  margin: 0.2rem 0 1rem 0;
  position: relative;
`;

const TextInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: props.name,
}))`
  width: 22rem;
  height: 54px;
  border-radius: 6px;
  padding: 1rem 1rem;
  border: 1px solid var(--border);
  font-size: 1rem;
`;

interface ErrorProps {
  $isvalid?: boolean;
}
const Error = styled.div<ErrorProps>`
  font-family: 'Rubik';
  font-size: 0.8rem;
  font-weight: 400;
  margin-right: auto;
  margin-top: 0.4rem;
  padding-left: 0.4rem;
  color: ${({ $isvalid }) => ($isvalid ? 'var(--green)' : 'var(--red)')};
`;

export default Input;
