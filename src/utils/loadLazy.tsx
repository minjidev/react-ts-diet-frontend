import React, { Suspense, lazy } from 'react';
import { Loader } from '../components/index';

const loadLazy = (element: string) => {
  const LazyElement = lazy(() => import(`../pages/${element}.tsx`));

  return (
    <Suspense fallback={<Loader />}>
      <LazyElement />
    </Suspense>
  );
};

export default loadLazy;
