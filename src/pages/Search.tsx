import React, { useState } from 'react';
import { SearchBar, RecipeResult } from '../components/index';

const Search = () => {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <RecipeResult keyword={keyword} />
    </>
  );
};

export default Search;
