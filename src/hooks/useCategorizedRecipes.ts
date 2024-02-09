/* eslint-disable @typescript-eslint/return-await */
import { useQuery } from '@tanstack/react-query';
import type { RecipeData } from '../types/types';
import { processRecipesData } from '../utils/index';
import { categorizedRecipesQuery } from '../utils/query/categorizedRecipesQuery';

const useCategorizedRecipes = (category: string) =>
  useQuery({
    ...categorizedRecipesQuery(category),
    select: (data: RecipeData) => processRecipesData(data),
    staleTime: 1000 * 60 * 10,
    cacheTime: Infinity,
  });

export default useCategorizedRecipes;
