import { db } from "../../prisma/db";
import type { SeedNutrition } from "../../scripts/seed-data/recipes/types";

export async function upsertRecipeNutrition(
  recipeId: number,
  nutrition: SeedNutrition,
) {
  const fields = {
    calories: nutrition.calories,
    proteinG: nutrition.proteinG,
    carbsG: nutrition.carbsG,
    fatG: nutrition.fatG,
    fiberG: nutrition.fiberG,
  };

  const existing = await db.orm.public.RecipeNutrition.where({
    recipeId,
  }).first();

  if (existing) {
    return db.orm.public.RecipeNutrition.where({
      id: existing.id,
    }).update(fields);
  }

  return db.orm.public.RecipeNutrition.create({
    recipeId,
    ...fields,
  });
}