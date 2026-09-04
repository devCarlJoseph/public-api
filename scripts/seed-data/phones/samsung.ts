import type { SeedProduct } from "../../../services/seed/types";

export const samsungPhones: SeedProduct[] = [
  {
    type: "PHONE",
    slug: "samsung-galaxy-a55-5g",
    name: "Samsung Galaxy A55 5G",
    model: "SM-A556E",
    description: "Samsung mid-range 5G smartphone.",
    imageUrl:
      "https://catalogra.vercel.app/images/phones/samsung-galaxy-a55-5g.jpg",
    releaseDate: "2024-03-18T00:00:00.000Z",
    brand: {
      slug: "samsung",
      name: "Samsung",
      websiteUrl: "https://www.samsung.com/ph/",
    },
    phoneSpec: {
      operatingSystem: "Android",
      displaySizeInches: 6.6,
      batteryMah: 5000,
      has5g: true,
      hasNfc: true,
    },
    variants: [
      {
        sku: "SM-A556E-8GB-256GB",
        name: "8GB / 256GB",
        ramGb: 8,
        storageGb: 256,
        price: {
          retailerSlug: "samsung-ph",
          retailerName: "Samsung Philippines",
          amount: 24990,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
          productUrl: "https://www.samsung.com/ph/",
        },
      },
    ],
  },
];