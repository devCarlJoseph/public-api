import { db } from "../prisma/db";

type SeedProduct = {
  brand: {
    slug: string;
    name: string;
    websiteUrl?: string;
  };
  slug: string;
  name: string;
  model?: string;
  description?: string;
  imageUrl?: string;
  releaseDate?: string;
  spec: {
    operatingSystem?: string;
    chipset?: string;
    displaySizeInches?: number;
    displayResolution?: string;
    batteryMah?: number;
    cameraSummary?: string;
    has5g?: boolean;
    hasNfc?: boolean;
    supportsEsim?: boolean;
  };
  variants: {
    sku: string;
    name: string;
    color?: string;
    ramGb?: number;
    storageGb?: number;
    price: {
      retailerSlug: string;
      retailerName: string;
      retailerWebsiteUrl?: string;
      amount: number;
      currency: string;
      availability?: string;
      productUrl?: string;
      checkedAt: string;
    };
  }[];
};

type SamsungPhoneSeed = {
  slug: string;
  name: string;
  model: string;
  description: string;
  releaseDate: string;
  displaySizeInches: number;
  batteryMah: number;
  chipset: string;
  cameraSummary: string;
  ramGb: number;
  storageGb: number;
  amount: number;
  checkedAt: string;
  sourceUrl: string;
};

function makeSamsungPhone(item: SamsungPhoneSeed): SeedProduct {
  return {
    brand: {
      slug: "samsung",
      name: "Samsung",
      websiteUrl: "https://www.samsung.com/ph/",
    },
    slug: item.slug,
    name: item.name,
    model: item.model,
    description: item.description,
    releaseDate: item.releaseDate,
    spec: {
      operatingSystem: "Android",
      chipset: item.chipset,
      displaySizeInches: item.displaySizeInches,
      batteryMah: item.batteryMah,
      cameraSummary: item.cameraSummary,
      has5g: true,
      hasNfc: true,
    },
    variants: [
      {
        sku: `${item.model}-${item.ramGb}GB-${item.storageGb}GB`,
        name: `${item.ramGb}GB / ${item.storageGb}GB`,
        ramGb: item.ramGb,
        storageGb: item.storageGb,
        price: {
          retailerSlug: "samsung-ph",
          retailerName: "Samsung Philippines",
          retailerWebsiteUrl: "https://www.samsung.com/ph/",
          amount: item.amount,
          currency: "PHP",
          availability: "historical_launch_price",
          productUrl: item.sourceUrl,
          checkedAt: item.checkedAt,
        },
      },
    ],
  };
}

