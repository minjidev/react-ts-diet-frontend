import { useQuery } from '@tanstack/react-query';
import { RecipeData } from '../types/types';
import { processRecipesData } from '../utils';
import { searchRecipesQuery } from '../utils/query/searchRecipesQuery';

const useSearchRecipes = (keyword: string | null) =>
  useQuery({
    ...searchRecipesQuery(keyword),
    select: (data: RecipeData) => processRecipesData(data),
    staleTime: 1000 * 60 * 5,
  });

export default useSearchRecipes;
