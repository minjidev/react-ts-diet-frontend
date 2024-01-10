import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { SavedRecipesByDate } from '../types/types';
import { getSavedRecipesByDate } from '../api/user';
import { savedRecipesByDateKey } from '../constants';
import { formatDate } from '../utils/index';

interface useSavedRecipesByDateProps {
  date: Date | undefined;
  userId: string | undefined;
}

const useSavedRecipesByDate = ({ date, userId }: useSavedRecipesByDateProps) => {
  return useQuery<SavedRecipesByDate, AxiosError>({
    queryKey: [...savedRecipesByDateKey, userId, formatDate(date ?? new Date())],
    queryFn: getSavedRecipesByDate({ date, userId }),
    onError: (error: AxiosError) => console.error(error),
  });
};

export default useSavedRecipesByDate;
