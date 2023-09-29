interface TotalDailyType {
  label: string;
  quantity: number;
}

interface TotalNutrientsType {
  label: string;
  quantity: number;
  unit: string;
}

// recipe detail from outer api
interface Recipe {
  recipeId: string;
  label: string;
  calories: number;
  cuisineType: string[];
  dishType: string[];
  dietLabels: string[];
  healthLabels?: string[];
  image: string;
  images: {
    THUMBNAIL: {
      url: string;
    };
    SMALL: {
      url: string;
    };
    REGULAR: {
      url: string;
    };
    LARGE: {
      url: string;
    };
  };
  yield?: number;
  servings?: number;
  totalDaily: (TotalDailyType | undefined)[];
  totalNutrients: (TotalNutrientsType | undefined)[];
}

interface UserRecipe {
  _id?: string;
  userId: string;
  recipe: Recipe;
  savedAt: Date;
}

interface RecipeModalProps {
  content: Recipe | undefined;
  close: () => void;
}

interface User {
  _id: string;
  email: string;
  username: string;
}

interface SavedRecipesByDate {
  recipesByDate: UserRecipe[];
  totalDailyByDate: (TotalDailyType | undefined)[];
  totalNutrientsByDate: (TotalNutrientsType | undefined)[];
}

export type { TotalDailyType, Recipe, RecipeModalProps, UserRecipe, User, SavedRecipesByDate };
