import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

function RecipeResultSkeleton() {
  return (
    <RecipeCardContainer aria-label="search result">
      {Array.from({ length: 20 }, (_, i) => i).map(val => (
        <Skeleton key={val} className="recipe-card-skeleton" />
      ))}
    </RecipeCardContainer>
  );
}

const RecipeCardContainer = styled.section`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(SEARCH_RECIPES_PAGE_SIZE * 2, 1fr);
  gap: 40px 20px;
  place-items: start center;
`;

export default RecipeResultSkeleton;
