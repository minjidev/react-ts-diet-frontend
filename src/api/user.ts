import axios from 'axios';
import { UserRecipe } from '../types/types';

const URL = '/api/user';

const getUserRecipes = (userId: string | undefined) => async () => {
  const { data } = await axios.get(`${URL}/${userId}/recipes`);

  return data;
};

const postSavedRecipe = async (userRecipe: UserRecipe) => {
  const { data } = await axios.post(URL, userRecipe);

  return data;
};

const deleteSavedRecipe = async (userRecipeId: string | undefined) => {
  await axios.delete(`${URL}/${userRecipeId}`);
};

interface UserRecipesByDateProps {
  date: Date | undefined;
  userId: string | undefined;
}

const getSavedRecipesByDate =
  ({ date, userId }: UserRecipesByDateProps) =>
  async () => {
    const { data } = await axios.get(`${URL}/${userId}/recipes?date=${date ? date : new Date()}`);
    return data;
  };

export { getUserRecipes, postSavedRecipe, deleteSavedRecipe, getSavedRecipesByDate };
