import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  visible: boolean;
}

const Modal = ({ children, visible, ...props }: ModalProps) => {};

export default Modal;
