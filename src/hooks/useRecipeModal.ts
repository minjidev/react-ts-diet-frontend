import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../recoil/atoms/userState';
import { useModal } from './index';
import { Recipe } from '../types/types';

const useRecipeModal = (recipe: Recipe) => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const {
    isOpen: isRecipeModalOpen,
    open: openRecipeModal,
    close: closeRecipeModal,
    content: recipeContent,
    setContent: setRecipeContent,
  } = useModal<Recipe>();

  const {
    isOpen: isAddModalOpen,
    open: openAddModal,
    close: closeAddModal,
    content: addContent,
    setContent: setAddContent,
  } = useModal<Recipe>();

  const {
    isOpen: isCancelModalOpen,
    open: openCancelModal,
    close: closeCancelModal,
    content: cancelContent,
    setContent: setCancelContent,
  } = useModal<Recipe>();

  const handleAddButtonClick = () => {
    if (!user) navigate('/login');

    openAddModal();
    setAddContent(recipe);
  };

  const handleCancelButtonClick = () => {
    if (!user) navigate('/login');

    openCancelModal();
    setCancelContent(recipe);
  };

  const handleImgClick = () => {
    openRecipeModal();

    setRecipeContent(recipe);
  };

  return {
    recipeModalState: {
      isRecipeModalOpen,
      recipeContent,
      closeRecipeModal,
    },
    addModalState: {
      isAddModalOpen,
      addContent,
      closeAddModal,
    },
    cancelModalState: {
      isCancelModalOpen,
      cancelContent,
      closeCancelModal,
    },
    actionHandlers: {
      handleAddButtonClick,
      handleCancelButtonClick,
      handleImgClick,
    },
  };
};

export default useRecipeModal;
