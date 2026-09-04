import { db } from "../../prisma/db";
import type { SeedPhoneSpec } from "./types";

export async function upsertPhoneSpec(
  productId: number,
  spec: SeedPhoneSpec,
) {
  const existing = await db.orm.public.PhoneSpec.where({
    productId,
  }).first();

  if (existing) {
    await db.orm.public.PhoneSpec.where({
      id: existing.id,
    }).update(spec);

    return;
  }

  await db.orm.public.PhoneSpec.create({
    productId,
    ...spec,
  });
}