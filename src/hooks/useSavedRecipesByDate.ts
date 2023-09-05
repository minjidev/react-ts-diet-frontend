import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { SavedRecipesByDate, UserRecipe } from '../types/types';
import { AxiosError } from 'axios';
import { getSavedRecipesByDate } from '../api/user';
import { savedRecipesByDateKey } from '../constants';
import { formatDate } from '../utils/formatDate';

interface useSavedRecipesByDateProps {
  date: Date | undefined;
  userId: string | undefined;
}

const useSavedRecipesByDate = ({ date, userId }: useSavedRecipesByDateProps) => {
  return useQuery<SavedRecipesByDate, AxiosError>(
    [...savedRecipesByDateKey, userId, formatDate(date ?? new Date())],
    getSavedRecipesByDate({ date, userId }),
    {
      onError: (error: AxiosError) => console.error(error),
    }
  );
};

export default useSavedRecipesByDate;
