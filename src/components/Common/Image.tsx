import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';

interface ImgProp {
  imgSrc: string;
  alt: string;
  handleImgClick?: (e: React.MouseEvent) => void;
}

const Image = ({ imgSrc, alt, handleImgClick }: ImgProp) => {
  return (
    <div>
      <RecipeImg
        src={imgSrc || '/images/placeholder.png'}
        alt={alt}
        onClick={handleImgClick}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = '/images/no_img.svg';
        }}
      />
    </div>
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

export default Image;
