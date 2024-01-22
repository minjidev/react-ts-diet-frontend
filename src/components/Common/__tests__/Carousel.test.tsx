import React, { Suspense } from 'react';
import { describe, expect, it } from 'vitest';
import { HttpResponse, delay, http } from 'msw';
import { ErrorBoundary } from 'react-error-boundary';
import { render, screen } from '../../../test-utils/testing-library-utils';
import { server } from '../../../tools/tests/server';

import { Carousel, CarouselSkeleton, ErrorFallback } from '../../index';

describe('Carousel', () => {
  describe('#Request', () => {
    const recipeBaseURL = import.meta.env.VITE_EDAMAM_BASE_URL;
    it('displays CarouselSkeleton when recipe data is loading', async () => {
      server.use(
        http.get(recipeBaseURL, async () => {
          await delay();

          return HttpResponse.json({ state: 200 });
        }),
      );

      render(
        <Suspense fallback={<CarouselSkeleton category="balanced" />}>
          <Carousel category="balanced" />,
        </Suspense>,
      );

      const carouselSkeleton = await screen.findByRole('region', { name: /skeleton/i });
      expect(carouselSkeleton).toBeInTheDocument();
    });

    it('displays error message when too many requests', async () => {
      server.use(
        http.get(recipeBaseURL, () => {
          return new HttpResponse(null, { status: 429 });
        }),
      );

      render(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Carousel category="balanced" />
        </ErrorBoundary>,
      );

      const errorMessage = await screen.findByText('moving super fast!', { exact: false });
      expect(errorMessage).toBeInTheDocument();
    });

    it.only('displays No Recipe Available when no data', async () => {
      server.use(
        http.get(recipeBaseURL, () => {
          return HttpResponse.json([]);
        }),
      );

      render(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Carousel category="balanced" />
        </ErrorBoundary>,
      );

      const noRecipeMessage = await screen.findByText('No Recipe Available');
      expect(noRecipeMessage).toBeInTheDocument();
    });

    it('displays Carousel with RecipeCards when recipe data is ready', async () => {
      render(<Carousel category="balanced" />);
      const CAROUSEL_DATA_SIZE = 20;

      const carousel = await screen.findByRole('region', { name: /recipes-carousel/i });
      expect(carousel).toBeInTheDocument();

      const recipeCards = await screen.findAllByRole('article');
      expect(recipeCards).toHaveLength(CAROUSEL_DATA_SIZE);
    });
  });

  describe('#Render', () => {
    it('renders carousel with navigation buttons', async () => {
      render(<Carousel category="balanced" />);

      const carousel = await screen.findByRole('region', { name: /balanced/i });
      const navigationButtons = screen.getAllByRole('button', { name: /page$/i });

      expect(carousel).toBeInTheDocument();
      expect(navigationButtons).toHaveLength(2);
    });

    it('renders carousel title based on category argument.', async () => {
      const { rerender } = render(<Carousel category="balanced" />);

      const balancedCarouselTitle = await screen.findByRole('heading', { name: /balanced/i });
      expect(balancedCarouselTitle.textContent).toBe('Balanced');

      rerender(<Carousel category="high-protein" />);
      const highProteinCarouselTitle = await screen.findByRole('heading', {
        name: /high-protein/i,
      });
      expect(highProteinCarouselTitle.textContent).toBe('High-protein');
    });
  });
});
