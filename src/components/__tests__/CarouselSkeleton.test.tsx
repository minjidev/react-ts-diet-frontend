import React from 'react';
import { describe, expect, it } from 'vitest';
import CarouselSkeleton from '../skeleton/CarouselSkeleton';
import { render, screen } from '../../test-utils/testing-library-utils';

describe('CarouselSkeleton', () => {
  describe('#Render', () => {
    it('renders carousel skeleton', async () => {
      render(<CarouselSkeleton category="balanced" />);

      const carouselSkeleton = await screen.findByRole('region', { name: /skeleton/i });
      expect(carouselSkeleton).toBeInTheDocument();
    });
  });
});
