import React from 'react';
import { styled } from 'styled-components';
import { useSearchRecipes } from '../../hooks';

interface SearchResult {
  keyword: string;
}

const SearchResult = ({ keyword }: SearchResult) => {
  const { data: recipes } = useSearchRecipes(keyword);
  console.log(recipes);

  return <>{!recipes?.length ? <Box /> : <Container>SearchResult</Container>}</>;
};

const Container = styled.section``;

const Box = styled.div`
  height: calc(100vh - (64px + 93px));
`;

export default SearchResult;
