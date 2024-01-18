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
  totalDaily: TotalDailyType[] | undefined;
  totalNutrients: TotalNutrientsType[] | undefined;
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

// recipe filter props
interface FilterRecipeDataProps {
  recipes: Recipe[];
  recipeIds: string[];
}

interface RecipeLink {
  self: {
    href: string;
    title: string;
  };
}

// Recipes api response
interface RecipeData {
  hits: { recipe: Recipe; _links: RecipeLink }[];
}

interface ButtonProps {
  children?: React.ReactNode;
  type?: string;
  onClick?: () => void;
}

export type {
  TotalDailyType,
  TotalNutrientsType,
  Recipe,
  RecipeModalProps,
  UserRecipe,
  User,
  SavedRecipesByDate,
  FilterRecipeDataProps,
  RecipeData,
  ButtonProps,
};
