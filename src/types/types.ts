interface TotalDailyType {
  label: string;
  quantity: number;
}

interface TotalNutrientsType {
  label: string;
  quantity: number;
  unit: string;
}

interface Image {
  url: string;
}

interface Images {
  THUMBNAIL: Image;
  SMALL: Image;
  REGULAR: Image;
  LARGE: Image;
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
  images: Images;
  yield?: number;
  servings?: number;
  totalDaily: TotalDailyType[] | undefined;
  totalNutrients: TotalNutrientsType[] | undefined;
}

type Modify<T, R> = Omit<T, keyof R> & R;

type RawRecipe = Modify<
  Recipe,
  {
    recipeId?: string;
    totalDaily: { [key: string]: TotalDailyType };
    totalNutrients: { [key: string]: TotalNutrientsType };
  }
>;

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
  recipes: RawRecipe[];
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
  hits: { recipe: RawRecipe; _links: RecipeLink }[];
}

interface ButtonProps {
  children?: React.ReactNode;
  type?: string;
  onClick?: () => void;
}

interface Categories {
  diet: string[];
  health: string[];
  dishType: string[];
}

interface SearchKeywords {
  title: string;
  label: keyof Categories;
}

interface KeywordsInfo {
  HISTORY_LIST_LEN: number;
  categories: Categories;
  searchKeywords: SearchKeywords[];
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
  RawRecipe,
  SearchKeywords,
  KeywordsInfo,
};
