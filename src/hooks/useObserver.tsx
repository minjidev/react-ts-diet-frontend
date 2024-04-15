import { useState, useEffect } from 'react';
import { Recipe, SavedRecipesByDate } from '../types/types';

const useObserver = (data: Recipe[] | SavedRecipesByDate | undefined) => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data) {
      const observerInst = new IntersectionObserver(
        entries =>
          entries.forEach(entry => {
            const { isIntersecting, target: img } = entry;
            const highResSrc = img.getAttribute('data-src');
            if (isIntersecting && img instanceof HTMLImageElement && highResSrc) {
              img.src = img.dataset.src || '';
              observer?.unobserve(img);
              img.removeAttribute('data-src');
            }
          }),
        { rootMargin: '0px 0px 10px 0px' },
      );

      setObserver(observerInst);
    }
  }, [data, observer]);

  return observer;
};

export default useObserver;
