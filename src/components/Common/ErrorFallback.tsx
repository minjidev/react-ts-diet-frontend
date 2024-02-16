import React from 'react';
import styled from 'styled-components';
import { useErrorBoundary } from 'react-error-boundary';
import { Button, CustomError } from '../index';
import { createErrorMessage } from '../../utils/index';

interface ErrorFallbackProps {
  error: CustomError;
  showFullErrorMessage?: boolean;
}

const ErrorFallback = ({ error, showFullErrorMessage = true }: ErrorFallbackProps) => {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Container>
      {showFullErrorMessage ? (
        <p> {createErrorMessage(error.response?.status)} </p>
      ) : (
        <p>Please Try Again</p>
      )}
      <ResetButton onClick={resetBoundary}>Retry</ResetButton>
    </Container>
  );
};

export const ErrorFallbackWithSimpleMessage = (props: ErrorFallbackProps) => {
  return <ErrorFallback {...props} showFullErrorMessage={false} />;
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
