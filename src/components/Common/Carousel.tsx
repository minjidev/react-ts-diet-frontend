import React, { useState } from 'react';
import useCategorizedRecipes from '../../hooks/useCategorizedRecipes';
import { Button, RecipeCard } from '../../components/index';
import styled from 'styled-components';
import { Recipe } from '../../types/types';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

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
        {currentPage > 0 && (
          <IconBg type="prev">
            {' '}
            <PrevIcon onClick={handleClick('prev')} />
          </IconBg>
        )}
        {currentPage < Math.floor(CAROUSEL_DATA_SIZE / CAROUSEL_DATA_SIZE_PER_PAGE) - 1 && (
          <IconBg type="next">
            <NextIcon onClick={handleClick('next')} />
          </IconBg>
        )}
      </CarouselWindow>
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
  width: calc(15rem * 5 + 1rem * 10 - 0.2rem);
  height: 100%;
  position: relative;
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

interface IconProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PrevIcon = styled(BsFillArrowLeftCircleFill)<IconProps>`
  position: absolute;
  z-index: 10;
  cursor: pointer;
`;

const NextIcon = styled(BsFillArrowRightCircleFill)<IconProps>`
  position: absolute;
  z-index: 10;
  cursor: pointer;
`;

const IconBg = styled.div<{ type: string }>`
  width: 4rem;
  height: 4rem;
  background: white;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 34%;
  left: ${({ type }) => (type === 'prev' ? '-1rem' : '')};
  right: ${({ type }) => (type === 'next' ? '-1rem' : '')};
`;

export default Carousel;
