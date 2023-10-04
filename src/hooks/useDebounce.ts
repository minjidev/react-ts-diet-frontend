import debounce from 'lodash/debounce';
import { useCallback } from 'react';

const useDebounce = (callback: () => void, delay: number) => {
  return useCallback(debounce(callback, delay), []);
};

export default useDebounce;
