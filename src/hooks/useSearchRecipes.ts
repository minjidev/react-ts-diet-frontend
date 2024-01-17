import { useQuery } from '@tanstack/react-query';
import { searchRecipesKey } from '../constants';
import { RecipeData } from '../types/types';
import { getSearchRecipes } from '../api/recipes';
import { processRecipesData } from '../utils';

const useSearchRecipes = (keyword: string | null) =>
  useQuery({
    queryKey: [...searchRecipesKey, keyword],
    queryFn: getSearchRecipes(keyword),
    select: (data: RecipeData) => processRecipesData(data),
    staleTime: 1000 * 60 * 3,
    cacheTime: Infinity,
  });

export default useSearchRecipes;
