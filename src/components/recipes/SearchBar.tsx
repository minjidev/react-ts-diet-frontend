import React, { useRef, useEffect } from 'react';
import { styled, css } from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { KeywordList } from '../index';
import { searchRecipesQuery } from '../../utils/query/searchRecipesQuery';
import { useSearchHistory } from '../../hooks';

interface SearchProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ keyword, setKeyword }: SearchProps) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const {
    history,
    updateHistory: { addHistory, removeHistory },
  } = useSearchHistory({ setKeyword });

  const prefetchSearchResults = async (value: string) => {
    await queryClient.prefetchQuery({
      ...searchRecipesQuery(value),
      staleTime: 1000 * 10,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputValue = inputRef.current?.value;
    if (!inputValue) return;

    prefetchSearchResults(inputValue);
    addHistory(inputValue);
  };

  const handleKeywordSearch = (keyword: string) => async () => {
    if (!inputRef.current) return;

    inputRef.current.value = keyword;
    prefetchSearchResults(keyword);
    addHistory(keyword);
  };

  const handleClickCloseButton = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  useEffect(() => {
    if (inputRef.current) {
      const end = inputRef.current.value.length;
      inputRef.current.setSelectionRange(end, end);
      inputRef.current.focus();
    }
  }, [searchKeyword]);

  return (
    <Container aria-labelledby="rsearch">
      <Form name="rsearch" role="search" onSubmit={handleFormSubmit}>
        <Label id="rsearch" className="sr-only" htmlFor="rsearch-bar">
          Recipe Search
        </Label>
        <Search id="rsearch-bar" ref={inputRef} title="search bar icon" autoFocus />
        <SearchIcon aria-label="search recipes" />
        {keyword.length > 0 && (
          <ClearIcon aria-label="clear search" onClick={handleClickCloseButton} />
        )}
      </Form>
      {!searchKeyword?.length && (
        <KeywordList
          history={history}
          handleKeywordSearch={handleKeywordSearch}
          handleRemoveClick={removeHistory}
        />
      )}
    </Container>
  );
};

const iconStyle = css`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Container = styled.section`
  width: 100%;
  max-width: 800px;
  height: 4rem;
  position: relative;
  margin: 2rem;
  font-family: 'Rubik';

  position: relative;
`;

const Form = styled.form`
  height: 100%;
`;

const Label = styled.label``;

const Search = styled.input.attrs({
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

const ClearIcon = styled(AiOutlineClose)`
  ${iconStyle}
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 20px;
`;

const SearchIcon = styled(BsSearch)`
  ${iconStyle}
  position: absolute;
  left: 20px;
  transform: translateY(-50%);
  top: 50%;
`;

export default SearchBar;
