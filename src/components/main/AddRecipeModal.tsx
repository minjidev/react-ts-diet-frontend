import React, { SyntheticEvent, useState } from 'react';
import { styled } from 'styled-components';
import { AddModalState } from '../../types/types';
import { AiOutlineClose } from 'react-icons/ai';
import DatePicker from '../modal/DatePicker';
import { Button } from '../../components/index';
import { postSavedRecipe } from '../../api/recipes';
interface AddModalProps {
  modalState: AddModalState;
  onAddModalClick: (newModalState: AddModalState) => void;
}

const AddRecipeModal = ({ modalState: { isOpen, content }, onAddModalClick }: AddModalProps) => {
  const [selected, setSelected] = useState<Date>();
  if (!isOpen) return;
  if (!content) return;

  const { user, recipe } = content;

  const handleCloseButtonClick = (e: React.MouseEvent) => {
    if (onAddModalClick) onAddModalClick({ isOpen: false });
  };
  /**
   * 추가 모달
   * - datepicker(오늘 기준 렌더)
   * - recipe label
   * - 저장하는 시간 같이 보내기
   */

  const handleConfirmButtonClick = async (e: React.MouseEvent) => {
    try {
      await postSavedRecipe({ user, recipe, date: selected, savedAt: Date.now() });
      handleCloseButtonClick(e);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <CloseButton onClick={handleCloseButtonClick} />
      <Text>Please select a date you would like to add this dish to your dashboard.</Text>
      <Divider />
      <Label>{recipe?.label}</Label>
      <RecipeImg
        src={recipe?.image}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = '/images/no_img.svg';
        }}
      />
      <DatePicker selected={selected} setSelected={setSelected} />

      <ConfirmButton onClick={handleConfirmButtonClick}>Confirm</ConfirmButton>
    </Container>
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
  height: 100%;
  border-radius: 1.2rem;
  object-fit: cover;
`;

const Container = styled.section`
  min-width: 24rem;
  max-width: 24rem;
  height: 44rem;

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
  width: 1.3rem;
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

const LabelText = styled.span`
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: var(--button-dark-point-color);
    opacity: 0.4;
    z-index: -10;
  }
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
    height: 5rem;
  }
`;

const Divider = styled.hr`
  height: 1px;
  width: 100%;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
  margin: 0;
`;

export default AddRecipeModal;
