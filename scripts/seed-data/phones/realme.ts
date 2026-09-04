import type { SeedProduct } from "../../../services/seed/types";

export const realmePhones: SeedProduct[] = [
  {
    type: "PHONE",
    slug: "realme-gt-7",
    name: "realme GT 7",
    model: "RMX5061",
    description:
      "Performance-focused 5G smartphone with a large battery and fast charging.",
    imageUrl:
      "https://catalogra.vercel.app/images/phones/realme-gt-7.jpg",
    releaseDate: "2025-06-01T00:00:00.000Z",
    brand: {
      slug: "realme",
      name: "realme",
      websiteUrl: "https://www.realme.com/ph/",
    },
    phoneSpec: {
      operatingSystem: "Android",
      chipset: "Dimensity 9400e",
      displaySizeInches: 6.78,
      batteryMah: 7000,
      cameraSummary: "50MP main camera system",
      has5g: true,
    },
    variants: [
      {
        sku: "REALME-GT7-256GB-BLACK",
        name: "256GB Black",
        color: "Black",
        ramGb: 12,
        storageGb: 256,
        price: {
          retailerSlug: "realme-ph",
          retailerName: "realme Philippines",
          amount: 37999,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
          productUrl: "https://www.realme.com/ph/",
        },
      },
    ],
  },
];