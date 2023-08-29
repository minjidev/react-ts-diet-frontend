import React, { useRef, useState } from 'react';
import { styled, css } from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useSearchParams } from 'react-router-dom';

interface SearchProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

const SearchBar = ({ keyword, setKeyword }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('keyword') ?? '[]'));
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.value) return;
    const keyword = inputRef.current.value;

    // 이미 있으면 삭제하고 push
    const newHistory = history.includes(keyword)
      ? [keyword, ...history.filter((search: string) => search !== keyword)]
      : [keyword, ...history];
    console.log('new history: ', newHistory);
    localStorage.setItem('keyword', JSON.stringify(newHistory));
    setKeyword(keyword);
    setHistory(newHistory);
    setSearchParams({ keyword: keyword });
  };

  const handleClickCloseButton = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  const handleRecentSearch = (keyword: string) => () => {
    setKeyword(keyword);
    setHistory([keyword, ...history]);
    localStorage.setItem('keyword', JSON.stringify(history));
    setSearchParams({ keyword: keyword });
  };

  return (
    <>
      <Container aria-labelledby="rsearch">
        <Form name="rsearch" role="search" onSubmit={handleFormSubmit}>
          <Label id="rsearch" className="sr-only" htmlFor="rsearch-bar">
            Recipe Search
          </Label>
          <Search id="rsearch-bar" ref={inputRef} title="search bar icon" />
          <SearchIcon aria-label="search recipes" />
          {keyword.length > 0 && <ClearIcon aria-label="clear search" onClick={handleClickCloseButton} />}
        </Form>
      </Container>
    </>
  );
};

const iconStyle = css`
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const Container = styled.section`
  width: 100%;
  max-width: 600px;
  height: 4rem;
  position: relative;
  margin: 2rem;
  font-family: 'Rubik';
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
