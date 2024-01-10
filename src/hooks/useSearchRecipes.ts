import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { searchRecipesKey } from '../constants';
import { Recipe } from '../types/types';
import { getSearchRecipes } from '../api/recipes';

const useSearchRecipes = (keyword: string | null) =>
  useQuery<Recipe[], AxiosError>({
    queryKey: [...searchRecipesKey, keyword],
    queryFn: getSearchRecipes(keyword),
    onError: (error: AxiosError) => console.error(error),
    staleTime: 1000 * 60 * 3,
    cacheTime: Infinity,
  });

export default useSearchRecipes;
