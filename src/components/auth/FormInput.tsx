import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  useController,
  UseFormTrigger,
  UseControllerProps,
  FieldValues,
  Path,
} from 'react-hook-form';
import { AxiosError } from 'axios';
import { debounce } from 'lodash';
import { checkEmailDuplicated, checkUsernameDuplicated } from '../../api/auth';
import Button from '../common/Button';
import { mobileQuery } from '../../utils/index';

type InputProps<T extends FieldValues> = {
  type: string;
  formType?: string;
  disabled?: boolean;
  trigger: UseFormTrigger<T>;
  onUpdate?: (isDuplicated: boolean) => void;
};

type FormInputProps<T extends FieldValues> = InputProps<T> & UseControllerProps<T>;

const emailRegex = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;
const TRIGGER_DEBOUNCE_DELAY_TIME = 200;

const Input = <T extends FieldValues>({
  name,
  type,
  control,
  trigger,
  onUpdate,
  formType,
  disabled = false,
}: FormInputProps<T>) => {
  const [duplicatedResult, setDuplicatedResult] = useState<string | null>(null);
  const isRegister = formType === 'register';

  const {
    field: { value, onChange },
    fieldState: { error, invalid, isDirty },
  } = useController<T>({
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

  const deboucedPwCheckTrigger = useCallback(() => {
    debounce(() => trigger('passwordConfirm' as Path<T>), TRIGGER_DEBOUNCE_DELAY_TIME);
  }, [trigger]);

  const debouncedTrigger = useCallback(() => {
    debounce(() => trigger(name), TRIGGER_DEBOUNCE_DELAY_TIME);
  }, [name, trigger]);

  return (
    <>
      <Label htmlFor={name} className="sr-only">
        {name}
      </Label>
      <TextInputField>
        <TextInput
          id={name}
          type={type}
          name={name}
          value={value || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
            if (isRegister) {
              if (name === 'password') {
                deboucedPwCheckTrigger();
              }
              if (duplicatedResult) setDuplicatedResult(null);
            }

            debouncedTrigger();
          }}
          disabled={disabled}
        />
        {isRegister && (name === 'email' || name === 'username') ? (
          <>
            <CheckButton $isvalid={isDirty && !invalid} onClick={checkDuplicated(value)}>
              Check
            </CheckButton>
            {isDirty && !error && (
              <Error $isvalid={duplicatedResult === 'success'}>
                {duplicatedResult !== null && duplicatedResult === 'success'
                  ? `Confirmed`
                  : duplicatedResult}
              </Error>
            )}
          </>
        ) : undefined}
        {isRegister && isDirty && error?.message && !disabled && <Error>{error?.message}</Error>}
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
  width: 100%;
`;

const TextInput = styled.input.attrs(props => ({
  placeholder: props.name,
}))`
  width: 22rem;
  height: 3rem;
  border-radius: 6px;
  padding: 1rem 1rem;
  border: 1px solid var(--border);
  font-size: 1rem;

  ${mobileQuery} {
    width: 100%;
  }
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
