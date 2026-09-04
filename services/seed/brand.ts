import { db } from "../../prisma/db";
import type { SeedProduct } from "./types";

export async function getOrCreateBrand(item: SeedProduct) {
  return (
    (await db.orm.public.Brand.where({
      slug: item.brand.slug,
    }).first()) ??
    (await db.orm.public.Brand.create({
      slug: item.brand.slug,
      name: item.brand.name,
      websiteUrl: item.brand.websiteUrl ?? null,
    }))
  );
}