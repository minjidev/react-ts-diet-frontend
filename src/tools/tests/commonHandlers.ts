import { http, HttpResponse } from 'msw';

const recipeBaseURL = import.meta.env.VITE_EDAMAM_BASE_URL;

const recipe = {
  label: 'Vegetable Burritos',
  cuisineType: ['mexican'],
  dishType: ['sandwiches'],
  dietLabels: ['Balanced', 'High-Fiber'],
  healthLabels: ['Fish-Free', 'Shellfish-Free', 'Pork-Free', 'Red-Meat-Free'],
  image: 'imgsrc',
  images: {
    THUMBNAIL: {
      height: 600,
      url: '',
      width: 600,
    },
    SMALL: {
      height: 100,
      url: '',
      width: 100,
    },
    REGULAR: {
      height: 300,
      url: '',
      width: 300,
    },
    LARGE: {
      height: 600,
      url: '',
      width: 600,
    },
  },
  calories: 326,
  yield: 8,
};

export const hits = Array.from({ length: 50 }, () => recipe).map((recipe, idx) => ({
  recipe,
  _links: {
    self: {
      href: `https://api.edama.com/api/v2/abcde${idx}`,
    },
  },
}));

export const commonHandlers = [
  http.get(recipeBaseURL, async () => {
    return HttpResponse.json({
      hits,
    });
  }),
];