import React, { Suspense } from 'react';
import styled from 'styled-components';
import Carousel from '../common/Carousel';
import CarouselSkeleton from '../skeleton/CarouselSkeleton';
import { categories } from '../../constants/index';

const MainContent = () => {
  return (
    <Container aria-label="main-content">
      {categories.map(category => (
        <Suspense key={category} fallback={<CarouselSkeleton category={category} />}>
          <Carousel category={category} />
        </Suspense>
      ))}
    </Container>
  );
};

const Container = styled.section``;

export default MainContent;
