import axios from 'axios';
import { Recipe } from '../types/types';
import { mainNutrients } from '../constants/index';

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

interface filterRecipeDataProps {
  recipes: Recipe[];
  recipeIds: string[];
}

const filterRecipeData = ({ recipes, recipeIds }: filterRecipeDataProps) => {
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
      idx
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
};

// random 20 data based on category
const getRecipes = (category: string) => async () => {
  const { data } = await axios.get(`${url}&diet=${category}&random=true`);
  const recipes = (data as RecipeData).hits.map(hit => hit.recipe);
  const recipeIds = (data as RecipeData).hits.map(hit => hit._links.self.href.match(idRegExr)![0]);

  const recipesData = filterRecipeData({ recipes, recipeIds });
  return recipesData;
};

const getSearchRecipes = (keyword: string | null) => async () => {
  if (keyword === null) return [];
  const { data } = await axios.get(`${url}&q=${keyword}`);

  const recipes = (data as RecipeData).hits.map(hit => hit.recipe);
  const recipeIds = (data as RecipeData).hits.map(hit => hit._links.self.href.match(idRegExr)![0]);

  const recipesData = filterRecipeData({ recipes, recipeIds });

  return recipesData;
};

export { getRecipes, getSearchRecipes };
