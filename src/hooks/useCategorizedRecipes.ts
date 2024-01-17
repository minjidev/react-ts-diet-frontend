import { useQuery } from '@tanstack/react-query';
import { categorizedRecipesKey } from '../constants/index';
import { getRecipes } from '../api/recipes';
import type { RecipeData } from '../types/types';
import { processRecipesData } from '../utils/index';

const useCategorizedRecipes = (category: string) =>
  useQuery({
    queryKey: [...categorizedRecipesKey, category],
    queryFn: getRecipes(category),
    select: (data: RecipeData) => processRecipesData(data),
    staleTime: 1000 * 60 * 10,
    cacheTime: Infinity,
  });

export default useCategorizedRecipes;
