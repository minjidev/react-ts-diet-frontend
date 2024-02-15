import { QueryClient } from '@tanstack/react-query';
import { categorizedRecipesQuery } from './query/categorizedRecipesQuery';
import { categories } from '../constants/index';

const categorizedRecipesLoader = (queryClient: QueryClient) => async () => {
  const categorizedRecipes = await Promise.all(
    categories.map(async (category: string) => {
      const query = categorizedRecipesQuery(category);

      return queryClient.ensureQueryData(query);
    }),
  );

  return categorizedRecipes;
};

export default categorizedRecipesLoader;
