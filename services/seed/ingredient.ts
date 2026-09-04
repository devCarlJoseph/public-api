import { db } from "../../prisma/db";
import type { SeedIngredient } from "../../scripts/seed-data/recipes/types";

export async function getOrCreateIngredient(item: SeedIngredient) {
  return (
    (await db.orm.public.Ingredient.where({ slug: item.slug }).first()) ??
    (await db.orm.public.Ingredient.create({
      slug: item.slug,
      name: item.name,
    }))
  );
}