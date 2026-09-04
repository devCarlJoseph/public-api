import { db } from "../../prisma/db";
import { getOrCreateRetailer } from "./retailer";
import type { SeedPrice } from "./types";

export async function upsertPrice(
  variantId: number,
  price: SeedPrice,
) {
  const retailer = await getOrCreateRetailer(price);

  const existing = await db.orm.public.ProductPrice.where({
    variantId,
    retailerId: retailer.id,
    checkedAt: price.checkedAt,
  }).first();

  if (existing) {
    await db.orm.public.ProductPrice.where({
      id: existing.id,
    }).update({
      amount: price.amount,
      currency: price.currency,
      availability: price.availability ?? null,
      productUrl: price.productUrl ?? null,
    });

    return;
  }

  await db.orm.public.ProductPrice.create({
    variantId,
    retailerId: retailer.id,
    amount: price.amount,
    currency: price.currency,
    availability: price.availability ?? null,
    productUrl: price.productUrl ?? null,
    checkedAt: price.checkedAt,
  });
}