import React, { useState } from 'react';
import useCategorizedRecipes from '../../hooks/useCategorizedRecipes';
import { Button, RecipeCard } from '../../components/index';
import styled from 'styled-components';
import { Recipe } from '../../types/types';

const CAROUSEL_DATA_SIZE = 20;
const CAROUSEL_DATA_SIZE_PER_PAGE = 5;

const Carousel = ({ category }: { category: string }) => {
  const { data } = useCategorizedRecipes(category);
  const [currentPage, setCurrentPage] = useState(0);

  const handleClick = (type: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'prev') setCurrentPage(currentPage - 1);
    if (type === 'next') setCurrentPage(currentPage + 1);
  };

  return (
    <Container id="container">
      <CarouselTitle>{category}</CarouselTitle>
      <CarouselWindow>
        <CarouselSlides id="recipe container" currentpage={currentPage}>
          {data?.slice(0, CAROUSEL_DATA_SIZE).map((recipe: Recipe) => (
            <RecipeCard key={recipe.label} recipe={recipe} />
          ))}
        </CarouselSlides>
      </CarouselWindow>
      <ButtonContainer>
        {currentPage > 0 && <PrevButton onClick={handleClick('prev')}>Prev</PrevButton>}
        {currentPage < Math.floor(CAROUSEL_DATA_SIZE / CAROUSEL_DATA_SIZE_PER_PAGE) - 1 && (
          <NextButton onClick={handleClick('next')}>Next</NextButton>
        )}
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 2rem 0;
  width: 100%;
  height: 22rem;
  position: relative;
`;

const CarouselWindow = styled.div`
  overflow-x: hidden;
  width: calc(15rem * 5 + 1rem * 5 - 0.2rem);
  height: 100%;
  position: relative;
`;

const ButtonContainer = styled.div`
  background: white;
  cursor: pointer;

  position: absolute;
  top: 0;
  left: 10rem;
`;

const CarouselTitle = styled.div`
  font-weight: 400;
  font-size: 2rem;
  padding: 1rem 0;
`;

const CarouselSlides = styled.div<{ currentpage: number }>`
  display: flex;
  transition: transform 0.8s ease-in-out;
  transform: ${({ currentpage }) => `translate3D(calc(${currentpage} * -100%), 0, 0)`};
`;

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrevButton = styled(Button)<ButtonProps>``;

const NextButton = styled(Button)<ButtonProps>``;

export default Carousel;
