import React, { useRef, useEffect } from 'react';
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
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/images/no_img.svg';
  };

  useEffect(() => {
    const currentImgRef = imgRef.current;

    if (observer && currentImgRef) {
      observer.observe(currentImgRef);
    }

    return () => {
      if (observer && currentImgRef) {
        observer.unobserve(currentImgRef);
      }
    };
  }, [observer, imgRef]);

  return (
    <RecipeImg
      ref={imgRef}
      loading="lazy"
      src={imgInfo.low || '/images/placeholder.png'}
      data-src={imgInfo.high}
      alt={imgInfo.label}
      onClick={handleImgClick}
      onError={handleImgError}
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
