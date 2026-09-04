import type { SeedProduct } from "../../../services/seed/types";

export const applePhones: SeedProduct[] = [
  {
    type: "PHONE",
    slug: "iphone-16",
    name: "iPhone 16",
    model: "A3281",
    description:
      "Apple smartphone with an A18 chip, advanced camera system, and all-day battery life.",
    imageUrl:
      "https://catalogra.vercel.app/images/phones/iphone-16.jpg",
    releaseDate: "2024-09-20T00:00:00.000Z",
    brand: {
      slug: "apple",
      name: "Apple",
      websiteUrl: "https://www.apple.com/ph/",
    },
    phoneSpec: {
      operatingSystem: "iOS",
      chipset: "Apple A18",
      displaySizeInches: 6.1,
      displayResolution: "2556 x 1179",
      batteryMah: 3561,
      cameraSummary: "48MP main + 12MP ultrawide; 12MP front",
      has5g: true,
      hasNfc: true,
      supportsEsim: true,
    },
    variants: [
      {
        sku: "IPHONE-16-128GB-BLACK",
        name: "128GB Black",
        color: "Black",
        storageGb: 128,
        price: {
          retailerSlug: "apple-ph",
          retailerName: "Apple Philippines",
          amount: 54990,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
          productUrl: "https://www.apple.com/ph/",
        },
      },
    ],
  },
];