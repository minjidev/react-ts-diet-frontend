import React, { useRef } from 'react';
import { styled } from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { getSearchRecipes } from '../../api/recipes';

interface SearchProps {
  setKeyword: (keyword: string) => void;
}

const Search = ({ setKeyword }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current || !inputRef.current.value) return;
    setKeyword(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
    <Container aria-labelledby="rsearch">
      <Form name="rsearch" role="search" onSubmit={handleFormSubmit}>
        <Label id="rsearch" className="sr-only" htmlFor="rsearch-bar">
          Recipe Search
        </Label>
        <SearchBar id="rsearch-bar" ref={inputRef} title="search bar icon" />
        <SearchIcon />
      </Form>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  max-width: 600px;
  height: 4rem;
  position: relative;
  margin: 2rem;
`;

const Form = styled.form`
  height: 100%;
`;

const Label = styled.label``;

const SearchBar = styled.input.attrs({
  type: 'TextLink',
  placeholder: 'Search your meal !',
})`
  padding: 0 56px;
  font-size: 1.3rem;
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 3px black solid;
  outline: none;
`;

const SearchIcon = styled(BsSearch)`
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  left: 20px;
  width: 24px;
  height: 24px;
`;

export default Search;
