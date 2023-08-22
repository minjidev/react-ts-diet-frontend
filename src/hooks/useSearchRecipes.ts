import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { searchRecipesKey } from '../constants';
import { Recipe } from '../types/types';
import { AxiosError } from 'axios';
import { getSearchRecipes } from '../api/recipes';

const useSearchRecipes = (keyword: string) => {
  useQuery<Recipe[], AxiosError>([...searchRecipesKey, keyword], getSearchRecipes(keyword), {
    onError: (error: AxiosError) => console.error(error),
  });
};

export default useSearchRecipes;
