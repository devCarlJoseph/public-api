export type SeedIngredient = {
  slug: string;
  name: string;
  amount: number | null;
  unit: string | null;
  note?: string;
};

export type SeedNutrition = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
};

export type SeedRecipe = {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  categorySlug: string;
  categoryName: string;
  steps: string[];
  ingredients: SeedIngredient[];
  nutrition: SeedNutrition;
};