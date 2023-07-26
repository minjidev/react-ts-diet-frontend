import React, { useState } from 'react';
import useCategorizedRecipes from '../../hooks/useCategorizedRecipes';
import { RecipeCard, RecipeDetailModal } from '../../components/index';
import styled, { css } from 'styled-components';
import { RecipeDetailModalState, Recipe } from '../../types/types';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { GoDot, GoDotFill } from 'react-icons/go';

const CAROUSEL_DATA_SIZE = 20;
const CAROUSEL_DATA_SIZE_PER_PAGE = 5;
const defaultModalContent = {
  id: '0',
  label: '',
  calories: 0,
  cuisineType: [],
  dishType: [],
  dietLabels: [],
  healthLabels: [],
  image: '',
  yield: 0,
  servings: 0,
  totalDaily: [], // 1일 섭취 비율
  totalNutrients: [], // 1회 섭취량
};

const Carousel = ({ category }: { category: string }) => {
  const { data } = useCategorizedRecipes(category);
  const [currentPage, setCurrentPage] = useState(0);

  const [recipeDetailModalState, setRecipeDetailModalState] = useState<RecipeDetailModalState>({
    isOpen: false,
    content: defaultModalContent,
  });

  const handleClick = (type: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'prev') setCurrentPage(currentPage - 1);
    if (type === 'next') setCurrentPage(currentPage + 1);
  };

  const handleModalClick = (newModalState: RecipeDetailModalState) => {
    setRecipeDetailModalState({ ...recipeDetailModalState, ...newModalState });
  };

  return (
    <>
      <Container id="container">
        <CarouselTitle>{category}</CarouselTitle>
        <CarouselWindow>
          <CarouselSlides id="recipe container" currentpage={currentPage}>
            {data?.slice(0, CAROUSEL_DATA_SIZE).map((recipe: Recipe) => (
              <RecipeCard key={recipe.label} recipe={recipe} onClick={handleModalClick} />
            ))}
          </CarouselSlides>

          <IconContainer id="icon container">
            <PrevIcon disabled={currentPage === 0} onClick={handleClick('prev')} />
            {Array.from({ length: 4 }).map((dot, index) => (
              <IndexEmpty key={index} />
            ))}
            <IndexFill currentpage={currentPage} />
            <NextIcon
              disabled={currentPage === Math.floor(CAROUSEL_DATA_SIZE / CAROUSEL_DATA_SIZE_PER_PAGE) - 1}
              onClick={handleClick('next')}
            />
          </IconContainer>
        </CarouselWindow>
      </Container>
      <RecipeDetailModal modalState={recipeDetailModalState} onClick={handleModalClick} />
    </>
  );
};

const Container = styled.div`
  margin: 2rem 0 6rem 0;
  width: 100%;
  height: 25rem;
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
  transition: transform 0.4s ease-in;
  transform: ${({ currentpage }) => `translate3D(calc(${currentpage} * -100%), 0, 0)`};
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
  currentpage: number;
}

const IndexFill = styled(GoDotFill)<IndexFillProps>`
  width: 1.3rem;
  position: absolute;
  top: 50%;
  left: calc(100% / 4 - 0.4rem);
  color: var(--font-color);

  transform: ${({ currentpage }) => `translate3d(calc(${currentpage}*140%), -50%, 0)`};
  transition: transform 0.4s ease-in-out;
`;

export default Carousel;
