import { KeywordsInfo } from '../types/types';

const keywordsInfo: KeywordsInfo = {
  HISTORY_LIST_LEN: 8,
  categories: {
    diet: ['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'],
    health: ['alcohol-free', 'dairy-free', 'gluten-free', 'keto-friendly', 'Mediterranean'],
    dishType: ['Bread', 'Cereal', 'Dessert', 'Drinks', 'Salad', 'Pancakes'],
  },
  searchKeywords: [
    {
      title: 'Diet',
      label: 'diet',
    },
    {
      title: 'Health',
      label: 'health',
    },
    {
      title: 'Dish Type',
      label: 'dishType',
    },
  ],
};

export default keywordsInfo;
