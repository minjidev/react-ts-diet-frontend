import { describe, it, expect } from 'vitest';

import { renderHook, waitFor } from '../../test-utils/testing-library-utils';
import { useCategorizedRecipes } from '..';
import { processRecipesData } from '../../utils/index';
import { hits } from '../../mocks/recipes';

describe('useCategorizedRecipes', () => {
  it.only('successful query hook returns recipe data', async () => {
    const { result } = renderHook(() => useCategorizedRecipes('balanced'));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const { data } = result.current;
    const processedRecipes = processRecipesData({ hits });

    expect(data).toMatchObject(processedRecipes);
  });
});
