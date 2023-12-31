import { useQuery } from '@tanstack/react-query';
import { getUserRecipes } from '../api/user';
import { AxiosError } from 'axios';
import { UserRecipe } from '../types/types';
import { userRecipesKey } from '../constants';

const useUserRecipes = (userId: string | undefined) => {
  if (!userId) return;
  return useQuery<UserRecipe[], AxiosError>([...userRecipesKey, userId], getUserRecipes(userId), {
    onError: (error: AxiosError) => console.error(error),
  });
};

export default useUserRecipes;
