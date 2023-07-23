import React, { Children } from 'react';
import { styled, css } from 'styled-components';

interface ButtonProps {
  children?: React.ReactNode;
  type?: string;
}

const buttonStyle = css`
  background: transparent;
  border: none;
  border-radius: 1rem;
  width: 5rem;
  height: 2.4rem;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Rubik';
  color: #000;
`;

const Button = ({ type = 'button', children, ...props }: ButtonProps) => {
  return (
    <CommonButton type={type} {...props}>
      {children}
    </CommonButton>
  );
};

const CommonButton = styled.button<ButtonProps>`
  ${buttonStyle}
`;

export default Button;
