import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { Styles } from 'styled-components/dist/types';
import { createPortal } from 'react-dom';
import { Dimmed } from '../../styles/styled/Common';

interface ModalProps {
  children: React.ReactNode;
  close: () => void;
  styles?: Styles<object>;
}

const Modal = ({ children, close, styles }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      {createPortal(
        <>
          <Container $styles={styles}>
            <CloseButton onClick={close} id="close button" />
            {children}
          </Container>
          <Dimmed onClick={close} />
        </>,
        document.body,
      )}
    </>
  );
};

const containerStyles = (props: { $styles?: Styles<object> }) => css`
  ${props.$styles}
`;

const Container = styled.section<{ $styles?: Styles<object> }>`
  min-width: 24rem;
  max-width: 24rem;

  background: #fff;
  border: 1px solid #eee;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
  justify-content: center;

  ${containerStyles}
`;

const CloseButton = styled(AiOutlineClose)`
  width: 2rem;
  display: block;
  margin-left: auto;

  cursor: pointer;
`;

export default Modal;
