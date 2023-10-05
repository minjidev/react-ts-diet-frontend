import React from 'react';
import { styled, css } from 'styled-components';

interface ButtonProps {
  children?: React.ReactNode;
  type?: string;
  onClick?: () => void;
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

const Button = ({ type = 'button', children, onClick, ...props }: ButtonProps) => {
  return (
    <CommonButton type={type} onClick={onClick} {...props}>
      {children}
    </CommonButton>
  );
};

const CommonButton = styled.button<ButtonProps>`
  ${buttonStyle}
`;

export default Button;
