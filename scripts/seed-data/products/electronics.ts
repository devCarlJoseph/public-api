import type { SeedProduct } from "../../../services/seed/types";

export const electronics: SeedProduct[] = [
  {
    type: "ELECTRONICS",
    slug: "wireless-headphones",
    name: "Wireless Headphones",
    model: "WH-1000",
    description: "Wireless noise-cancelling headphones.",
    imageUrl:
      "https://catalogra.vercel.app/images/products/wireless-headphones.jpg",
    brand: {
      slug: "catalogra-audio",
      name: "Catalogra Audio",
    },
    variants: [
      {
        sku: "WH-1000-BLACK",
        name: "Black",
        color: "Black",
        price: {
          retailerSlug: "catalogra-store",
          retailerName: "Catalogra Store",
          amount: 4999,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
        },
      },
    ],
  },
];