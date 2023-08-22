import React from 'react';
import { styled } from 'styled-components';
import { Recipe } from '../../types/types';
import { Button } from '../index';
import { Modal } from '../index';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { deleteSavedRecipe } from '../../api/recipes';
import { useQueryClient } from '@tanstack/react-query';
import { savedRecipesByDateKey } from '../../constants/index';
import { formatDate } from '../../utils/formatDate';

interface CancelModalProps {
  recipe: Recipe | undefined;
  close: () => void;
  selected: Date | undefined;
}

const CancelRecipeModal = ({ recipe, close, selected }: CancelModalProps) => {
  const [user, setUser] = useRecoilState(userState);
  const queryClient = useQueryClient();
  const handleConfirmButtonClick = (recipeId: string | undefined) => async () => {
    try {
      if (!user) return;
      if (!recipeId) return;

      await deleteSavedRecipe(recipeId);
      const savedRecipes = user.savedRecipes!.filter(saved => saved.recipe.recipeId !== recipeId);

      const newUser = {
        ...user,
        savedRecipes,
      };

      setUser(newUser);
      queryClient.invalidateQueries([
        ...savedRecipesByDateKey,
        selected ? formatDate(selected) : formatDate(new Date()),
      ]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal close={close}>
      <Text>
        <Center>
          Do you want to remove <Label>{recipe?.label}</Label> from your meals?
        </Center>
      </Text>
      <ButtonContainer>
        <CancelButton onClick={close}>Cancel</CancelButton>
        <ConfirmButton onClick={handleConfirmButtonClick(recipe?.recipeId)}>Confirm</ConfirmButton>
      </ButtonContainer>
    </Modal>
  );
};

const Text = styled.div`
  font-size: 1.1rem;
  line-height: 140%;
  margin: 1rem 0;
  color: #555555;
  display: flex;
  align-items: center;
`;

const Center = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 70%;
`;

const ConfirmButton = styled(Button)<{ onClick: () => void }>`
  && {
    color: #fff;
    font-weight: 500;
    border-radius: 1rem;
    background-color: var(--button-point-color);
    width: 6rem;
    height: 3rem;
  }
`;

const CancelButton = styled(Button)<{ onClick: () => void }>`
  && {
    color: #fff;
    font-weight: 500;
    border-radius: 1rem;
    background-color: black;
    width: 6rem;
    height: 3rem;
  }
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  padding: 1rem 0;
  text-decoration: underline;
`;

export default CancelRecipeModal;
