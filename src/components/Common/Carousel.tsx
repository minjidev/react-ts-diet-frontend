import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { GoDot, GoDotFill } from 'react-icons/go';
import { useCategorizedRecipes, useObserver } from '../../hooks/index';
import { RecipeCard } from '../index';
import { Recipe } from '../../types/types';
import { capitalizeFirstLetter } from '../../utils/index';

const CAROUSEL_DATA_SIZE = 20;
const CAROUSEL_DATA_SIZE_PER_PAGE = 5;

const Carousel = ({ category }: { category: string }) => {
  const { data } = useCategorizedRecipes(category);
  const [currentPage, setCurrentPage] = useState(0);
  const observer = useObserver(data);

  const handleClick = (type: string) => () => {
    if (type === 'prev') setCurrentPage(currentPage - 1);
    if (type === 'next') setCurrentPage(currentPage + 1);
  };

  return (
    <Container aria-labelledby={category}>
      <CarouselTitle id={category}>{capitalizeFirstLetter(category)}</CarouselTitle>
      <CarouselWindow>
        <CarouselSlides $currentpage={currentPage}>
          {data
            ?.slice(0, CAROUSEL_DATA_SIZE)
            .map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.recipeId}
                recipe={recipe}
                $style={{ margin: '0 1rem' }}
                observer={observer}
              />
            ))}
        </CarouselSlides>
        <IconContainer>
          <PrevIcon
            disabled={currentPage === 0}
            role="button"
            onClick={handleClick('prev')}
            title="previous page"
          />
          {Array.from({ length: 4 }, (_, idx) => idx).map(val => (
            <IndexEmpty key={val} />
          ))}
          <IndexFill $currentpage={currentPage} />
          <NextIcon
            role="button"
            title="next page"
            disabled={
              currentPage === Math.floor(CAROUSEL_DATA_SIZE / CAROUSEL_DATA_SIZE_PER_PAGE) - 1
            }
            onClick={handleClick('next')}
          />
        </IconContainer>
      </CarouselWindow>
    </Container>
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

const CarouselSlides = styled.div<{ $currentpage: number }>`
  display: flex;
  transition: transform 0.4s ease-in;
  transform: ${({ $currentpage }) => `translate3D(calc(${$currentpage} * -100%), 0, 0)`};
`;

interface IconProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const IconStyle = css<IconProps>`
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? '0.2' : '')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? '' : '0.7')};
  }
`;

const PrevIcon = styled(BsFillArrowLeftCircleFill)<IconProps>`
  ${IconStyle}
`;

const NextIcon = styled(BsFillArrowRightCircleFill)<IconProps>`
  ${IconStyle}
`;

const IconContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  width: 12rem;
  border-radius: 1rem;
  border: 3px dashed black;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IndexEmpty = styled(GoDot)`
  width: 1.3rem;
  color: var(--font-color);
`;

interface IndexFillProps {
  $currentpage: number;
}

const IndexFill = styled(GoDotFill)<IndexFillProps>`
  width: 1.3rem;
  position: absolute;
  top: 50%;
  left: calc(100% / 4 - 0.4rem);
  color: var(--font-color);

  transform: ${({ $currentpage }) => `translate3d(calc(${$currentpage}*140%), -50%, 0)`};
  transition: transform 0.4s ease-in-out;
`;

export default Carousel;
