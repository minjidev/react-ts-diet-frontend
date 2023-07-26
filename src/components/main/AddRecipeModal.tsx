import React from 'react';
import { styled } from 'styled-components';
import { AddModalState } from '../../types/types';
import { AiOutlineClose } from 'react-icons/ai';
import DatePicker from '../modal/DatePicker';

interface AddModalProps {
  modalState: AddModalState;
  onAddModalClick: (newModalState: AddModalState) => void;
}

const AddRecipeModal = ({ modalState: { isOpen, content }, onAddModalClick }: AddModalProps) => {
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

  return (
    <Container>
      <CloseButton onClick={handleCloseButtonClick} />

      <DatePicker />
    </Container>
  );
};

const Container = styled.section`
  min-width: 30rem;
  max-width: 30rem;
  height: 30rem;

  background: #fff;
  border: 1px solid #eee;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 1rem;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  padding: 1rem;
  z-index: 999;

  font-family: 'Rubik';
  font-size: 1.4rem;
`;

const CloseButton = styled(AiOutlineClose)`
  width: 1.3rem;
  display: block;

  cursor: pointer;
  position: absolute;
  right: 0.8rem;
  top: 0.8rem;
`;

const Label = styled.h2`
  font-size: 1.4rem;
  font-size: 24px;
  font-weight: 400;
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

const RecipeEmoji = styled.span`
  margin: 0 0.2rem;
`;

export default AddRecipeModal;
