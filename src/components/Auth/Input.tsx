import React from 'react';
import { styled } from 'styled-components';
import { useController, Control } from 'react-hook-form';

type FieldValues = {
  email: string;
  password: string;
  confirm: string;
  username: string;
};

interface InputProps {
  name: 'email' | 'password' | 'confirm' | 'username';
  control: Control<FieldValues>;
  trigger: any;
}

const Input = ({ name, control, trigger }: InputProps) => {
  const {
    field: { value, onChange },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
  });

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
              trigger('confirm');
            }
            trigger(name);
          }}
        />
        {error && <Error>{error?.message}</Error>}
      </TextInputField>
    </>
  );
};

const Label = styled.label`
  font-size: 1.2rem;
`;

const TextInputField = styled.div`
  margin: 0.1rem 0.1rem 1.2rem 0.1rem;
`;

const TextInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: props.name,
}))`
  max-width: 366px;
  width: 20rem;
  height: 54px;
  border-radius: 6px;
  padding: 1rem 1rem;
  border: 1px solid var(--border);
  font-size: 1rem;
`;

const Error = styled.span`
  font-family: 'Rubik';
  font-size: 0.8rem;
  font-weight: 300;
  margin-right: auto;
  padding-left: 0.4rem;
`;

export default Input;
