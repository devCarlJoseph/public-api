import { db } from "../../prisma/db";

export async function getOrCreateDiet(
  slug = "dairy-free",
  name = "Dairy Free",
) {
  return (
    (await db.orm.public.Diet.where({ slug }).first()) ??
    (await db.orm.public.Diet.create({ slug, name }))
  );
}

export async function ensureRecipeDiet(recipeId: number, dietId: number) {
  const existing = await db.orm.public.RecipeDiet.where({
    recipeId,
    dietId,
  }).first();

  if (existing) {
    return existing;
  }

  return db.orm.public.RecipeDiet.create({
    recipeId,
    dietId,
  });
}