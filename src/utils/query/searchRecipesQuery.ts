import { searchRecipesKey } from '../../constants';
import { getSearchRecipes } from '../../api/recipes';

export const searchRecipesQuery = (keyword: string | null) => ({
  queryKey: [...searchRecipesKey, keyword],
  queryFn: getSearchRecipes(keyword),
});
