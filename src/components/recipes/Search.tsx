import React, { useRef } from 'react';
import { styled, css } from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

interface SearchProps {
  setKeyword: (keyword: string) => void;
}

const Search = ({ setKeyword }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current || !inputRef.current.value) return;
    setKeyword(inputRef.current.value);
  };

  const handleClickCloseButton = () => {
    if (!inputRef.current) return;
    inputRef.current.value = '';
  };

  return (
    <Container aria-labelledby="rsearch">
      <Form name="rsearch" role="search" onSubmit={handleFormSubmit}>
        <Label id="rsearch" className="sr-only" htmlFor="rsearch-bar">
          Recipe Search
        </Label>
        <SearchBar id="rsearch-bar" ref={inputRef} title="search bar icon" />
        <SearchIcon aria-label="search recipes" />
        <ClearIcon aria-label="clear search" onClick={handleClickCloseButton} />
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

const iconStyle = css`
  cursor: pointer;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  width: 24px;
  height: 24px;
`;

const SearchIcon = styled(BsSearch)`
  ${iconStyle}
  left: 20px;
`;

const ClearIcon = styled(AiOutlineClose)`
  ${iconStyle}
  right: 20px;
`;

export default Search;
