import React from 'react';
import { styled } from 'styled-components';
import { useSearchRecipes } from '../../hooks';

interface SearchResult {
  keyword: string;
}

const SearchResult = ({ keyword }: SearchResult) => {
  const recipes = useSearchRecipes(keyword);

  return <Container>SearchResult</Container>;
};

const Container = styled.section``;

export default SearchResult;
