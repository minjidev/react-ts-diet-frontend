import React, { SyntheticEvent } from 'react';
import { styled } from 'styled-components';

import { Recipe } from '../../types/types';

const RecipeCard = ({
  recipe: { label, calories, cuisineType, dietLabels, image, totalDaily, totalNutrients },
}: {
  recipe: Recipe;
}) => {
  return (
    <RecipeCardContainer>
      <Text>{calories}kcal</Text>
      <RecipeImg
        src={image}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = '/images/no_img.svg';
        }}
      />
      <LabelContainer>
        <RecipeLabel>{label}</RecipeLabel>
        <Tags>
          {dietLabels?.map(label => (
            <Tag key={label}>#{label}</Tag>
          ))}
        </Tags>
      </LabelContainer>
    </RecipeCardContainer>
  );
};

const Text = styled.div`
  font-size: 1.2rem;
  width: 4.5rem;
  height: 2rem;

  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--border-secondary);
  border-radius: 1rem;
  z-index: 1;
`;

const RecipeCardContainer = styled.div`
  width: 15rem;
  min-width: 15rem;
  height: 14rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-image: linear-gradient(to bottom right, #fdfbfb, #ebedee);
  position: relative;
  border-radius: 1.2rem;
  cursor: pointer;

  margin-right: 1rem;
`;

const RecipeImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  /* object-fit: cover; */
  position: absolute;
  top: 0;
  left: 0;
`;

const LabelContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 105%;
  font-family: 'Rubik';
  word-wrap: break-word;
`;

const RecipeLabel = styled.div`
  font-size: 1.2rem;
  font-weight: 400;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Tags = styled.div`
  display: flex;
  width: 100%;
  margin: 0.3rem 0;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  width: 6rem;
  height: 1.6rem;
  font-size: 0.8rem;
  background: var(--border-secondary);
  margin: 0.3rem 0.3rem 0 0;
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

export default RecipeCard;
