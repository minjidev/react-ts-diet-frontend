import axios from 'axios';
import type { Recipe } from '../types/types';

const APP_KEY = '010a67d393438f12e96197aaa8ec94c4';
const APP_ID = '5242bf2f';
const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

const mainNutrients = ['CHOCDF', 'FAT', 'PROCNT'];

interface RecipeData {
  hits: { recipe: Recipe }[];
}

// 카테고리별 랜덤 20개
const getRecipes = (category: string) => async () => {
  const { data } = await axios.get(`${url}&diet=${category}&random=true`);

  const recipes = (data as RecipeData).hits.map(hit => hit.recipe);
  const recipesData = recipes.map(
    ({
      label,
      calories,
      cuisineType,
      dietLabels,
      healthLabels,
      image,
      totalDaily,
      totalNutrients,
      yield: servings,
    }) => ({
      id: '' + label + calories,
      label,
      cuisineType,
      dietLabels,
      healthLabels: healthLabels.slice(5),
      image,
      calories: Math.floor(calories / servings),
      servings,
      yield: servings,
      totalDaily: Object.entries(totalDaily)
        .map(([code, content]) => {
          if (!mainNutrients.includes(code)) return;
          if (!content) return;

          return {
            label: content.label,
            quantity: Math.floor(content.quantity / servings),
          };
        })
        .filter(Boolean),
      totalNutrients: Object.entries(totalNutrients)
        .map(([code, content]) => {
          if (!mainNutrients.includes(code)) return;
          if (!content) return;

          return {
            label: content.label,
            quantity: Math.floor(content.quantity / servings),
            unit: content.unit,
          };
        })
        .filter(Boolean),
    })
  );

  return recipesData;
};

export { getRecipes };
