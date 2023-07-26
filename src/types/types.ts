interface TotalDailyType {
  label: string;
  quantity: number;
}

interface TotalNutrientsType {
  label: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: string;
  label: string;
  calories: number;
  cuisineType: string[];
  dishType: string[];
  dietLabels: string[];
  healthLabels?: string[];
  image: string;
  yield?: number;
  servings?: number;
  totalDaily: (TotalDailyType | undefined)[]; // 1일 섭취 비율
  totalNutrients: (TotalNutrientsType | undefined)[]; // 1회 섭취량
}

interface RecipeDetailModalState {
  isOpen: boolean;
  content?: Recipe;
}

interface RecipeDetailModalProps {
  modalState: RecipeDetailModalState;
  onRecipeModalClick?: (newModalState: RecipeDetailModalState) => void;
}

interface User {
  email: string;
  username: string;
}

interface UserData {
  user: User;
  message: string;
}

interface AddModalContent {
  user: User | undefined;
  recipe: Recipe;
}

interface AddModalState {
  isOpen?: boolean;
  content?: AddModalContent;
}

export type {
  TotalDailyType,
  Recipe,
  RecipeDetailModalState,
  RecipeDetailModalProps,
  User,
  UserData,
  AddModalContent,
  AddModalState,
};
