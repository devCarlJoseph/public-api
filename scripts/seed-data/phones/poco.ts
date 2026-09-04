import type { SeedProduct } from "../../../services/seed/types";

export const pocoPhones: SeedProduct[] = [
  {
    type: "PHONE",
    slug: "poco-f6",
    name: "POCO F6",
    model: "24069PC21G",
    description:
      "High-performance 5G phone designed for gaming and demanding applications.",
    imageUrl:
      "https://catalogra.vercel.app/images/phones/poco-f6.jpg",
    releaseDate: "2024-05-23T00:00:00.000Z",
    brand: {
      slug: "poco",
      name: "POCO",
      websiteUrl: "https://www.po.co/global/",
    },
    phoneSpec: {
      operatingSystem: "Android",
      chipset: "Snapdragon 8s Gen 3",
      displaySizeInches: 6.67,
      batteryMah: 5000,
      cameraSummary: "50MP main + 8MP ultrawide",
      has5g: true,
      hasNfc: true,
    },
    variants: [
      {
        sku: "POCO-F6-256GB-BLACK",
        name: "256GB Black",
        color: "Black",
        ramGb: 12,
        storageGb: 256,
        price: {
          retailerSlug: "poco-ph",
          retailerName: "POCO Philippines",
          amount: 21999,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
          productUrl: "https://www.po.co/global/",
        },
      },
    ],
  },
];