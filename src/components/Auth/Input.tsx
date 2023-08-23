import React, { useState } from 'react';
import { styled } from 'styled-components';
import { useController, Control } from 'react-hook-form';
import { AxiosError } from 'axios';
import { checkEmailDuplicated, checkUsernameDuplicated } from '../../api/auth';
import Button from '../common/Button';
import { useDebounce } from '../../hooks/index';

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
  formType?: string;
}

const emailRegex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const TRIGGER_DEBOUNCE_DELAY_TIME = 200;

const Input = ({ name, control, trigger, onUpdate, formType, disabled = false }: InputProps) => {
  const [duplicatedResult, setDuplicatedResult] = useState<string | null>(null);
  const isSignUp = formType === 'register';

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
  // const debounedFn = useMemo((name: string) => useDebounce(() => trigger(name), TRIGGER_DEBOUNCE_DELAY_TIME), []);

  // console.log(debounedFn);

  const deboucedPwCheckTrigger = useDebounce(() => trigger('passwordConfirm'), TRIGGER_DEBOUNCE_DELAY_TIME);
  const debouncedTrigger = useDebounce(() => trigger(name), TRIGGER_DEBOUNCE_DELAY_TIME);
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
              deboucedPwCheckTrigger();
            }
            if (duplicatedResult) setDuplicatedResult(null);
            debouncedTrigger();
          }}
          disabled={disabled}
        />
        {isSignUp && (name === 'email' || name === 'username') ? (
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
        {isSignUp && isDirty && error?.message && !disabled && <Error>{error?.message}</Error>}
      </TextInputField>
    </>
  );
};

const Label = styled.label`
  font-size: 1.2rem;
`;

const TextInputField = styled.div`
  margin: 0.1rem 0 1rem 0;
  position: relative;
`;

const TextInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: props.name,
}))`
  width: 22rem;
  height: 3rem;
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

interface CheckButtonProps {
  $isvalid: boolean;
  onClick: () => void;
}

const CheckButton = styled(Button)<CheckButtonProps>`
  && {
    position: absolute;
    right: 2px;
    top: 5px;
    color: ${({ $isvalid }) => ($isvalid ? 'var(--button-point-color)' : 'var(--border)')};
  }
`;

export default Input;
