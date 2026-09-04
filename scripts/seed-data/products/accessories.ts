import type { SeedProduct } from "../../../services/seed/types";

export const accessories: SeedProduct[] = [
  {
    type: "ACCESSORY",
    slug: "usb-c-fast-charger",
    name: "USB-C Fast Charger",
    model: "UC-65W",
    description:
      "Compact 65W USB-C charger for phones, tablets, and laptops.",
    imageUrl:
      "https://catalogra.vercel.app/images/products/usb-c-fast-charger.jpg",
    brand: {
      slug: "catalogra-power",
      name: "Catalogra Power",
    },
    variants: [
      {
        sku: "UC-65W-WHITE",
        name: "White",
        color: "White",
        price: {
          retailerSlug: "catalogra-store",
          retailerName: "Catalogra Store",
          amount: 1299,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
        },
      },
    ],
  },
];