const additionalSamsungPhones: SamsungPhoneSeed[] = [
  {
    slug: "samsung-galaxy-a56-5g",
    name: "Samsung Galaxy A56 5G",
    model: "SM-A566B",
    description:
      "A balanced mid-range 5G phone with a bright 6.7-inch Super AMOLED display, a 5,000mAh battery, and a versatile camera system for everyday photography.",
    releaseDate: "2025-03-17T00:00:00.000Z",
    displaySizeInches: 6.7,
    batteryMah: 5000,
    chipset: "Exynos 1480",
    cameraSummary: "50MP + 12MP + 5MP rear; 12MP front",
    ramGb: 8,
    storageGb: 128,
    amount: 23990,
    checkedAt: "2025-03-24T00:00:00.000Z",
    sourceUrl: "https://news.samsung.com/ph/create-connect-and-conquer-the-awesome-way-with-the-samsung-galaxy-a-series",
  },
  {
    slug: "samsung-galaxy-a36-5g",
    name: "Samsung Galaxy A36 5G",
    model: "SM-A366B",
    description:
      "A practical 5G smartphone focused on long battery life, a smooth 6.7-inch Super AMOLED display, and dependable cameras for daily use.",
    releaseDate: "2025-03-17T00:00:00.000Z",
    displaySizeInches: 6.7,
    batteryMah: 5000,
    chipset: "Snapdragon 6 Gen 3",
    cameraSummary: "50MP + 5MP + 2MP rear; 12MP front",
    ramGb: 8,
    storageGb: 128,
    amount: 19990,
    checkedAt: "2025-03-24T00:00:00.000Z",
    sourceUrl: "https://news.samsung.com/ph/create-connect-and-conquer-the-awesome-way-with-the-samsung-galaxy-a-series",
  },
  {
    slug: "samsung-galaxy-a26-5g",
    name: "Samsung Galaxy A26 5G",
    model: "SM-A266B",
    description:
      "An accessible 5G Galaxy phone with a large AMOLED display, a 5,000mAh battery, and an everyday camera setup in a durable design.",
    releaseDate: "2025-03-26T00:00:00.000Z",
    displaySizeInches: 6.7,
    batteryMah: 5000,
    chipset: "Exynos 1380",
    cameraSummary: "50MP main camera with depth and macro cameras",
    ramGb: 6,
    storageGb: 128,
    amount: 15990,
    checkedAt: "2025-03-26T00:00:00.000Z",
    sourceUrl: "https://news.samsung.com/ph/awesome-intelligence-for-all-the-galaxy-a26-5g-is-now-available-in-the-philippines",
  },
  {
    slug: "samsung-galaxy-s25",
    name: "Samsung Galaxy S25",
    model: "SM-S931B",
    description:
      "A compact flagship built around Samsung’s Galaxy AI experience, Snapdragon performance, a 6.2-inch display, and a flexible triple-camera system.",
    releaseDate: "2025-02-14T00:00:00.000Z",
    displaySizeInches: 6.2,
    batteryMah: 4000,
    chipset: "Snapdragon 8 Elite",
    cameraSummary: "50MP + 12MP + 10MP rear; 12MP front",
    ramGb: 8,
    storageGb: 256,
    amount: 51990,
    checkedAt: "2025-02-14T00:00:00.000Z",
    sourceUrl: "https://www.samsung.com/ph/smartphones/galaxy-s25/specs/",
  },
  {
    slug: "samsung-galaxy-s25-plus",
    name: "Samsung Galaxy S25+",
    model: "SM-S936B",
    description:
      "A larger Galaxy S25 flagship with a 6.7-inch display, a 4,900mAh battery, high-end Snapdragon performance, and generous 12GB memory.",
    releaseDate: "2025-02-14T00:00:00.000Z",
    displaySizeInches: 6.7,
    batteryMah: 4900,
    chipset: "Snapdragon 8 Elite",
    cameraSummary: "50MP + 12MP + 10MP rear; 12MP front",
    ramGb: 12,
    storageGb: 256,
    amount: 67990,
    checkedAt: "2025-02-14T00:00:00.000Z",
    sourceUrl: "https://www.samsung.com/ph/smartphones/galaxy-s25/specs/",
  },
  {
    slug: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    model: "SM-S938B",
    description:
      "Samsung’s premium S25 model, pairing a large display and S Pen support with Snapdragon flagship performance and a high-resolution multi-camera system.",
    releaseDate: "2025-02-14T00:00:00.000Z",
    displaySizeInches: 6.9,
    batteryMah: 5000,
    chipset: "Snapdragon 8 Elite",
    cameraSummary: "200MP + 50MP + 50MP + 10MP rear; 12MP front",
    ramGb: 12,
    storageGb: 256,
    amount: 84990,
    checkedAt: "2025-02-14T00:00:00.000Z",
    sourceUrl: "https://www.samsung.com/ph/smartphones/galaxy-s25/buy/",
  },
  {
    slug: "samsung-galaxy-s24",
    name: "Samsung Galaxy S24",
    model: "SM-S921B",
    description:
      "A compact Galaxy flagship with Galaxy AI features, a 6.2-inch display, a 4,000mAh battery, and a versatile triple-camera setup.",
    releaseDate: "2024-01-31T00:00:00.000Z",
    displaySizeInches: 6.2,
    batteryMah: 4000,
    chipset: "Exynos 2400",
    cameraSummary: "50MP + 12MP + 10MP rear; 12MP front",
    ramGb: 8,
    storageGb: 256,
    amount: 53990,
    checkedAt: "2024-01-31T00:00:00.000Z",
    sourceUrl: "https://news.samsung.com/ph/enter-the-new-era-of-mobile-ai-with-samsung-galaxy-s24-series",
  },
  {
    slug: "samsung-galaxy-s24-plus",
    name: "Samsung Galaxy S24+",
    model: "SM-S926B",
    description:
      "The larger Galaxy S24 model combines a spacious 6.7-inch display, a 4,900mAh battery, 12GB memory, and flagship camera and AI features.",
    releaseDate: "2024-01-31T00:00:00.000Z",
    displaySizeInches: 6.7,
    batteryMah: 4900,
    chipset: "Exynos 2400",
    cameraSummary: "50MP + 12MP + 10MP rear; 12MP front",
    ramGb: 12,
    storageGb: 256,
    amount: 68990,
    checkedAt: "2024-01-31T00:00:00.000Z",
    sourceUrl: "https://news.samsung.com/ph/enter-the-new-era-of-mobile-ai-with-samsung-galaxy-s24-series",
  },
  {
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    model: "SM-S928B",
    description:
      "A premium Galaxy flagship with an integrated S Pen, a 6.8-inch display, a 5,000mAh battery, and a high-resolution zoom-focused camera system.",
    releaseDate: "2024-01-31T00:00:00.000Z",
    displaySizeInches: 6.8,
    batteryMah: 5000,
    chipset: "Snapdragon 8 Gen 3 for Galaxy",
    cameraSummary: "200MP + 50MP + 10MP + 12MP rear; 12MP front",
    ramGb: 12,
    storageGb: 256,
    amount: 84990,
    checkedAt: "2024-01-31T00:00:00.000Z",
    sourceUrl: "https://news.samsung.com/ph/enter-the-new-era-of-mobile-ai-with-samsung-galaxy-s24-series",
  },
];

