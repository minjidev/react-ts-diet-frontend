import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getUserRecipes } from '../api/user';
import { UserRecipe } from '../types/types';
import { userRecipesKey } from '../constants';

const useUserRecipes = (userId: string | undefined) => {
  if (!userId) return;
  return useQuery<UserRecipe[], AxiosError>({
    queryKey: [...userRecipesKey, userId],
    queryFn: getUserRecipes(userId),
    onError: (error: AxiosError) => console.error(error),
  });
};

export default useUserRecipes;
