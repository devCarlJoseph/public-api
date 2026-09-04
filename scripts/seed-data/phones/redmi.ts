import type { SeedProduct } from "../../../services/seed/types";

export const redmiPhones: SeedProduct[] = [
  {
    type: "PHONE",
    slug: "redmi-note-14-pro-5g",
    name: "Redmi Note 14 Pro 5G",
    model: "24090RA29G",
    description:
      "Mid-range 5G smartphone with a high-resolution display and large battery.",
    imageUrl:
      "https://catalogra.vercel.app/images/phones/redmi-note-14-pro-5g.jpg",
    releaseDate: "2025-01-15T00:00:00.000Z",
    brand: {
      slug: "redmi",
      name: "Redmi",
      websiteUrl: "https://www.mi.com/ph/",
    },
    phoneSpec: {
      operatingSystem: "Android",
      chipset: "MediaTek Dimensity 7300-Ultra",
      displaySizeInches: 6.67,
      batteryMah: 5110,
      cameraSummary: "200MP main + 8MP ultrawide + 2MP macro",
      has5g: true,
      hasNfc: true,
    },
    variants: [
      {
        sku: "REDMI-NOTE14-PRO-256GB-BLACK",
        name: "256GB Black",
        color: "Black",
        ramGb: 8,
        storageGb: 256,
        price: {
          retailerSlug: "xiaomi-ph",
          retailerName: "Xiaomi Philippines",
          amount: 17999,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
          productUrl: "https://www.mi.com/ph/",
        },
      },
    ],
  },
];