// Add only phone data, images, and prices that you have permission to publish.
const products: SeedProduct[] = [
  {
    brand: {
      slug: "samsung",
      name: "Samsung",
      websiteUrl: "https://www.samsung.com/ph/",
    },
    slug: "samsung-galaxy-a55-5g",
    name: "Samsung Galaxy A55 5G",
    model: "SM-A556E",
    description:
      "Samsung Galaxy A55 5G smartphone with a 6.6-inch FHD+ Super AMOLED display, 5G connectivity, and a 5,000mAh battery.",
    releaseDate: "2024-03-18T00:00:00.000Z",
    spec: {
      operatingSystem: "Android",
      chipset: "Octa-Core (2.75GHz, 2GHz)",
      displaySizeInches: 6.6,
      displayResolution: "1080 x 2340 (FHD+)",
      batteryMah: 5000,
      cameraSummary: "50MP + 12MP + 5MP rear; 32MP front",
      has5g: true,
      hasNfc: true,
      supportsEsim: true,
    },
    variants: [
      {
        sku: "SM-A556E-8GB-256GB",
        name: "8GB / 256GB",
        color: "Awesome Lilac",
        ramGb: 8,
        storageGb: 256,
        price: {
          retailerSlug: "samsung-ph",
          retailerName: "Samsung Philippines",
          retailerWebsiteUrl: "https://www.samsung.com/ph/",
          amount: 24990,
          currency: "PHP",
          availability: "historical_launch_price",
          productUrl:
            "https://www.samsung.com/ph/business/smartphones/galaxy-a/galaxy-a55-5g-awesome-lilac-256gb-sm-a556elvcphl/",
          checkedAt: "2024-03-18T00:00:00.000Z",
        },
      },
    ],
  },
  ...additionalSamsungPhones.map(makeSamsungPhone),
];

