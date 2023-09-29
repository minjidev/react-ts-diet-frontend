import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

function RecipeResultSkeleton() {
  return (
    <RecipeCardContainer aria-label="search result">
      {Array.from({ length: 20 }, (_, i) => i).map(val => (
        <RecipeCardSkeleton key={val} />
      ))}
    </RecipeCardContainer>
  );
}

const RecipeCardContainer = styled.section`
  width: 90%;
  height: calc(100vh - (64px + 93px));
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px 20px;
  place-items: start center;
`;

const RecipeCardSkeleton = styled(Skeleton)`
  width: 15rem;
  min-width: 15rem;
  height: 15rem;
  border-radius: 1rem;
`;

export default RecipeResultSkeleton;
