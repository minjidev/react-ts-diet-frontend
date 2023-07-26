import axios from 'axios';
import { Recipe, User } from '../types/types';
import { mainNutrients } from '../constants/index';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

interface RecipeData {
  hits: { recipe: Recipe }[];
}

// 카테고리별 랜덤 20개
const getRecipes = (category: string) => async () => {
  const { data } = await axios.get(`${url}&diet=${category}&random=true`);
  console.log('raw: ', data);
  const recipes = (data as RecipeData).hits.map(hit => hit.recipe);
  const recipesData = recipes.map(
    ({
      label,
      calories,
      cuisineType,
      dietLabels,
      healthLabels,
      dishType,
      image,
      totalDaily,
      totalNutrients,
      yield: servings,
    }) => ({
      id: String(label) + String(calories),
      label,
      cuisineType,
      dishType,
      dietLabels,
      healthLabels: healthLabels?.slice(5),
      image,
      calories: Math.floor(calories / servings!),
      servings,
      yield: servings,
      totalDaily: Object.entries(totalDaily)
        .map(([code, content]) => {
          if (!mainNutrients.includes(code)) return;
          if (!content) return;

          return {
            label: content.label,
            quantity: Math.floor(content.quantity / servings!),
          };
        })
        .filter(Boolean),
      totalNutrients: Object.entries(totalNutrients)
        .map(([code, content]) => {
          if (!mainNutrients.includes(code)) return;
          if (!content) return;

          return {
            label: content.label,
            quantity: Math.floor(content.quantity / servings!),
            unit: content.unit,
          };
        })
        .filter(Boolean),
    })
  );

  return recipesData;
};

interface savedRecipeProps {
  user: User | undefined;
  recipe: Recipe;
  date: Date | undefined;
  savedAt: number;
}

const postSavedRecipe = async (savedRecipe: savedRecipeProps) => {
  const { data } = await axios.post('/api/recipes', savedRecipe);

  return data;
};

export { getRecipes, postSavedRecipe };
