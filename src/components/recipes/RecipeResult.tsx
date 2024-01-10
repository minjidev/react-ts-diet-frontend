import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchRecipes, useObserver } from '../../hooks';
import { RecipeCard } from '../index';
import { searchRecipesKey } from '../../constants';

const RecipeResult = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const { data: recipes } = useSearchRecipes(searchKeyword);
  const observer = useObserver(recipes);

  useEffect(() => {
    queryClient.invalidateQueries([...searchRecipesKey, searchKeyword]);
  }, [searchKeyword]);

  return (
    <>
      {!recipes?.length ? (
        <Box>{searchKeyword ? 'No Result' : ''}</Box>
      ) : (
        <RecipeCardContainer aria-labelledby="search-result">
          <h2 id="search-result" className="sr-only">
            Recipe Search Result
          </h2>
          {recipes?.map(recipe => (
            <RecipeCard
              key={recipe.recipeId}
              recipe={recipe}
              $style={{ height: '100%', border: 'none', borderRadius: '1rem' }}
              observer={observer}
            />
          ))}
        </RecipeCardContainer>
      )}
    </>
  );
};

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
