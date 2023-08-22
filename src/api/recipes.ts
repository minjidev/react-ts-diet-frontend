import axios from 'axios';
import { Recipe, SavedRecipe, User } from '../types/types';
import { mainNutrients } from '../constants/index';
import { formatDate } from '../utils/formatDate';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;
const idRegExr = /(?<=v2\/)[A-Za-z0-9]+/;

interface RecipeLink {
  self: {
    href: string;
    title: string;
  };
}

interface RecipeData {
  hits: { recipe: Recipe; _links: RecipeLink }[];
}

// 카테고리별 랜덤 20개
const getRecipes = (category: string) => async () => {
  const { data } = await axios.get(`${url}&diet=${category}&random=true`);
  console.log('raw: ', data);
  const recipes = (data as RecipeData).hits.map(hit => hit.recipe);
  const recipeIds = (data as RecipeData).hits.map(hit => hit._links.self.href.match(idRegExr)![0]);

  const recipesData = recipes.map(
    (
      {
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
      },
      idx
    ) => ({
      recipeId: recipeIds[idx],
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

const postSavedRecipe = async (savedRecipe: SavedRecipe) => {
  const { data } = await axios.post('/api/recipes', savedRecipe);

  return data;
};

const deleteSavedRecipe = async (recipeId: string) => {
  await axios.delete(`/api/recipes/${recipeId}`);
};

const getSavedRecipesByDate = (date: Date | undefined) => async () => {
  const { data } = await axios.get(`/api/recipes?date=${date ? date : formatDate(new Date())}`);

  return data;
};

const getSearchRecipes = (keyword: string) => async () => {
  const { data } = await axios.get(`/api/recipes?keyword=${keyword}`);

  return data;
};

export { getRecipes, postSavedRecipe, getSavedRecipesByDate, deleteSavedRecipe, getSearchRecipes };
