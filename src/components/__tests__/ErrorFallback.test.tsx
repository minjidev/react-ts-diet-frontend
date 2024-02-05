import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import * as reactErrorBoundary from 'react-error-boundary';
import { render, screen } from '../../test-utils/testing-library-utils';
import ErrorFallback from '../common/ErrorFallback';

describe('#ErrorFallback', () => {
  describe('#Event', () => {
    // mock useErrorBoundary
    vi.mock('react-error-boundary', async importOriginal => {
      const mod = await importOriginal<typeof import('react-error-boundary')>();
      return {
        ...mod,
        useErrorBoundary: vi
          .fn()
          .mockReturnValue({ resetBoundary: vi.fn(), showBoundary: vi.fn() }),
      };
    });

    it.only('calls resetBoundary when the Retry button is clicked.', async () => {
      const user = userEvent.setup();

      const error = {
        name: 'CustomError',
        message: '',
        response: {
          data: {},
          status: 500,
          headers: '',
        },
      };

      render(<ErrorFallback error={error} />);

      const retryButton = screen.getByRole('button', { name: /retry/i });
      await user.click(retryButton);

      expect(reactErrorBoundary.useErrorBoundary().resetBoundary).toHaveBeenCalled();
    });
  });
});
