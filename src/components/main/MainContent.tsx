import React, { Suspense } from 'react';
import styled from 'styled-components';
import Carousel from '../common/Carousel';
import CarouselSkeleton from '../skeleton/CarouselSkeleton';
import { categories } from '../../constants/index';
import { useObserver } from '../../hooks';

const MainContent = () => {
  const observer = useObserver();

  return (
    <Container aria-label="main-content">
      {categories.map(category => (
        <Suspense key={category} fallback={<CarouselSkeleton category={category} />}>
          <Carousel category={category} observer={observer} />
        </Suspense>
      ))}
    </Container>
  );
};

const Container = styled.section``;

export default MainContent;
