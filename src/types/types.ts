interface TotalDailyType {
  label: string;
  quantity: number;
}

interface TotalNutrientsType {
  label: string;
  quantity: number;
  unit: string;
}

// edmam에서 받아오는 각 레시피 상세
interface Recipe {
  recipeId: string;
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

// 유저가 저장한 레시피 (날짜, 시간, 유저)
interface SavedRecipe {
  date: Date;
  recipe: Recipe;
  savedAt: number;
  user: string;
}

interface RecipeDetailModalState {
  isOpen: boolean;
  content?: Recipe;
}

interface RecipeModalProps {
  content: Recipe | undefined;
  close: () => void;
}

interface User {
  email: string;
  username: string;
  savedRecipes?: SavedRecipe[];
}

interface UserData {
  user: User;
  message?: string;
}

interface AddModalContent {
  user: User | null;
  recipe: Recipe;
}

interface AddModalState {
  isOpen?: boolean;
  content?: AddModalContent;
}

interface SavedRecipesByDate {
  recipesByDate: SavedRecipe[];
  totalDailyByDate: (TotalDailyType | undefined)[];
  totalNutrientsByDate: (TotalNutrientsType | undefined)[]; // 1회 섭취량
}

export type {
  TotalDailyType,
  Recipe,
  RecipeDetailModalState,
  RecipeModalProps,
  SavedRecipe,
  User,
  UserData,
  AddModalContent,
  AddModalState,
  SavedRecipesByDate,
};
