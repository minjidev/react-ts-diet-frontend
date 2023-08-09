import React, { SyntheticEvent, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { AddModalState } from '../../types/types';
import { AiOutlineClose } from 'react-icons/ai';
import DatePicker from '../modal/DatePicker';
import { Button } from '../../components/index';
import { postSavedRecipe } from '../../api/recipes';
import { Divider } from '../../styles/styled/Common';
import { userState } from '../../recoil/atoms/userState';
import { useRecoilState } from 'recoil';

interface AddModalProps {
  modalState: AddModalState;
  onAddModalClick: (newModalState: AddModalState) => void;
}

const AddRecipeModal = ({ modalState: { isOpen, content }, onAddModalClick }: AddModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [selected, setSelected] = useState<Date>();
  const [user, setUser] = useRecoilState(userState);
  if (!isOpen) return;
  if (!content) return;

  const { user: userData, recipe } = content;

  const handleCloseButtonClick = (e: React.MouseEvent) => {
    if (onAddModalClick) onAddModalClick({ isOpen: false });
  };

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

      handleCloseButtonClick(e);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Container>
        <CloseButton onClick={handleCloseButtonClick} id="close button" />
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
      </Container>
      <Dimmed />
    </>
  );
};

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--border-secondary);
  opacity: 0.1;
  z-index: 99;
`;

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

const Container = styled.section`
  min-width: 24rem;
  max-width: 24rem;

  background: #fff;
  border: 1px solid #eee;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 1rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 2rem;
  z-index: 999;

  font-family: 'Rubik';
  font-size: 1.4rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled(AiOutlineClose)`
  width: 2rem;
  display: block;
  margin-left: auto;

  cursor: pointer;
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
