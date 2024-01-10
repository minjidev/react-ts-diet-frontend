import React from 'react';
import styled from 'styled-components';
import { useErrorBoundary } from 'react-error-boundary';
import { Button, CustomError } from '../index';

const ErrorFallback = ({ error }: { error: CustomError }) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Container>
      <p> Error: {error.message} </p>
      <ResetButton onClick={resetBoundary}>Reset</ResetButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResetButton = styled(Button)`
  && {
    width: 7rem;
    height: 3rem;
    color: #fff;
    font-weight: 500;
    font-size: 1.4rem;
    border-radius: 1rem;
    background-color: var(--button-point-color);
  }
`;

export default ErrorFallback;
