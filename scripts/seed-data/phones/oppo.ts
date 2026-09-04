import type { SeedProduct } from "../../../services/seed/types";

export const oppoPhones: SeedProduct[] = [
  {
    type: "PHONE",
    slug: "oppo-reno14-5g",
    name: "OPPO Reno14 5G",
    model: "CPH2737",
    description:
      "Premium 5G smartphone with an OLED display and versatile camera system.",
    imageUrl:
      "https://catalogra.vercel.app/images/phones/oppo-reno14-5g.jpg",
    releaseDate: "2025-06-01T00:00:00.000Z",
    brand: {
      slug: "oppo",
      name: "OPPO",
      websiteUrl: "https://www.oppo.com/ph/",
    },
    phoneSpec: {
      operatingSystem: "Android",
      chipset: "MediaTek Dimensity 8350",
      displaySizeInches: 6.59,
      batteryMah: 6000,
      cameraSummary: "50MP main + 50MP telephoto + 8MP ultrawide",
      has5g: true,
      hasNfc: true,
    },
    variants: [
      {
        sku: "OPPO-RENO14-256GB-PURPLE",
        name: "256GB Purple",
        color: "Purple",
        ramGb: 12,
        storageGb: 256,
        price: {
          retailerSlug: "oppo-ph",
          retailerName: "OPPO Philippines",
          amount: 31999,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
          productUrl: "https://www.oppo.com/ph/",
        },
      },
    ],
  },
];