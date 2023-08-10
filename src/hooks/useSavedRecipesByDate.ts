import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SavedRecipesByDate } from '../types/types';
import { AxiosError } from 'axios';
import { getSavedRecipesByDate } from '../api/recipes';
import { savedRecipesByDateKey } from '../constants';
import { formatDate } from '../utils/formatDate';

const useSavedRecipesByDate = (date: Date | undefined) =>
  useQuery<SavedRecipesByDate, AxiosError>(
    [...savedRecipesByDateKey, date ? formatDate(date) : formatDate(new Date())],
    getSavedRecipesByDate(date),
    {
      onError: (error: AxiosError) => console.error(error),
    }
  );

export default useSavedRecipesByDate;
