import { db } from "../../prisma/db";
import type { SeedProduct } from "./types";

export async function upsertProduct(
  item: SeedProduct,
  brandId: number,
  dataSourceId: number,
) {
  const fields = {
    slug: item.slug,
    type: item.type,
    name: item.name,
    model: item.model ?? null,
    description: item.description ?? null,
    imageUrl: item.imageUrl ?? null,
    releaseDate: item.releaseDate ?? null,
    brandId,
    dataSourceId,
    isPublished: true,
  };

  const existing = await db.orm.public.Product.where({
    slug: item.slug,
  }).first();

  if (existing) {
    return db.orm.public.Product.where({
      id: existing.id,
    }).update(fields);
  }

  return db.orm.public.Product.create(fields);
}