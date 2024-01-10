import React from 'react';
import { styled, css } from 'styled-components';
import { BsFillPlusCircleFill, BsTrash3Fill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Styles } from 'styled-components/dist/types';
import { Recipe, UserRecipe } from '../../types/types';
import { userState } from '../../recoil/atoms/userState';
import { useModal, useUserRecipes } from '../../hooks';
import { RecipeDetailModal, AddRecipeModal, CancelRecipeModal, LazyImg } from '../index';

type RecipeCardStyles = {
  cardBorderRadius?: string;
} & Styles<object>;

interface RecipeCardProps {
  recipe: Recipe;
  selected?: Date | undefined;
  $style?: RecipeCardStyles;
  observer: IntersectionObserver | null;
}

const RecipeCard = ({ recipe, selected, $style, observer }: RecipeCardProps) => {
  const user = useRecoilValue(userState);
  const userRecipes = useUserRecipes(user?._id)?.data;
  const navigate = useNavigate();

  const {
    isOpen: isRecipeModalOpen,
    open: openRecipeModal,
    close: closeRecipeModal,
    content: recipeContent,
    setContent: setRecipeContent,
  } = useModal<Recipe>();

  const {
    isOpen: isAddModalOpen,
    open: openAddModal,
    close: closeAddModal,
    content: addContent,
    setContent: setAddContent,
  } = useModal<Recipe>();

  const {
    isOpen: isCancelModalOpen,
    open: openCancelModal,
    close: closeCancelModal,
    content: cancelContent,
    setContent: setCancelContent,
  } = useModal<Recipe>();

  const checkRecipeSaved = (recipeId: string) =>
    userRecipes?.find((userRecipe: UserRecipe) => userRecipe.recipe.recipeId === recipeId);

  const handleAddButtonClick = () => {
    if (!user) navigate('/signin');

    openAddModal();
    setAddContent(recipe);
  };

  const handleCancelButtonClick = () => {
    if (!user) navigate('/signin');

    openCancelModal();
    setCancelContent(recipe);
  };

  const handleImgClick = () => {
    openRecipeModal();

    setRecipeContent(recipe);
  };

  const { recipeId, label, calories, dietLabels, images, image } = recipe;
  const imgSrc = {
    default: images?.THUMBNAIL?.url || images?.SMALL?.url,
    dataSrc: images?.REGULAR?.url,
  };

  const userRecipeId = userRecipes?.find(userRecipe => userRecipe.recipe.recipeId === recipeId)
    ?._id;
  return (
    <>
      <RecipeCardContainer data-id={recipeId} $style={$style}>
        <Text>{calories}kcal</Text>
        <LazyImg
          imgSrc={imgSrc}
          image={image}
          alt={label}
          handleImgClick={handleImgClick}
          observer={observer}
        />
        <LabelContainer>
          <RecipeTitle>{label}</RecipeTitle>
          <Tags>{dietLabels?.map(label => <Tag key={label}>#{label}</Tag>)}</Tags>
        </LabelContainer>

        <AddButtonContainer>
          {!checkRecipeSaved(recipeId) ? (
            <AddButton onClick={handleAddButtonClick} />
          ) : (
            <SavedButton onClick={handleCancelButtonClick} />
          )}
        </AddButtonContainer>
      </RecipeCardContainer>
      {isRecipeModalOpen && <RecipeDetailModal content={recipeContent} close={closeRecipeModal} />}
      {isAddModalOpen && <AddRecipeModal recipe={addContent} close={closeAddModal} />}
      {isCancelModalOpen && (
        <CancelRecipeModal
          recipe={cancelContent}
          close={closeCancelModal}
          selected={selected}
          userRecipeId={userRecipeId}
        />
      )}
    </>
  );
};

const containerStyles = (props: { $style?: RecipeCardStyles }) => css`
  ${props.$style}

  ${RecipeImg} {
    border-radius: ${props.$style?.cardBorderRadius};
  }
`;

const RecipeCardContainer = styled.article<{ $style?: RecipeCardStyles }>`
  width: 15rem;
  min-width: 15rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 1.2rem;
  position: relative;

  ${containerStyles}
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

const RecipeTitle = styled.h3`
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

  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 4px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const AddButton = styled(BsFillPlusCircleFill)`
  width: 100%;
  height: 100%;
  color: var(--border-secondary);
`;

const SavedButton = styled(BsTrash3Fill)`
  width: 70%;
  height: 70%;
  color: var(--border-secondary);
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
