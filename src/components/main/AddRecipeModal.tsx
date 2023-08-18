import React, { SyntheticEvent, useState } from 'react';
import { styled } from 'styled-components';
import { AddModalContent } from '../../types/types';
import { Button, DatePicker, Modal } from '../../components/index';
import { postSavedRecipe } from '../../api/recipes';
import { Divider } from '../../styles/styled/Common';
import { userState } from '../../recoil/atoms/userState';
import { useRecoilState } from 'recoil';

interface AddModalProps {
  content: AddModalContent | undefined;
  close: () => void;
}

const AddRecipeModal = ({ content, close }: AddModalProps) => {
  if (!content) return;

  const [selected, setSelected] = useState<Date>();
  const [user, setUser] = useRecoilState(userState);

  const { user: userData, recipe } = content;

  const handleConfirmButtonClick = async (e: React.MouseEvent) => {
    if (!user) return;

    try {
      const newlySavedUser = {
        user: userData!.email,
        recipe,
        date: selected ? selected : new Date(),
        savedAt: Date.now(),
      };

      await postSavedRecipe(newlySavedUser);

      const newUser = {
        ...user,
        savedRecipes: user.savedRecipes ? [...user.savedRecipes, newlySavedUser] : [newlySavedUser],
      };

      setUser(newUser);

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
  width: 100%;
  height: 18rem;
  border-radius: 1.2rem;
  object-fit: cover;
`;

const Label = styled.h2`
  font-size: 1.4rem;
  font-size: 24px;
  font-weight: 400;
  font-family: 'Londrina Solid';

  margin: 1rem 0 0.6rem 0;
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
