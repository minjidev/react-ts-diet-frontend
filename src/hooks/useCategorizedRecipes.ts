import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { categorizedRecipesKey } from '../constants/index';
import { getRecipes } from '../api/recipes';
import type { Recipe } from '../types/types';

const useCategorizedRecipes = (category: string) =>
  useQuery<Recipe[], AxiosError>({
    queryKey: [...categorizedRecipesKey, category],
    queryFn: getRecipes(category),
    onError: (error: AxiosError) => console.error(error),
    staleTime: 1000 * 60 * 10,
    cacheTime: Infinity,
  });

export default useCategorizedRecipes;
