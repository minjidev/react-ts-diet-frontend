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

interface ModalProps {
  modalState: RecipeDetailModalState;
  onClick?: (newModalState: RecipeDetailModalState) => void;
}

export type { TotalDailyType, Recipe, RecipeDetailModalState, ModalProps };
