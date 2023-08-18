import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useCategorizedRecipes, useModal } from '../../hooks/index';
import { RecipeCard, RecipeDetailModal, AddRecipeModal } from '../../components/index';
import { Recipe, AddModalContent } from '../../types/types';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { GoDot, GoDotFill } from 'react-icons/go';

const CAROUSEL_DATA_SIZE = 20;
const CAROUSEL_DATA_SIZE_PER_PAGE = 5;

const Carousel = ({ category }: { category: string }) => {
  const { data } = useCategorizedRecipes(category);
  const [currentPage, setCurrentPage] = useState(0);
  const {
    isOpen: isRecipeModalOpen,
    open: openRecipeModal,
    close: closeRecipeModal,
    content: recipeContent,
    setContent: setRecipeContent,
  } = useModal<Recipe>();

  const {
    isOpen: isAddModalOpen,
    open: openAddModal,
    close: closeAddModal,
    content: addContent,
    setContent: setAddContent,
  } = useModal<AddModalContent>();

  const handleClick = (type: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type === 'prev') setCurrentPage(currentPage - 1);
    if (type === 'next') setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Container id="container">
        <CarouselTitle>{category}</CarouselTitle>
        <CarouselWindow>
          <CarouselSlides id="recipe container" $currentpage={currentPage}>
            {data?.slice(0, CAROUSEL_DATA_SIZE).map((recipe: Recipe) => (
              <RecipeCard
                key={recipe.recipeId}
                recipe={recipe}
                onRecipeModalClick={setRecipeContent}
                onAddModalClick={setAddContent}
                openAddModal={openAddModal}
                openRecipeModal={openRecipeModal}
                margin="0 1rem"
              />
            ))}
          </CarouselSlides>

          <IconContainer id="icon container">
            <PrevIcon disabled={currentPage === 0} onClick={handleClick('prev')} />
            {Array.from({ length: 4 }).map((dot, index) => (
              <IndexEmpty key={index} />
            ))}
            <IndexFill $currentpage={currentPage} />
            <NextIcon
              disabled={currentPage === Math.floor(CAROUSEL_DATA_SIZE / CAROUSEL_DATA_SIZE_PER_PAGE) - 1}
              onClick={handleClick('next')}
            />
          </IconContainer>
        </CarouselWindow>
      </Container>
      {isRecipeModalOpen && <RecipeDetailModal content={recipeContent} close={closeRecipeModal} />}
      {isAddModalOpen && <AddRecipeModal content={addContent} close={closeAddModal} />}
    </>
  );
};

const Container = styled.div`
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

const CarouselTitle = styled.div`
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
