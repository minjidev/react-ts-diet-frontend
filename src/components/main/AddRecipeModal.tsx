import React, { SyntheticEvent, useState } from 'react';
import { styled } from 'styled-components';
import { Recipe } from '../../types/types';
import { Button, DatePicker, Modal } from '../../components/index';
import { postSavedRecipe } from '../../api/user';
import { Divider } from '../../styles/styled/Common';
import { userState } from '../../recoil/atoms/userState';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { userRecipesKey } from '../../constants';

interface AddModalProps {
  recipe: Recipe | undefined;
  close: () => void;
}

const AddRecipeModal = ({ recipe, close }: AddModalProps) => {
  if (!recipe) return;

  const [selected, setSelected] = useState<Date>();
  const user = useRecoilValue(userState);
  const queryClient = useQueryClient();

  const handleConfirmButtonClick = async (e: React.MouseEvent) => {
    if (!user) return;

    try {
      const newlySavedRecipe = {
        userId: user._id,
        recipe,
        savedAt: selected ?? new Date(),
      };

      await postSavedRecipe(newlySavedRecipe);
      queryClient.invalidateQueries([...userRecipesKey, user._id]);

      close();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal close={close} styles={{ minWidth: '24rem', maxWidth: '24rem' }}>
      <Text>Please select a date you would like to add this dish to your dashboard.</Text>
      <Divider />
      <Label>{recipe?.label}</Label>
      <RecipeImg
        src={recipe?.image}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = '/images/no_img.svg';
        }}
      />
      <DatePicker selected={selected} setSelected={setSelected} direction="top" />
      <ConfirmButton onClick={handleConfirmButtonClick}>Confirm</ConfirmButton>
    </Modal>
  );
};

const Text = styled.div`
  font-size: 1.1rem;
  line-height: 140%;
  margin: 1rem 0;
  color: #555555;
`;

const RecipeImg = styled.img`
  min-width: 18rem;
  height: 18rem;
  border-radius: 1.2rem;
  object-fit: cover;
`;

const Label = styled.h2`
  font-size: 1.4rem;
  font-size: 24px;
  font-weight: 400;
  font-family: 'Londrina Solid';

  margin: 2rem 0;
`;

interface ConfirmButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

const ConfirmButton = styled(Button)<ConfirmButtonProps>`
  && {
    color: #fff;
    font-weight: 500;
    border-radius: 1rem;
    background-color: var(--button-point-color);
    width: 6rem;
    height: 3rem;
  }
`;

export default AddRecipeModal;
