import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { useSearchRecipes } from '../../hooks';
import RecipeCard from '../main/RecipeCard';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { searchRecipesKey } from '../../constants';

interface SearchResult {
  keyword: string;
}

const SEARCH_RECIPES_PAGE_SIZE = 10;
const RecipeResult = ({ keyword }: SearchResult) => {
  const { data: recipes } = useSearchRecipes(keyword);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const queryClient = useQueryClient();

  const lastPage = Math.ceil(recipes?.length! / SEARCH_RECIPES_PAGE_SIZE);
  const pagedRecipes = recipes?.slice(0, (page - 1) * SEARCH_RECIPES_PAGE_SIZE + SEARCH_RECIPES_PAGE_SIZE);

  useEffect(() => {
    setPage(1);
    queryClient.invalidateQueries([...searchRecipesKey, searchKeyword]);
  }, [searchKeyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPage(page + 1);
        }
      });
    });

    if (page === 1 && recipes?.length && observerRef.current) {
      observer.observe(observerRef.current);
    }

    if (page === lastPage) {
      if (observerRef.current) observer.unobserve(observerRef.current);
    }
  }, [recipes, page]);
  console.log(recipes?.length);

  return (
    <>
      {!recipes?.length ? (
        <Box>{keyword.length > 0 ? 'No Result' : ''}</Box>
      ) : (
        <Container>
          <RecipeCardContainer aria-label="search result">
            {pagedRecipes?.map(recipe => (
              <RecipeCard
                key={recipe.recipeId}
                recipe={recipe}
                $style={{ height: '100%', border: 'none', boxShadow: 'none', cardBorderRadius: '1rem' }}
              />
            ))}
          </RecipeCardContainer>
          {page < lastPage && (
            <Observer ref={observerRef}>
              <Loader src="/images/loading.gif" alt="loading" />
            </Observer>
          )}
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

const Observer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.img`
  background-color: white;
`;

export default RecipeResult;