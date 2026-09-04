import { db } from "../../prisma/db";
import type { SeedVariant } from "./types";

export async function upsertVariant(
  productId: number,
  variantData: SeedVariant,
) {
  const fields = {
    name: variantData.name,
    color: variantData.color ?? null,
    ramGb: variantData.ramGb ?? null,
    storageGb: variantData.storageGb ?? null,
    sku: variantData.sku,
  };

  const existing = await db.orm.public.ProductVariant.where({
    productId,
    sku: variantData.sku,
  }).first();

  if (existing) {
    return db.orm.public.ProductVariant.where({
      id: existing.id,
    }).update(fields);
  }

  return db.orm.public.ProductVariant.create({
    productId,
    ...fields,
  });
}