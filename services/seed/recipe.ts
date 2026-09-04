import { db } from "../../prisma/db";
import type { SeedRecipe } from "../../scripts/seed-data/recipes/types";
import { ensureRecipeCategory } from "./category";
import { ensureRecipeDiet } from "./diet";
import { upsertRecipeNutrition } from "./nutrition";

const DEFAULT_IMAGE_BASE_URL = "https://catalogra.vercel.app/images/recipes";

export type RecipeSeedContext = {
  cuisineId: number;
  dataSourceId: number;
  dietId: number;
  categoryId: number;
  ingredients: Map<string, { id: number }>;
  imageBaseUrl?: string;
};

export async function upsertRecipe(
  item: SeedRecipe,
  context: RecipeSeedContext,
) {
  const fields = {
    slug: item.slug,
    title: item.title,
    description: item.description,
    imageUrl:
      item.imageUrl ??
      `${context.imageBaseUrl ?? DEFAULT_IMAGE_BASE_URL}/${item.slug}.jpg`,
    prepMinutes: item.prepMinutes,
    cookMinutes: item.cookMinutes,
    servings: item.servings,
    cuisineId: context.cuisineId,
    dataSourceId: context.dataSourceId,
    isPublished: true,
  };

  const existing = await db.orm.public.Recipe.where({
    slug: item.slug,
  }).first();

  if (existing) {
    return db.orm.public.Recipe.where({
      id: existing.id,
    }).update(fields);
  }

  return db.orm.public.Recipe.create(fields);
}

export async function syncRecipeSteps(recipeId: number, steps: string[]) {
  const existingSteps = await db.orm.public.RecipeStep.where({
    recipeId,
  }).all();

  const stepsByNumber = new Map(
    existingSteps.map((step) => [step.stepNumber, step]),
  );

  for (let index = 0; index < steps.length; index++) {
    const stepNumber = index + 1;
    const existing = stepsByNumber.get(stepNumber);

    if (existing) {
      await db.orm.public.RecipeStep.where({
        id: existing.id,
      }).update({
        instruction: steps[index],
      });
    } else {
      await db.orm.public.RecipeStep.create({
        recipeId,
        stepNumber,
        instruction: steps[index],
      });
    }
  }
}

export async function syncRecipeIngredients(
  recipeId: number,
  item: SeedRecipe,
  ingredients: Map<string, { id: number }>,
) {
  const existingIngredients = await db.orm.public.RecipeIngredient.where({
    recipeId,
  }).all();

  const ingredientsBySortOrder = new Map(
    existingIngredients.map((ingredient) => [ingredient.sortOrder, ingredient]),
  );

  for (let index = 0; index < item.ingredients.length; index++) {
    const ingredientData = item.ingredients[index];
    const ingredient = ingredients.get(ingredientData.slug);

    if (!ingredient) {
      throw new Error(`Ingredient not found: ${ingredientData.slug}`);
    }

    const sortOrder = index + 1;
    const existing = ingredientsBySortOrder.get(sortOrder);

    const fields = {
      ingredientId: ingredient.id,
      amount: ingredientData.amount,
      unit: ingredientData.unit,
      note: ingredientData.note ?? null,
      sortOrder,
    };

    if (existing) {
      await db.orm.public.RecipeIngredient.where({
        id: existing.id,
      }).update(fields);
    } else {
      await db.orm.public.RecipeIngredient.create({
        recipeId,
        ...fields,
      });
    }
  }
}

export async function seedRecipe(item: SeedRecipe, context: RecipeSeedContext) {
  const recipe = await upsertRecipe(item, context);

  if (!recipe) {
    throw new Error(`Failed to create or update recipe: ${item.slug}`);
  }

  await syncRecipeSteps(recipe.id, item.steps);

  await syncRecipeIngredients(recipe.id, item, context.ingredients);

  await ensureRecipeCategory(recipe.id, context.categoryId);

  await ensureRecipeDiet(recipe.id, context.dietId);

  await upsertRecipeNutrition(recipe.id, item.nutrition);

  return recipe;
}
