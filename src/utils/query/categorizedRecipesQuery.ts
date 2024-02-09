import { categorizedRecipesKey } from '../../constants';
import { getRecipes } from '../../api/recipes';

export const categorizedRecipesQuery = (category: string) => ({
  queryKey: [...categorizedRecipesKey, category],
  queryFn: getRecipes(category),
});
