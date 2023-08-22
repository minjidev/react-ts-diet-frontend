import React, { useState } from 'react';
import { Search, SearchResult } from '../components/index';

const Recipes = () => {
  const [keyword, setKeyword] = useState<string>('');
  return (
    <>
      <Search setKeyword={setKeyword} />
      <SearchResult keyword={keyword} />
    </>
  );
};

export default Recipes;
