import React from 'react';
import { styled } from 'styled-components';
import { useSearchRecipes } from '../../hooks';
import RecipeCard from '../main/RecipeCard';

interface SearchResult {
  keyword: string;
}

const SearchResult = ({ keyword }: SearchResult) => {
  const { data: recipes } = useSearchRecipes(keyword);
  console.log(recipes);

  return (
    <>
      {!recipes?.length ? (
        <Box />
      ) : (
        <Container aria-label="search result">
          {recipes.map(recipe => (
            <RecipeCard
              key={recipe.recipeId}
              recipe={recipe}
              $style={{ height: '100%', border: 'none', boxShadow: 'none', cardBorderRadius: '1rem' }}
            />
          ))}
        </Container>
      )}
    </>
  );
};

const Container = styled.section`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 20px;
  place-items: start center;
`;

const Box = styled.div`
  height: calc(100vh - (64px + 93px));
`;

export default SearchResult;
