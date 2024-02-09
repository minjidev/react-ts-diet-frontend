import React, { useRef, useEffect, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface LazyImgProps {
  imgInfo: {
    low: string;
    high: string;
    label: string;
  };
  handleImgClick: (e: React.MouseEvent) => void;
  observer: IntersectionObserver | null;
}

const LazyImg = ({ imgInfo, handleImgClick, observer }: LazyImgProps) => {
  const imgRef = useRef(null);

  useEffect(() => {
    if (observer && imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [observer]);

  return (
    <RecipeImg
      ref={imgRef}
      loading="lazy"
      src={imgInfo.low || '/images/placeholder.png'}
      data-src={imgInfo.high}
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
