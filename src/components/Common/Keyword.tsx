import React from 'react';
import { styled, css } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

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

  return (
    <Container aria-label={label}>
      <Subtitle $isrecent={isRecent}>{title}</Subtitle>
      <KeywordList>
        {keywords.map((keyword: string) => (
          <KeywordItem key={keyword} $isrecent={isRecent} onClick={handleKeywordSearch(keyword)}>
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
