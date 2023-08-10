import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SavedRecipesByDate } from '../types/types';
import { AxiosError } from 'axios';
import { getSavedRecipesByDate } from '../api/recipes';
import { savedRecipesByDateKey } from '../constants';

const useSavedRecipesByDate = (date: Date | undefined) =>
  useQuery<SavedRecipesByDate, AxiosError>(
    [...savedRecipesByDateKey, date?.toLocaleDateString()],
    getSavedRecipesByDate(date),
    {
      onError: (error: AxiosError) => console.error(error),
    }
  );
export default useSavedRecipesByDate;
