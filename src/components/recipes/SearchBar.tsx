import React, { useRef, useState, useEffect } from 'react';
import { styled, css } from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';
import { Keyword } from '../index';

interface SearchProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const HISTORY_LIST_LEN = 8;
const dietCategory = [
  'balanced',
  'high-fiber',
  'high-protein',
  'low-carb',
  'low-fat',
  'low-sodium',
];
const healthCategory = [
  'alcohol-free',
  'dairy-free',
  'gluten-free',
  'keto-friendly',
  'Mediterranean',
];

const dishTypeCategory = ['Bread', 'Cereal', 'Dessert', 'Drinks', 'Salad', 'Pancakes'];

const SearchBar = ({ keyword, setKeyword }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('keyword') ?? '[]'));
  const [searchParams, setSearchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const historyDisplay = history.slice(0, HISTORY_LIST_LEN);

  const updateHistory = (keyword: string) => {
    const newHistory = history.includes(keyword)
      ? [keyword, ...history.filter((search: string) => search !== keyword)]
      : [keyword, ...history];

    localStorage.setItem('keyword', JSON.stringify(newHistory));
    setKeyword(keyword);
    setHistory(newHistory);
    setSearchParams({ keyword });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.value) return;

    updateHistory(inputRef.current.value);
  };

  const handleClickCloseButton = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  const handleRemoveClick = (keyword: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const newHistory = history.filter((search: string) => search !== keyword);

    localStorage.setItem('keyword', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const handleKeywordSearch = (keyword: string) => () => {
    updateHistory(keyword);
    if (inputRef.current) inputRef.current.value = keyword;
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
        <Recommendation aria-label="search recommendation">
          {history.length > 0 && (
            <Keyword
              title="Recent"
              label="recent search"
              keywords={historyDisplay}
              handleKeywordSearch={handleKeywordSearch}
              handleRemoveClick={handleRemoveClick}
            />
          )}
          <Keyword
            title="Diet"
            label="diet category"
            keywords={dietCategory}
            handleKeywordSearch={handleKeywordSearch}
          />
          <Keyword
            title="Health"
            label="health category"
            keywords={healthCategory}
            handleKeywordSearch={handleKeywordSearch}
          />
          <Keyword
            title="Dish Type"
            label="dish type category"
            keywords={dishTypeCategory}
            handleKeywordSearch={handleKeywordSearch}
          />
        </Recommendation>
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

const Recommendation = styled.section`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
`;

export default SearchBar;
