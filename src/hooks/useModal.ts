import { useState } from 'react';

const useModal = <ContentType>() => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ContentType>();

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, open, close, content, setContent };
};

export default useModal;
