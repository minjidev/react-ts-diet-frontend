import React from 'react';
import { styled } from 'styled-components';
import { useController, Control } from 'react-hook-form';

type FieldValues = {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
};

interface InputProps {
  name: 'email' | 'password' | 'passwordConfirm' | 'username';
  control: Control<FieldValues>;
  trigger: any;
  disabled?: boolean;
  onUpdate?: (isPasswordValidated: boolean) => void;
}

const Input = ({ name, control, trigger, onUpdate, disabled = false }: InputProps) => {
  const {
    field: { value, onChange },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

  React.useEffect(() => {
    if (name !== 'password') return;

    if (onUpdate) onUpdate(invalid);
  }, [invalid]);

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
            trigger(name);
          }}
          disabled={disabled}
        />
        {error && !disabled && <Error>{error?.message}</Error>}
      </TextInputField>
    </>
  );
};

const Label = styled.label`
  font-size: 1.2rem;
`;

const TextInputField = styled.div`
  margin: 0.2rem 0 1rem 0;
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

const Error = styled.div`
  font-family: 'Rubik';
  font-size: 0.8rem;
  font-weight: 400;
  margin-right: auto;
  margin-top: 0.4rem;
  padding-left: 0.4rem;
  color: var(--red);
`;

export default Input;
