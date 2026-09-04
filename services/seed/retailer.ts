import { db } from "../../prisma/db";
import type { SeedPrice } from "./types";

export async function getOrCreateRetailer(price: SeedPrice) {
  return (
    (await db.orm.public.Retailer.where({
      slug: price.retailerSlug,
    }).first()) ??
    (await db.orm.public.Retailer.create({
      slug: price.retailerSlug,
      name: price.retailerName,
      websiteUrl: price.retailerWebsiteUrl ?? null,
    }))
  );
}