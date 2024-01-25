import { http, HttpResponse } from 'msw';
import { hits } from '../../mocks/recipes';

const recipeBaseURL = import.meta.env.VITE_EDAMAM_BASE_URL;

export const commonHandlers = [
  http.get(recipeBaseURL, async () => {
    return HttpResponse.json({
      hits,
    });
  }),
];
