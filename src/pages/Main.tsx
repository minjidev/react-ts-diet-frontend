import React, { Suspense } from 'react';
import { styled } from 'styled-components';
import Carousel from '../components/common/Carousel';
import CarouselSkeleton from '../components/skeleton/CarouselSkeleton';
import { categories } from '../constants';

const Main = () => {
  return (
    <Container aria-labelledby="categorized recipes">
      <Title id="categorized recipes" className="sr-only">
        Categorized Recipes
      </Title>
      {categories.map(category => (
        <Suspense key={category} fallback={<CarouselSkeleton category={category} />}>
          <Carousel category={category} />
        </Suspense>
      ))}
    </Container>
  );
};

const Container = styled.section``;

const Title = styled.h2``;

export default Main;
