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
  totalDaily: {
    CO: {
      label: 'co',
      quantity: 500,
    },
  },
  totalNutrients: {
    CO: {
      label: 'co',
      quantity: 500,
      unit: 'kcal',
    },
  },
};

export const hits = Array(50)
  .fill(0)
  .map((_, idx) => ({
    recipe,
    _links: {
      self: {
        href: `https://api.edama.com/api/v2/abcde${idx}`,
        title: '',
      },
    },
  }));
