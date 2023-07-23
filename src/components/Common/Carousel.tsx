import React, { useState } from 'react';
import useCategorizedRecipes from '../../hooks/useCategorizedRecipes';
import { RecipeCard } from '../../components/index';
import styled from 'styled-components';
import { Recipe } from '../../types/types';

const Carousel = ({ category }: { category: string }) => {
  const { data } = useCategorizedRecipes(category);
  const [currentPage, setCurrentPage] = useState(0);
  console.log(data);

  return (
    <Container id="container">
      <CarouselTitle>{category}</CarouselTitle>
      <RecipeCardsContainer id="recipe container">
        {data?.slice(currentPage, 5 * (currentPage + 1)).map((recipe: Recipe) => (
          <RecipeCard key={recipe.label} recipe={recipe} />
        ))}
      </RecipeCardsContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

const CarouselTitle = styled.div`
  font-weight: 400;
  font-size: 2rem;
  padding: 1rem 0;
`;

const RecipeCardsContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  height: 22rem;
  justify-content: space-between;
`;

export default Carousel;
