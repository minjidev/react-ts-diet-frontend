import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface UseSearchHistoryProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const useSearchHistory = ({ setKeyword }: UseSearchHistoryProps) => {
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('keyword') ?? '[]'));
  const [, setSearchParams] = useSearchParams();

  const updateHistory = {
    addHistory: (keyword: string) => {
      const newHistory = history.includes(keyword)
        ? [keyword, ...history.filter((search: string) => search !== keyword)]
        : [keyword, ...history];

      localStorage.setItem('keyword', JSON.stringify(newHistory));
      setSearchParams({ keyword });
      setKeyword(keyword);
      setHistory(newHistory);
    },
    removeHistory: (keyword: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      const newHistory = history.filter((search: string) => search !== keyword);

      localStorage.setItem('keyword', JSON.stringify(newHistory));
      setHistory(newHistory);
    },
  };

  return { history, updateHistory };
};

export default useSearchHistory;
