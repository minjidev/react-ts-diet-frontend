import React from 'react';
import { styled, css } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import { searchRecipesQuery } from '../../utils/query/searchRecipesQuery';

interface KeywordProps {
  title: string;
  label: string;
  keywords: string[];
  handleKeywordSearch: (keyword: string) => () => void;
  handleRemoveClick?: (keyword: string) => (e: React.MouseEvent) => void;
}

const Keyword = ({
  title,
  label,
  keywords,
  handleKeywordSearch,
  handleRemoveClick,
}: KeywordProps) => {
  const isRecent = title === 'Recent';
  const handleRemoveButtonClick = handleRemoveClick ?? (() => () => {});
  const queryClient = useQueryClient();

  const prefetchSearchResults = async (value: string) => {
    await queryClient.prefetchQuery({
      ...searchRecipesQuery(value),
      staleTime: 1000 * 10,
    });
  };

  const handleKeywordHover = (keyword: string) => async () => {
    // If already fetched the key, then don't prefetch it again
    const searchRecipes = queryClient.getQueryData(searchRecipesQuery(keyword).queryKey);
    if (searchRecipes) return;

    await prefetchSearchResults(keyword);
  };

  return (
    <Container aria-label={label}>
      <Subtitle $isrecent={isRecent}>{title}</Subtitle>
      <KeywordList>
        {keywords.map((keyword: string) => (
          <KeywordItem
            key={keyword}
            $isrecent={isRecent}
            onClick={handleKeywordSearch(keyword)}
            onMouseEnter={handleKeywordHover(keyword)}>
            {keyword}
            {isRecent && <RemoveButton onClick={handleRemoveButtonClick(keyword)} />}
          </KeywordItem>
        ))}
      </KeywordList>
    </Container>
  );
};

const iconStyle = css`
  width: 24px;
  height: 24px;
`;

const Container = styled.section`
  font-family: 'Rubik';
  width: 100%;
  padding: 20px 0;
  cursor: pointer;
`;

const Subtitle = styled.h2<{ $isrecent: boolean }>`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ $isrecent }) => ($isrecent ? '#008080' : '')};
`;

const KeywordList = styled.ul`
  margin: 0;
  padding: 12px 0;
  font-size: 50%;
  display: flex;
  flex-wrap: wrap;
`;

const KeywordItem = styled.li<{ $isrecent: boolean }>`
  display: flex;
  border-radius: 2rem;
  margin: 0 10px 12px 0;
  padding: 10px 12px;

  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ $isrecent }) => ($isrecent ? '1px solid var(--border);' : '#f4f4f4')};
  background: ${({ $isrecent }) => ($isrecent ? 'none' : '#f4f4f4')};
`;

const RemoveButton = styled(AiOutlineClose)`
  ${iconStyle}
  width: 16px;
  height: 16px;
  margin-left: 3px;
`;

export default Keyword;
