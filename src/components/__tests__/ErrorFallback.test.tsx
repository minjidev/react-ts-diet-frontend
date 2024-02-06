import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { useErrorBoundary } from 'react-error-boundary';
import { render, screen } from '../../test-utils/testing-library-utils';
import ErrorFallback from '../common/ErrorFallback';

// mock useErrorBoundary
vi.mock('react-error-boundary', () => ({
  useErrorBoundary: vi.fn(),
}));

describe('#ErrorFallback', () => {
  const error = {
    name: 'CustomError',
    message: 'An error occurred',
    response: {
      data: {},
      status: 500,
      headers: '',
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useErrorBoundary).mockReturnValue({
      resetBoundary: vi.fn(),
      showBoundary: vi.fn(),
    });
  });

  describe('#Render', () => {
    it('displays the corresponding error message based showFullErrorMessage pro', () => {
      // displays error message based on error status if showFullErrorMessage is true
      const { rerender } = render(<ErrorFallback error={error} showFullErrorMessage />);
      const errorMessage = screen.getByText(/Something went wrong on our end/i);
      expect(errorMessage).toBeInTheDocument();

      // displays default error message if showFullErrorMessage is false
      rerender(<ErrorFallback error={error} showFullErrorMessage={false} />);
      const defaultErrorMessage = screen.getByText(/Please Try Again/i);
      expect(defaultErrorMessage).toBeInTheDocument();
    });

    it('displays the default error message', () => {
      render(<ErrorFallback error={error} showFullErrorMessage />);
      const errorMessage = screen.getByText(/Something went wrong on our end/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('#Event', () => {
    it('calls resetBoundary when the Retry button is clicked.', async () => {
      const user = userEvent.setup();
      render(<ErrorFallback error={error} />);

      const retryButton = screen.getByRole('button', { name: /retry/i });
      await user.click(retryButton);

      expect(useErrorBoundary().resetBoundary).toHaveBeenCalled();
    });
  });
});