const dataSourceFields = {
  name: "Phone Product Seed Data",
  websiteUrl:
    "https://www.samsung.com/ph/business/smartphones/galaxy-a/galaxy-a55-5g-awesome-lilac-256gb-sm-a556elvcphl/",
  license: "Replace with the verified source license before adding products.",
  attributionText:
    "Replace with the source attribution required for your product data.",
};

async function main() {
  if (products.length === 0) {
    console.log("No products to seed. Add verified products to the products array.");
    return;
  }

  const dataSource =
    (await db.orm.public.DataSource.where({
      name: dataSourceFields.name,
    }).first()) ??
    (await db.orm.public.DataSource.create(dataSourceFields));

  for (const item of products) {
    const brand =
      (await db.orm.public.Brand.where({
        slug: item.brand.slug,
      }).first()) ??
      (await db.orm.public.Brand.create({
        slug: item.brand.slug,
        name: item.brand.name,
        websiteUrl: item.brand.websiteUrl ?? null,
      }));

    let product = await db.orm.public.Product.where({
      slug: item.slug,
    }).first();

    const productFields = {
      slug: item.slug,
      type: "PHONE",
      name: item.name,
      model: item.model ?? null,
      description: item.description ?? null,
      imageUrl: item.imageUrl ?? null,
      releaseDate: item.releaseDate ?? null,
      brandId: brand.id,
      dataSourceId: dataSource.id,
      isPublished: true,
    };

    if (product) {
      await db.orm.public.Product.where({ id: product.id }).update(productFields);
    } else {
      product = await db.orm.public.Product.create(productFields);
    }

    const existingSpec = await db.orm.public.PhoneSpec.where({
      productId: product.id,
    }).first();

    if (existingSpec) {
      await db.orm.public.PhoneSpec.where({ id: existingSpec.id }).update(item.spec);
    } else {
      await db.orm.public.PhoneSpec.create({
        productId: product.id,
        ...item.spec,
      });
    }

    for (const variantData of item.variants) {
      let variant = await db.orm.public.ProductVariant.where({
        productId: product.id,
        sku: variantData.sku,
      }).first();

      const variantFields = {
        name: variantData.name,
        color: variantData.color ?? null,
        ramGb: variantData.ramGb ?? null,
        storageGb: variantData.storageGb ?? null,
        sku: variantData.sku,
      };

      if (variant) {
        await db.orm.public.ProductVariant.where({ id: variant.id }).update(
          variantFields,
        );
      } else {
        variant = await db.orm.public.ProductVariant.create({
          productId: product.id,
          ...variantFields,
        });
      }

      const priceData = variantData.price;
      const retailer =
        (await db.orm.public.Retailer.where({
          slug: priceData.retailerSlug,
        }).first()) ??
        (await db.orm.public.Retailer.create({
          slug: priceData.retailerSlug,
          name: priceData.retailerName,
          websiteUrl: priceData.retailerWebsiteUrl ?? null,
        }));

      const existingPrice = await db.orm.public.ProductPrice.where({
        variantId: variant.id,
        retailerId: retailer.id,
        checkedAt: priceData.checkedAt,
      }).first();

      if (!existingPrice) {
        await db.orm.public.ProductPrice.create({
          variantId: variant.id,
          retailerId: retailer.id,
          amount: priceData.amount,
          currency: priceData.currency,
          availability: priceData.availability ?? null,
          productUrl: priceData.productUrl ?? null,
          checkedAt: priceData.checkedAt,
        });
      }
    }

    console.log(`Seeded: ${product.name}`);
  }

  console.log(`Finished. ${products.length} products are available.`);
}

main().catch((error) => {
  console.error("Product seed failed:", error);
  process.exitCode = 1;
});
