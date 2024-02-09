import { QueryClient } from '@tanstack/react-query';
import { categorizedRecipesQuery } from './query/categorizedRecipesQuery';
import { categories } from '../constants/index';

const categorizedRecipesLoader = (queryClient: QueryClient) => async () => {
  return Promise.all(
    categories.map(async (category: string) => {
      const query = categorizedRecipesQuery(category);

      return queryClient.ensureQueryData(query);
    }),
  );
};

export default categorizedRecipesLoader;
