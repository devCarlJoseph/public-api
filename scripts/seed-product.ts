import { getOrCreateDataSource } from "@/services/seed/data-source";
import { getOrCreateBrand } from "@/services/seed/brand";
import { upsertProduct } from "@/services/seed/product";
import { upsertPhoneSpec } from "@/services/seed/phone-spec";
import { upsertVariant } from "@/services/seed/variant";
import { upsertPrice } from "@/services/seed/price";

import { samsungPhones } from "@/scripts/seed-data/phones/samsung";
import { realmePhones } from "@/scripts/seed-data/phones/realme";
import { oppoPhones } from "@/scripts/seed-data/phones/oppo";
import { applePhones } from "@/scripts/seed-data/phones/apple";
import { pocoPhones } from "@/scripts/seed-data/phones/poco";
import { redmiPhones } from "@/scripts/seed-data/phones/redmi";

const phones = [
  ...samsungPhones,
  ...realmePhones,
  ...oppoPhones,
  ...applePhones,
  ...pocoPhones,
  ...redmiPhones,
];

async function main() {
  if (phones.length === 0) {
    console.log("No phones available to seed.");
    return;
  }

  const dataSource = await getOrCreateDataSource();

  for (const phone of phones) {
    const brand = await getOrCreateBrand(phone);

    const product = await upsertProduct(phone, brand.id, dataSource.id);

    if (!product) {
      throw new Error(`Unable to create or update product: ${phone.slug}`);
    }

    if (phone.phoneSpec) {
      await upsertPhoneSpec(product.id, phone.phoneSpec);
    }

    for (const variantData of phone.variants ?? []) {
      const variant = await upsertVariant(product.id, variantData);

      if (!variant) {
        throw new Error(
          `Unable to create or update variant: ${variantData.sku}`,
        );
      }

      await upsertPrice(variant.id, variantData.price);
    }

    console.log(`Seeded: ${phone.name}`);
  }

  console.log(`Finished. ${phones.length} phones are available.`);
}

main().catch((error) => {
  console.error("Phone seed failed:", error);
  process.exitCode = 1;
});
