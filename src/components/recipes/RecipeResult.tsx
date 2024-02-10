import React from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useSearchRecipes, useObserver } from '../../hooks';
import { RecipeCard } from '../index';

const RecipeResult = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const { data: recipes } = useSearchRecipes(searchKeyword);
  const observer = useObserver(recipes);

  return (
    <>
      {!recipes?.length ? (
        <Box>{searchKeyword ? 'No Result' : ''}</Box>
      ) : (
        <RecipeCardContainer aria-labelledby="search-result">
          <h2 id="search-result" className="sr-only">
            Recipe Search Result
          </h2>
          {recipes?.map((recipe, idx) => (
            <RecipeCard
              key={recipe.recipeId}
              recipe={recipe}
              $style={{ height: '100%', border: 'none', borderRadius: '1rem' }}
              observer={observer}
              shouldEagerLoad={idx < 10}
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
