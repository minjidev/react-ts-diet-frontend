import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { capitalizeFirstLetter } from '../../utils/index';

const CAROUSEL_DATA_SIZE_PER_PAGE = 5;

const CarouselSkeleton = ({ category }: { category: string }) => {
  return (
    <>
      <Container aria-labelledby={category}>
        <CarouselTitle id={category}>{capitalizeFirstLetter(category)}</CarouselTitle>
        <CarouselWindow>
          <CarouselSlides>
            {Array(CAROUSEL_DATA_SIZE_PER_PAGE)
              .fill(0)
              .map((_, idx) => (
                <SkeletonContainer key={idx}>
                  <CarouselRecipeCardSkeleton />
                </SkeletonContainer>
              ))}
          </CarouselSlides>
        </CarouselWindow>
      </Container>
    </>
  );
};

const Container = styled.section`
  margin: 2rem 0 6rem 0;
  width: 100%;
  height: 28rem;
  position: relative;
`;

const CarouselWindow = styled.div`
  overflow-x: hidden;
  width: calc(15rem * 5 + 1rem * 10 - 0.2rem);
  height: 100%;
  position: relative;
`;

const CarouselTitle = styled.h2`
  font-weight: 400;
  font-size: 2rem;
  padding: 1rem 0;
`;

const CarouselSlides = styled.div`
  display: flex;
`;

const SkeletonContainer = styled.div`
  padding: 0 1rem;
`;

const CarouselRecipeCardSkeleton = styled(Skeleton)`
  width: 15rem;
  min-width: 15rem;
  height: 15rem;
`;

export default CarouselSkeleton;
