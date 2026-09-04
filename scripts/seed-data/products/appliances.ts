import type { SeedProduct } from "../../../services/seed/types";

export const appliances: SeedProduct[] = [
  {
    type: "APPLIANCE",
    slug: "digital-air-fryer",
    name: "Digital Air Fryer",
    model: "AF-500",
    description:
      "Digital air fryer with adjustable temperature and cooking timer.",
    imageUrl:
      "https://catalogra.vercel.app/images/products/digital-air-fryer.jpg",
    brand: {
      slug: "catalogra-home",
      name: "Catalogra Home",
    },
    variants: [
      {
        sku: "AF-500-BLACK",
        name: "Black",
        color: "Black",
        price: {
          retailerSlug: "catalogra-store",
          retailerName: "Catalogra Store",
          amount: 3499,
          currency: "PHP",
          availability: "available",
          checkedAt: "2026-09-04T00:00:00.000Z",
        },
      },
    ],
  },
];