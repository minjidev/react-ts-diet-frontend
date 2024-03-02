import { QueryClient } from '@tanstack/react-query';
import { categorizedRecipesQuery } from './query/categorizedRecipesQuery';
import { categories } from '../constants/index';

const categorizedRecipesLoader = (queryClient: QueryClient) => () => {
  Promise.all(
    categories.map((category: string) => {
      const query = categorizedRecipesQuery(category);

      return queryClient.ensureQueryData(query);
    }),
  );

  return null;
};

export default categorizedRecipesLoader;
