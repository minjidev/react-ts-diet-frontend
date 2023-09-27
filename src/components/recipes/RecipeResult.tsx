import React, { useState, useRef, useEffect, Suspense } from 'react';
import { styled } from 'styled-components';
import { useSearchRecipes } from '../../hooks';
import RecipeCard from '../main/RecipeCard';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { searchRecipesKey } from '../../constants';

const RecipeResult = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const queryClient = useQueryClient();
  const { data: recipes } = useSearchRecipes(searchKeyword);

  useEffect(() => {
    queryClient.invalidateQueries([...searchRecipesKey, searchKeyword]);
  }, [searchKeyword]);

  return (
    <>
      {!recipes?.length ? (
        <Box>{searchKeyword ? 'No Result' : ''}</Box>
      ) : (
        <Container>
          <RecipeCardContainer aria-label="search result">
            {recipes?.map(recipe => (
              <RecipeCard
                key={recipe.recipeId}
                recipe={recipe}
                $style={{ height: '100%', border: 'none', boxShadow: 'none', cardBorderRadius: '1rem' }}
              />
            ))}
          </RecipeCardContainer>
        </Container>
      )}
    </>
  );
};

const Container = styled.div``;

const RecipeCardContainer = styled.section`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(SEARCH_RECIPES_PAGE_SIZE * 2, 1fr);
  gap: 40px 20px;
  place-items: start center;
`;

const Box = styled.div`
  height: calc(100vh - (64px + 93px));
`;

export default RecipeResult;
