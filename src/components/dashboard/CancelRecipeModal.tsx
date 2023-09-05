import React from 'react';
import { styled } from 'styled-components';
import { Recipe } from '../../types/types';
import { Button } from '../index';
import { Modal } from '../index';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { deleteSavedRecipe } from '../../api/user';
import { useQueryClient } from '@tanstack/react-query';
import { savedRecipesByDateKey, userRecipesKey } from '../../constants';
import { formatDate } from '../../utils/formatDate';

interface CancelModalProps {
  recipe: Recipe | undefined;
  close: () => void;
  selected: Date | undefined;
  userRecipeId: string | undefined;
}

const CancelRecipeModal = ({ recipe, close, selected, userRecipeId }: CancelModalProps) => {
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();
  const handleConfirmButtonClick = async () => {
    try {
      if (!user) return;

      await deleteSavedRecipe(userRecipeId);

      queryClient.invalidateQueries([...userRecipesKey, user._id]);
      queryClient.invalidateQueries([...savedRecipesByDateKey, user._id, formatDate(selected ?? new Date())]);
      close();
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
        <ConfirmButton onClick={handleConfirmButtonClick}>Confirm</ConfirmButton>
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
