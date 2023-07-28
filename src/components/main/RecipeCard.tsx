import React, { SyntheticEvent, useState } from 'react';
import { styled } from 'styled-components';
import { RecipeDetailModalState, Recipe, AddModalState, User } from '../../types/types';
import { BsFillPlusCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
  onRecipeModalClick: (newModalState: RecipeDetailModalState) => void;
  onAddModalClick: (newModalState: AddModalState) => void;
}

const RecipeCard = ({ recipe, onRecipeModalClick, onAddModalClick }: RecipeCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const handleAddButtonClick = (e: React.MouseEvent) => {
    if (!user) navigate('/signin');
    const newModalState = { isOpen: true, content: { user, recipe } };
    onAddModalClick(newModalState);

    setIsSaved(true);
  };

  const handleImgClick = (e: React.MouseEvent) => {
    const newModalState = { isOpen: true, content: recipe };
    onRecipeModalClick(newModalState);
  };

  const { id, label, calories, cuisineType, dishType, dietLabels, healthLabels, image, totalDaily, totalNutrients } =
    recipe;
  return (
    <>
      <RecipeCardContainer id="recipe-card" data-id={id}>
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
          {!isSaved ? <AddButton onClick={handleAddButtonClick} /> : <SavedButton />}
        </AddButtonContainer>
      </RecipeCardContainer>
    </>
  );
};

const RecipeCardContainer = styled.div`
  width: 15rem;
  min-width: 15rem;
  height: 14rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-image: linear-gradient(to bottom right, #fdfbfb, #ebedee);
  border-radius: 1.2rem;
  margin: 0 1rem;

  position: relative;
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
`;

const RecipeImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1.2rem;
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;

  cursor: pointer;
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

const AddButton = styled(BsFillPlusCircleFill)`
  width: 2rem;
  color: var(--border-secondary);
`;

const SavedButton = styled(BsFillCheckCircleFill)`
  width: 2rem;
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
  right: 0.4rem;

  cursor: pointer;
`;

export default RecipeCard;
