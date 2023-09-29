import React, { useRef, useEffect, SyntheticEvent } from 'react';
import styled from 'styled-components';

interface LazyImgProps {
  imgSrc: {
    default: string;
    dataSrc: string;
  };
  alt: string;
  handleImgClick: (e: React.MouseEvent) => void;
  observer: IntersectionObserver | null;
}

function LazyImg({ imgSrc, alt, handleImgClick, observer }: LazyImgProps) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (observer && observerRef.current) {
      observer && observer.observe(observerRef.current);
    }
  }, [observer]);

  return (
    <RecipeImg
      ref={observerRef}
      src={'/images/placeholder.png'}
      alt={alt}
      onClick={handleImgClick}
      data-src={imgSrc.dataSrc}
      onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = '/images/no_img.svg';
      }}
    />
  );
}

const RecipeImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
  object-fit: cover;

  cursor: pointer;
`;

export default LazyImg;
