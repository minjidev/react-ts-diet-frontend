import React, { SyntheticEvent, useState } from 'react';
import { styled } from 'styled-components';
import { RecipeDetailModalState, Recipe, AddModalState } from '../../types/types';
import { BsFillPlusCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  onRecipeModalClick?: (newModalState: RecipeDetailModalState) => void;
  onAddModalClick?: (newModalState: AddModalState) => void;
  onRemoveClick?: () => void;
  margin?: string;
}

const RecipeCard = ({ recipe, onRecipeModalClick, onAddModalClick, margin }: RecipeCardProps) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const checkRecipeSaved = (label: string) =>
    user?.savedRecipes?.find(savedRecipe => savedRecipe.recipe.label === label);

  const handleAddButtonClick = (e: React.MouseEvent) => {
    if (!user) navigate('/signin');

    const newModalState = { isOpen: true, content: { user, recipe } };

    if (onAddModalClick) onAddModalClick(newModalState);
  };

  const handleCancelButtonClick = () => {};

  const handleImgClick = (e: React.MouseEvent) => {
    const newModalState = { isOpen: true, content: recipe };
    if (onRecipeModalClick) onRecipeModalClick(newModalState);
  };

  const { id, label, calories, cuisineType, dishType, dietLabels, healthLabels, image, totalDaily, totalNutrients } =
    recipe;
  return (
    <>
      <RecipeCardContainer id="recipe-card" data-id={id} margin={margin}>
        <Text>{calories}kcal</Text>
        <RecipeImg
          src={image}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = '/images/no_img.svg';
          }}
          onClick={handleImgClick}
        />
        <LabelContainer>
          <RecipeLabel>{label}</RecipeLabel>
          <Tags>
            {dietLabels?.map(label => (
              <Tag key={label}>#{label}</Tag>
            ))}
          </Tags>
        </LabelContainer>

        <AddButtonContainer>
          {!checkRecipeSaved(label) ? <AddButton onClick={handleAddButtonClick} /> : <SavedButton />}
        </AddButtonContainer>
      </RecipeCardContainer>
    </>
  );
};

const RecipeCardContainer = styled.div<{ margin?: string }>`
  width: 15rem;
  min-width: 15rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 1.2rem;

  position: relative;
  margin: ${({ margin }) => (margin ? margin : 0)};
`;

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
  font-family: 'Londrina Solid';
  font-weight: 400;
`;

const RecipeImg = styled.img`
  width: 15rem;
  height: 15rem;
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
  object-fit: cover;

  cursor: pointer;
`;

const LabelContainer = styled.div`
  width: 100%;
  font-family: 'Rubik';
  word-wrap: break-word;
  padding: 0.2rem 1rem;
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
  margin: 0.3rem 0.3rem 0.3rem 0;
  border-radius: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 4px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const AddButton = styled(BsFillPlusCircleFill)`
  width: 100%;
  height: 100%;
  color: var(--border-secondary);
`;

const SavedButton = styled(BsFillCheckCircleFill)`
  width: 100%;
  height: 100%;
  color: var(--border-secondary);

  // 저장 취소 onClick
`;

const AddButtonContainer = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #000;
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RecipeCard;
