import axios from 'axios';
import { RecipeData } from '../types/types';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;

const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`;

// random 20 data based on category
const getRecipes = (category: string) => async (): Promise<RecipeData> => {
  const { data } = await axios.get(`${url}&diet=${category}&random=true`);

  return data;
};

const getSearchRecipes = (keyword: string | null) => async () => {
  if (keyword === null) return [];

  const { data } = await axios.get(`${url}&q=${keyword}`);

  return data;
};

export { getRecipes, getSearchRecipes };
