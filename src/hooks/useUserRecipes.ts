import { useQuery } from '@tanstack/react-query';
import { getUserRecipes } from '../api/user';
import { userRecipesKey } from '../constants';

const useUserRecipes = (userId: string | undefined) => {
  return useQuery({
    queryKey: [...userRecipesKey, userId],
    queryFn: getUserRecipes(userId),
    enabled: !!userId,
  });
};

export default useUserRecipes;
