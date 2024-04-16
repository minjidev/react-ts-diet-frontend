import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

interface EagerImgProps {
  imgInfo: {
    low: string;
    high: string;
    label: string;
  };
  handleImgClick: (e: React.MouseEvent) => void;
}

const LazyImg = ({ imgInfo, handleImgClick }: EagerImgProps) => {
  return (
    <RecipeImg
      src={imgInfo.high}
      alt={imgInfo.label}
      onClick={handleImgClick}
      onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = '/images/no_img.svg';
      }}
    />
  );
};

const RecipeImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
  object-fit: cover;

  cursor: pointer;
`;

export default LazyImg;
