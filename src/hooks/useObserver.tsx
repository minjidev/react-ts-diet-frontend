import { useState, useEffect } from 'react';
import { Recipe, SavedRecipesByDate } from '../types/types';

const useObserver = (data: Recipe[] | SavedRecipesByDate | undefined) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data) {
      const observerInst = new IntersectionObserver(
        entries =>
          entries.forEach(entry => {
            const { isIntersecting, target } = entry;

            if (isIntersecting && target instanceof HTMLImageElement) {
              target.src = target.dataset.src || '';
            }
          }),
        { rootMargin: '0px 0px 10px 0px' }
      );

      setObserver(observerInst);
    }
  }, [data]);

  return observer;
};

export default useObserver;
