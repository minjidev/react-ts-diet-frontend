import React from 'react';
import { vi, describe, expect, it } from 'vitest';
import { render, screen } from '../../../test-utils/testing-library-utils';
import Carousel from '../Carousel';

describe('Carousel', () => {
  describe('#Render', () => {
    it('renders carousel with navigation buttons', () => {
      render(<Carousel category="balanced" />);

      const carousel = screen.getByRole('region', { name: /balanced/i });
      const navigationButtons = screen.getAllByRole('button', { name: /page$/i });

      expect(carousel).toBeInTheDocument();
      expect(navigationButtons).toHaveLength(2);
    });

    it('displays carousel title based on category argument.', () => {
      render(<Carousel category="balanced" />);

      const carouselTitle = screen.getByRole('heading', { name: /balanced/i });

      expect(carouselTitle.textContent).toBe('Balanced');
    });

    it('renders RecipeCard components when data is ready', async () => {
      const IntersectionObserverMock = vi.fn(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        takeRecords: vi.fn(),
        unobserver: vi.fn(),
      }));

      vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
      render(<Carousel category="balanced" />);
      const CAROUSEL_DATA_SIZE = 20;

      await screen.findByText('Balanced');

      const recipeCards = await screen.findAllByRole('article');

      expect(recipeCards).toHaveLength(CAROUSEL_DATA_SIZE);
    });
  });
});
