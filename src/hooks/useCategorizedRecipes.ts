import { useQuery } from '@tanstack/react-query';
import { categorizedRecipesKey } from '../constants/categorizedRecipesKey';
import { getRecipes } from '../api/recipes';
import { AxiosError } from 'axios';
import type { Recipe } from '../types/types';

const query = (category: string) => ({
  queryKey: [...categorizedRecipesKey, category],
  queryFn: getRecipes(category),
  onError: (error: AxiosError) => console.error(error),
  staleTime: 1000 * 60 * 5,
  cacheTime: Infinity,
});

const useCategorizedRecipes = (category: string) =>
  useQuery<Recipe[], AxiosError>([...categorizedRecipesKey, category], getRecipes(category), {
    onError: (error: AxiosError) => console.error(error),
    staleTime: 5000,
    cacheTime: Infinity,
  });

export default useCategorizedRecipes;