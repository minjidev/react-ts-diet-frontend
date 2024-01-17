import { mainNutrients } from '../constants';
import {
  RecipeData,
  FilterRecipeDataProps,
  Recipe,
  TotalDailyType,
  TotalNutrientsType,
} from '../types/types';

const idRegExr = /(?<=v2\/)[A-Za-z0-9]+/;

const processTotalDaily = (data: TotalDailyType[] | undefined, servings: number | undefined) => {
  if (!data) return undefined;

  const per = servings ?? 1;

  return Object.entries(data)
    .filter(([code, content]) => mainNutrients.includes(code) && content)
    .map(([, content]) => ({
      label: content.label,
      quantity: Math.floor(content.quantity / per),
    }));
};

const processTotalNutrients = (
  data: TotalNutrientsType[] | undefined,
  servings: number | undefined,
) => {
  if (!data) return undefined;

  const per = servings ?? 1;

  return Object.entries(data)
    .filter(([code, content]) => mainNutrients.includes(code) && content)
    .map(([, content]) => ({
      label: content.label,
      quantity: Math.floor(content.quantity / per),
      unit: content.unit,
    }));
};

const normalizeRecipes = ({ recipes, recipeIds }: FilterRecipeDataProps) => {
  return recipes.map(
    (
      {
        label,
        calories,
        cuisineType,
        dietLabels,
        healthLabels,
        dishType,
        image,
        images,
        totalDaily,
        totalNutrients,
        yield: servings,
      },
      idx,
    ) => ({
      recipeId: recipeIds[idx],
      label,
      cuisineType,
      dishType,
      dietLabels,
      healthLabels: healthLabels?.slice(5),
      image,
      images,
      calories: Math.floor(calories / servings!),
      servings,
      yield: servings,
      totalDaily: processTotalDaily(totalDaily, servings),
      totalNutrients: processTotalNutrients(totalNutrients, servings),
    }),
  );
};

const processRecipesData = (data: RecipeData): Recipe[] => {
  const recipes = data?.hits.map(hit => hit.recipe);
  const recipeIds = data?.hits.map(hit => hit._links.self.href.match(idRegExr)![0]);

  return normalizeRecipes({ recipes, recipeIds });
};

export default processRecipesData;
