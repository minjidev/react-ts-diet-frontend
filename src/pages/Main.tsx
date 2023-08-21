import React from 'react';
import { styled } from 'styled-components';
import Carousel from '../components/common/Carousel';

const Main = () => {
  return (
    <Container aria-labelledby="categorized recipes">
      <Title id="categorized recipes" className="sr-only">
        Categorized Recipes
      </Title>
      <Carousel category="balanced" />
      <Carousel category="high-protein" />
      <Carousel category="low-fat" />
      <Carousel category="low-carb" />
    </Container>
  );
};

const Container = styled.section``;

const Title = styled.h2``;

export default Main;
