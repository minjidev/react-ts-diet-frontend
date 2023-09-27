import React, { useState, Suspense } from 'react';
import { SearchBar, RecipeResult } from '../components/index';
import RecipeResultSkeleton from '../components/skeleton/RecipeResultSkeleton';

const Search = () => {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <>
      <SearchBar keyword={keyword} setKeyword={setKeyword} />
      <Suspense fallback={<RecipeResultSkeleton />}>
        <RecipeResult />
      </Suspense>
    </>
  );
};

export default Search;
