import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { Keyword } from '../index';
import { keywordsInfo } from '../../constants/index';
import { SearchKeywords } from '../../types/types';

interface KeywordListProps {
  history: string[];
  handleKeywordSearch: (keyword: string) => () => void;
  handleRemoveClick: (keyword: string) => (e: React.MouseEvent) => void;
}

const { HISTORY_LIST_LEN, categories, searchKeywords } = keywordsInfo;

const KeywordList = ({ history, handleKeywordSearch, handleRemoveClick }: KeywordListProps) => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');
  const historyDisplay = history.slice(0, HISTORY_LIST_LEN);

  return (
    <>
      {!searchKeyword?.length && (
        <Recommendation aria-label="search recommendation">
          {history.length > 0 && (
            <Keyword
              title="Recent"
              label="recent search"
              keywords={historyDisplay}
              handleKeywordSearch={handleKeywordSearch}
              handleRemoveClick={handleRemoveClick}
            />
          )}
          <>
            {searchKeywords.map(({ title, label }: SearchKeywords) => (
              <Keyword
                key={title}
                title={title}
                label={label}
                keywords={categories[label]}
                handleKeywordSearch={handleKeywordSearch}
              />
            ))}
          </>
        </Recommendation>
      )}
    </>
  );
};

const Recommendation = styled.section`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
`;

export default KeywordList;
