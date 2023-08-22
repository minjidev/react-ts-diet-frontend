import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchRecipesKey } from '../constants';
import { Recipe } from '../types/types';
import { AxiosError } from 'axios';
import { getSearchRecipes } from '../api/recipes';

const useSearchRecipes = (keyword: string | null) =>
  useQuery<Recipe[], AxiosError>([...searchRecipesKey, keyword], getSearchRecipes(keyword), {
    onError: (error: AxiosError) => console.error(error),
    staleTime: 1000 * 60 * 10,
    cacheTime: Infinity,
  });

export default useSearchRecipes;
