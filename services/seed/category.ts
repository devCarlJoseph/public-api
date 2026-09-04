import { db } from "../../prisma/db";

export async function getOrCreateCategory(slug: string, name: string) {
  return (
    (await db.orm.public.Category.where({ slug }).first()) ??
    (await db.orm.public.Category.create({ slug, name }))
  );
}

export async function ensureRecipeCategory(
  recipeId: number,
  categoryId: number,
) {
  const existing = await db.orm.public.RecipeCategory.where({
    recipeId,
    categoryId,
  }).first();

  if (existing) {
    return existing;
  }

  return db.orm.public.RecipeCategory.create({
    recipeId,
    categoryId,
  });
}