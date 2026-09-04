import { db } from "../../prisma/db";

export async function getOrCreateCuisine(
  slug = "filipino",
  name = "Filipino",
) {
  return (
    (await db.orm.public.Cuisine.where({ slug }).first()) ??
    (await db.orm.public.Cuisine.create({ slug, name }))
  );
}