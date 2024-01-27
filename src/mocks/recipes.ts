const recipe = {
  label: 'Vegetable Burritos',
  cuisineType: ['mexican'],
  dishType: ['sandwiches'],
  dietLabels: ['Balanced', 'High-Fiber'],
  healthLabels: ['Fish-Free', 'Shellfish-Free', 'Pork-Free', 'Red-Meat-Free'],
  image: 'imgsrc',
  images: {
    THUMBNAIL: {
      url: '',
    },
    SMALL: {
      url: '',
    },
    REGULAR: {
      url: '',
    },
    LARGE: {
      url: '',
    },
  },
  calories: 326,
  yield: 8,
  totalDaily: undefined,
  totalNutrients: undefined,
};

export const hits = Array(50)
  .fill(0)
  .map((val, idx) => ({
    recipe,
    _links: {
      self: {
        href: `https://api.edama.com/api/v2/abcde${idx}`,
        title: '',
      },
    },
  }));
