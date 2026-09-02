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

type PhoneBrand = SeedProduct["brand"] & {
  defaultAvailability?: string;
};

type PhoneSeed = Omit<SeedProduct, "brand" | "spec" | "variants"> & {
  operatingSystem?: string;
  chipset?: string;
  displaySizeInches?: number;
  displayResolution?: string;
  batteryMah?: number;
  cameraSummary?: string;
  has5g?: boolean;
  hasNfc?: boolean;
  supportsEsim?: boolean;
  ramGb?: number;
  storageGb: number;
  amount: number;
  availability?: string;
  retailerSlug?: string;
  retailerName?: string;
  retailerWebsiteUrl?: string;
  sourceUrl: string;
  checkedAt?: string;
};

const DEFAULT_CHECKED_AT = "2026-09-03T00:00:00.000Z";

function makePhone(item: PhoneSeed, brand: PhoneBrand): SeedProduct {
  const retailerSlug = item.retailerSlug ?? `${brand.slug}-ph`;
  const retailerName = item.retailerName ?? `${brand.name} Philippines`;
  const retailerWebsiteUrl = item.retailerWebsiteUrl ?? brand.websiteUrl;

  return {
    brand,
    slug: item.slug,
    name: item.name,
    model: item.model,
    description: item.description,
    releaseDate: item.releaseDate,
    spec: {
      operatingSystem: item.operatingSystem ?? "Android",
      chipset: item.chipset,
      displaySizeInches: item.displaySizeInches,
      displayResolution: item.displayResolution,
      batteryMah: item.batteryMah,
      cameraSummary: item.cameraSummary,
      has5g: item.has5g,
      hasNfc: item.hasNfc ?? true,
      supportsEsim: item.supportsEsim,
    },
    variants: [
      {
        sku: `${item.slug}-${item.ramGb ? `${item.ramGb}GB-` : ""}${item.storageGb}GB`,
        name: item.ramGb
          ? `${item.ramGb}GB / ${item.storageGb}GB`
          : `${item.storageGb}GB`,
        ramGb: item.ramGb,
        storageGb: item.storageGb,
        price: {
          retailerSlug,
          retailerName,
          retailerWebsiteUrl,
          amount: item.amount,
          currency: "PHP",
          availability:
            item.availability ??
            brand.defaultAvailability ??
            "historical_launch_price",
          productUrl: item.sourceUrl,
          checkedAt: item.checkedAt ?? DEFAULT_CHECKED_AT,
        },
      },
    ],
  };
}

const SAMSUNG: PhoneBrand = {
  slug: "samsung",
  name: "Samsung",
  websiteUrl: "https://www.samsung.com/ph/",
};
const REALME: PhoneBrand = {
  slug: "realme",
  name: "realme",
  websiteUrl: "https://www.realme.com/ph/",
  defaultAvailability: "listed_price",
};
const OPPO: PhoneBrand = {
  slug: "oppo",
  name: "OPPO",
  websiteUrl: "https://www.oppo.com/ph/",
};
const APPLE: PhoneBrand = {
  slug: "apple",
  name: "Apple",
  websiteUrl: "https://www.apple.com/ph/",
};
const POCO: PhoneBrand = {
  slug: "poco",
  name: "POCO",
  websiteUrl: "https://www.mi.com/ph/",
};
const REDMI: PhoneBrand = {
  slug: "redmi",
  name: "Redmi",
  websiteUrl: "https://www.mi.com/ph/",
};

const additionalSamsungPhones: PhoneSeed[] = [
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
    sourceUrl:
      "https://news.samsung.com/ph/create-connect-and-conquer-the-awesome-way-with-the-samsung-galaxy-a-series",
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
    sourceUrl:
      "https://news.samsung.com/ph/create-connect-and-conquer-the-awesome-way-with-the-samsung-galaxy-a-series",
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
    sourceUrl:
      "https://news.samsung.com/ph/awesome-intelligence-for-all-the-galaxy-a26-5g-is-now-available-in-the-philippines",
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
    sourceUrl:
      "https://news.samsung.com/ph/enter-the-new-era-of-mobile-ai-with-samsung-galaxy-s24-series",
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
    sourceUrl:
      "https://news.samsung.com/ph/enter-the-new-era-of-mobile-ai-with-samsung-galaxy-s24-series",
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
    sourceUrl:
      "https://news.samsung.com/ph/enter-the-new-era-of-mobile-ai-with-samsung-galaxy-s24-series",
  },
];

const additionalRealmePhones: PhoneSeed[] = [
  {
    slug: "realme-gt-7",
    name: "realme GT 7",
    model: "RMX5061",
    description:
      "A performance-focused 5G flagship with a high-capacity battery, fast charging, and a powerful MediaTek platform for demanding mobile use.",
    displaySizeInches: 6.78,
    batteryMah: 7000,
    chipset: "Dimensity 9400e",
    cameraSummary: "50MP main camera system",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 37999,
    sourceUrl: "https://www.realme.com/ph/realme-gt-7-5g",
  },
  {
    slug: "realme-gt-7t",
    name: "realme GT 7T",
    model: "RMX5080",
    description:
      "A gaming-oriented 5G phone designed around sustained performance, rapid charging, and a large battery for extended sessions.",
    displaySizeInches: 6.8,
    batteryMah: 7000,
    chipset: "Dimensity 8400-Max",
    cameraSummary: "50MP main camera",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 29999,
    sourceUrl: "https://www.realme.com/ph/",
  },
  {
    slug: "realme-gt-6",
    name: "realme GT 6",
    model: "RMX3851",
    description:
      "A premium 5G performance phone combining a high-refresh display, fast charging, and flagship-grade processing for gaming and multitasking.",
    displaySizeInches: 6.78,
    batteryMah: 5500,
    chipset: "Snapdragon 8s Gen 3",
    cameraSummary: "50MP main camera system",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 34999,
    sourceUrl: "https://www.realme.com/ph/",
  },
  {
    slug: "realme-13-pro-5g",
    name: "realme 13 Pro 5G",
    model: "RMX3990",
    description:
      "A camera-centered 5G phone with an OLED 120Hz display, optical image stabilization, and a 5,200mAh battery for all-day use.",
    displaySizeInches: 6.7,
    batteryMah: 5200,
    chipset: "Snapdragon 7s Gen 2",
    cameraSummary: "50MP Sony OIS main + 8MP ultrawide; 32MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 24999,
    sourceUrl: "https://www.realme.com/ph/more-products/realme-13-pro-5g/specs",
  },
  {
    slug: "realme-13-pro-plus-5g",
    name: "realme 13 Pro+ 5G",
    model: "RMX3921",
    description:
      "A higher-tier 5G imaging phone in the 13 series, built for portrait photography, smooth OLED viewing, and fast charging.",
    displaySizeInches: 6.7,
    batteryMah: 5200,
    chipset: "Snapdragon 7s Gen 2",
    cameraSummary: "50MP OIS camera system",
    has5g: true,
    ramGb: 12,
    storageGb: 512,
    amount: 28999,
    sourceUrl: "https://www.realme.com/ph/",
  },
  {
    slug: "realme-13-plus-5g",
    name: "realme 13+ 5G",
    model: "RMX3868",
    description:
      "A mid-range 5G phone focused on smooth high-refresh performance, fast charging, and generous storage for everyday entertainment.",
    displaySizeInches: 6.7,
    batteryMah: 5000,
    chipset: "Dimensity 7300 Energy",
    cameraSummary: "50MP OIS main camera",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 17999,
    sourceUrl: "https://www.realme.com/ph/",
  },
  {
    slug: "realme-13-5g",
    name: "realme 13 5G",
    model: "RMX3951",
    description:
      "An affordable 5G phone with a 120Hz FHD+ display, 5,000mAh battery, and optical-stabilized main camera.",
    displaySizeInches: 6.72,
    batteryMah: 5000,
    chipset: "Dimensity 6300 5G",
    cameraSummary: "50MP OIS main camera; 16MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 16999,
    sourceUrl: "https://www.realme.com/ph/more-products/realme-13-5g/specs",
  },
  {
    slug: "realme-c75",
    name: "realme C75",
    model: "RMX3941",
    description:
      "A durable 4G phone with IP-rated water protection, a 6,000mAh battery, 45W charging, and a 90Hz FHD+ display.",
    displaySizeInches: 6.72,
    batteryMah: 6000,
    chipset: "Helio G92 Max",
    cameraSummary: "50MP main camera; 8MP selfie",
    has5g: false,
    ramGb: 8,
    storageGb: 128,
    amount: 8999,
    sourceUrl: "https://www.realme.com/ph/realme-c75/specs",
  },
  {
    slug: "realme-note-60",
    name: "realme Note 60",
    model: "RMX3933",
    description:
      "An entry-level 4G smartphone with a 90Hz display, 5,000mAh battery, expandable storage, and a lightweight everyday design.",
    displaySizeInches: 6.74,
    batteryMah: 5000,
    chipset: "UNISOC T612",
    cameraSummary: "32MP main camera",
    has5g: false,
    ramGb: 6,
    storageGb: 128,
    amount: 4399,
    sourceUrl: "https://www.realme.com/ph/more-products/realme-note60/specs",
  },
  {
    slug: "realme-c75x",
    name: "realme C75x",
    model: "RMX5020",
    description:
      "A value-focused realme phone with reinforced durability, a smooth display, and a large battery for dependable everyday use.",
    displaySizeInches: 6.67,
    batteryMah: 5600,
    chipset: "Octa-Core mobile platform",
    cameraSummary: "50MP main camera",
    has5g: false,
    ramGb: 8,
    storageGb: 128,
    amount: 7999,
    sourceUrl: "https://www.realme.com/ph/realme-c75x",
  },
];

const additionalOppoPhones: PhoneSeed[] = [
  {
    slug: "oppo-reno14-pro-5g",
    name: "OPPO Reno14 Pro 5G",
    description:
      "A high-end 5G phone with a 120Hz OLED display, three 50MP rear cameras, and fast charging for demanding photography and entertainment.",
    displaySizeInches: 6.83,
    displayResolution: "1272 x 2800",
    batteryMah: 6200,
    chipset: "MediaTek Dimensity 8450",
    cameraSummary: "50MP main + 50MP telephoto + 50MP ultrawide; 50MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 512,
    amount: 47999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-reno/reno14-pro/",
  },
  {
    slug: "oppo-reno14-5g",
    name: "OPPO Reno14 5G",
    model: "CPH2737",
    description:
      "A premium 5G phone with a 120Hz OLED display, a 6,000mAh battery, 80W charging, and a versatile 50MP camera system with telephoto zoom.",
    displaySizeInches: 6.59,
    displayResolution: "1256 x 2760",
    batteryMah: 6000,
    chipset: "MediaTek Dimensity 8350",
    cameraSummary:
      "50MP main + 50MP 3.5x telephoto + 8MP ultrawide; 50MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 31999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-reno/reno14/",
  },
  {
    slug: "oppo-reno14-f-5g",
    name: "OPPO Reno14 F 5G",
    description:
      "A style-focused 5G phone with a 120Hz AMOLED display, IP-rated protection, AI photo tools, and all-day battery life.",
    displaySizeInches: 6.57,
    displayResolution: "1080 x 2372",
    batteryMah: 6000,
    chipset: "Snapdragon 6 Gen 1",
    cameraSummary: "50MP main + 8MP ultrawide + 2MP macro; 32MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 21999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-reno/reno14-f-5g/",
  },
  {
    slug: "oppo-reno13-pro-5g",
    name: "OPPO Reno13 Pro 5G",
    description:
      "A premium 5G imaging phone with a curved OLED display, telephoto camera, IP69 protection, and 80W fast charging.",
    displaySizeInches: 6.83,
    displayResolution: "1272 x 2800",
    batteryMah: 5800,
    chipset: "MediaTek Dimensity 8350",
    cameraSummary: "50MP main + 50MP telephoto + 8MP ultrawide; 50MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 512,
    amount: 43999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-reno/reno13-pro/",
  },
  {
    slug: "oppo-reno13-5g",
    name: "OPPO Reno13 5G",
    model: "CPH2689",
    description:
      "A water-resistant 5G phone with a 120Hz OLED display, a 50MP camera, and 80W charging for daily creation and entertainment.",
    displaySizeInches: 6.59,
    displayResolution: "1256 x 2760",
    batteryMah: 5600,
    chipset: "MediaTek Dimensity 8350",
    cameraSummary: "50MP main + 8MP ultrawide + 2MP monochrome; 50MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 512,
    amount: 34999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-reno/reno13/",
  },
  {
    slug: "oppo-reno13-f-5g",
    name: "OPPO Reno13 F 5G",
    description:
      "A mid-range 5G phone with IP69 protection, a 120Hz AMOLED screen, and a stabilized 50MP main camera.",
    displaySizeInches: 6.67,
    displayResolution: "1080 x 2400",
    batteryMah: 5800,
    chipset: "Snapdragon 6 Gen 1",
    cameraSummary: "50MP OIS main + 8MP ultrawide + 2MP macro; 32MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 22999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-reno/reno13-f-5g/",
  },
  {
    slug: "oppo-a5-pro-5g",
    name: "OPPO A5 Pro 5G",
    description:
      "A durable 5G phone with IP69 water and dust protection, a 5,800mAh battery, and military-grade shock resistance.",
    displaySizeInches: 6.67,
    displayResolution: "720 x 1604",
    batteryMah: 5800,
    chipset: "MediaTek Dimensity 6300",
    cameraSummary: "50MP main + 2MP monochrome; 8MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 15999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-a/a5-pro-5g/",
  },
  {
    slug: "oppo-a5-pro",
    name: "OPPO A5 Pro",
    description:
      "A durable 4G phone with IP-rated protection, a large battery, and fast charging for dependable everyday use.",
    displaySizeInches: 6.67,
    displayResolution: "720 x 1604",
    batteryMah: 5800,
    chipset: "MediaTek Helio G100",
    cameraSummary: "50MP main + 2MP monochrome; 8MP selfie",
    has5g: false,
    ramGb: 8,
    storageGb: 256,
    amount: 13999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-a/a5-pro/",
  },
  {
    slug: "oppo-a5-5g",
    name: "OPPO A5 5G",
    description:
      "An affordable 5G phone with a 120Hz display, a 6,000mAh battery, 45W charging, and reinforced durability.",
    displaySizeInches: 6.67,
    displayResolution: "720 x 1604",
    batteryMah: 6000,
    chipset: "MediaTek Dimensity 6300",
    cameraSummary: "50MP main + 2MP monochrome; 8MP selfie",
    has5g: true,
    ramGb: 6,
    storageGb: 128,
    amount: 9999,
    sourceUrl: "https://www.oppo.com/ph/product/oppo-a5-5g.P.P1100465",
  },
  {
    slug: "oppo-a3",
    name: "OPPO A3",
    model: "CPH2669",
    description:
      "A durable entry-level 4G phone with a 90Hz display, 45W charging, and military-grade shock resistance.",
    displaySizeInches: 6.67,
    displayResolution: "720 x 1604",
    batteryMah: 5100,
    chipset: "Snapdragon 6s 4G Gen 1",
    cameraSummary: "50MP main camera; 5MP selfie",
    has5g: false,
    ramGb: 6,
    storageGb: 128,
    amount: 8999,
    sourceUrl: "https://www.oppo.com/ph/smartphones/series-a/a3/",
  },
];

const additionalIphonePhones: SeedProduct[] = [
  {
    brand: {
      slug: "apple",
      name: "Apple",
      websiteUrl: "https://www.apple.com/ph/",
    },
    slug: "iphone-17",
    name: "iPhone 17",
    description:
      "Apple's latest standard iPhone with an A19 chip, a 6.3-inch OLED display, a 48MP dual-camera system, and Apple Intelligence features.",
    releaseDate: "2025-09-19",
    spec: {
      operatingSystem: "iOS 26",
      chipset: "Apple A19",
      displaySizeInches: 6.3,
      displayResolution: "2622 x 1206",
      cameraSummary:
        "48MP Fusion main + 48MP Fusion ultrawide; 18MP Center Stage front",
      has5g: true,
      hasNfc: true,
      supportsEsim: true,
    },
    variants: [
      {
        sku: "IPHONE17-256GB",
        name: "256GB",
        storageGb: 256,
        price: {
          retailerSlug: "apple-ph",
          retailerName: "Apple Philippines",
          retailerWebsiteUrl: "https://www.apple.com/ph/",
          amount: 57990,
          currency: "PHP",
          availability: "listed_price",
          productUrl: "https://www.apple.com/ph/shop/buy-iphone/iphone-17",
          checkedAt: "2026-09-03T00:00:00.000Z",
        },
      },
    ],
  },
];

function makeApplePhone(item: PhoneSeed): SeedProduct {
  return makePhone(item, APPLE);
}

const additionalApplePhones: SeedProduct[] = [
  makeApplePhone({
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    description:
      "A pro iPhone with the A19 Pro chip, a pro camera system, and a bright OLED display for demanding creative work.",
    operatingSystem: "iOS 26",
    chipset: "Apple A19 Pro",
    displaySizeInches: 6.3,
    displayResolution: "2622 x 1206",
    cameraSummary:
      "48MP Fusion main + 48MP ultrawide + telephoto; 18MP Center Stage front",
    storageGb: 256,
    amount: 79990,
    sourceUrl: "https://www.apple.com/ph/iphone-17-pro/",
  }),
  makeApplePhone({
    slug: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    description:
      "Apple's largest pro iPhone with A19 Pro performance, an advanced multi-camera system, and all-day battery life.",
    operatingSystem: "iOS 26",
    chipset: "Apple A19 Pro",
    displaySizeInches: 6.9,
    displayResolution: "2868 x 1320",
    cameraSummary:
      "48MP Fusion main + 48MP ultrawide + telephoto; 18MP Center Stage front",
    storageGb: 256,
    amount: 86990,
    sourceUrl: "https://www.apple.com/ph/iphone-17-pro/",
  }),
  makeApplePhone({
    slug: "iphone-air",
    name: "iPhone Air",
    description:
      "An ultra-thin iPhone combining a large OLED display, A19 Pro performance, and a high-resolution Fusion camera.",
    operatingSystem: "iOS 26",
    chipset: "Apple A19 Pro",
    displaySizeInches: 6.5,
    displayResolution: "2736 x 1260",
    cameraSummary: "48MP Fusion main camera; 18MP Center Stage front",
    storageGb: 256,
    amount: 72990,
    sourceUrl: "https://www.apple.com/ph/iphone-air/",
  }),
  makeApplePhone({
    slug: "iphone-17e",
    name: "iPhone 17e",
    description:
      "A compact iPhone with the A19 chip, Apple Intelligence, a 48MP camera, and generous starting storage.",
    operatingSystem: "iOS 26",
    chipset: "Apple A19",
    displaySizeInches: 6.1,
    displayResolution: "2532 x 1170",
    cameraSummary: "48MP Fusion main camera; 12MP TrueDepth front",
    storageGb: 256,
    amount: 44990,
    sourceUrl: "https://www.apple.com/ph/iphone-17e/",
  }),
  makeApplePhone({
    slug: "iphone-16",
    name: "iPhone 16",
    description:
      "A capable everyday iPhone with the A18 chip, Camera Control, Apple Intelligence, and a dual Fusion camera system.",
    operatingSystem: "iOS 18",
    chipset: "Apple A18",
    displaySizeInches: 6.1,
    displayResolution: "2556 x 1179",
    cameraSummary: "48MP Fusion main + 12MP ultrawide; 12MP TrueDepth front",
    storageGb: 128,
    amount: 49990,
    sourceUrl: "https://www.apple.com/ph/iphone-16/",
  }),
  makeApplePhone({
    slug: "iphone-16-plus",
    name: "iPhone 16 Plus",
    description:
      "A large-screen iPhone with A18 performance, long battery life, and a versatile dual-camera system.",
    operatingSystem: "iOS 18",
    chipset: "Apple A18",
    displaySizeInches: 6.7,
    displayResolution: "2796 x 1290",
    cameraSummary: "48MP Fusion main + 12MP ultrawide; 12MP TrueDepth front",
    storageGb: 128,
    amount: 56990,
    sourceUrl: "https://www.apple.com/ph/iphone-16/",
  }),
  makeApplePhone({
    slug: "iphone-16e",
    name: "iPhone 16e",
    description:
      "An affordable iPhone powered by the A18 chip with Apple Intelligence, a 48MP camera, and satellite connectivity.",
    operatingSystem: "iOS 18",
    chipset: "Apple A18",
    displaySizeInches: 6.1,
    displayResolution: "2532 x 1170",
    cameraSummary: "48MP Fusion main camera; 12MP TrueDepth front",
    storageGb: 128,
    amount: 44990,
    sourceUrl: "https://www.apple.com/ph/iphone-16e/",
  }),
  makeApplePhone({
    slug: "iphone-15",
    name: "iPhone 15",
    description:
      "A colorful iPhone with the A16 Bionic chip, Dynamic Island, USB-C, and a 48MP main camera.",
    operatingSystem: "iOS 17",
    chipset: "Apple A16 Bionic",
    displaySizeInches: 6.1,
    displayResolution: "2556 x 1179",
    cameraSummary: "48MP main + 12MP ultrawide; 12MP TrueDepth front",
    storageGb: 128,
    amount: 56990,
    sourceUrl: "https://www.apple.com/ph/iphone-15/",
  }),
  makeApplePhone({
    slug: "iphone-15-plus",
    name: "iPhone 15 Plus",
    description:
      "A large-screen iPhone with A16 Bionic performance, a 48MP camera, and extended battery life.",
    operatingSystem: "iOS 17",
    chipset: "Apple A16 Bionic",
    displaySizeInches: 6.7,
    displayResolution: "2796 x 1290",
    cameraSummary: "48MP main + 12MP ultrawide; 12MP TrueDepth front",
    storageGb: 128,
    amount: 62990,
    sourceUrl: "https://www.apple.com/ph/iphone-15/",
  }),
];

function makePocoPhone(item: PhoneSeed): SeedProduct {
  return makePhone(item, POCO);
}

const additionalPocoPhones: SeedProduct[] = [
  makePocoPhone({
    slug: "poco-f7-ultra",
    name: "POCO F7 Ultra",
    description:
      "A performance flagship with a high-refresh AMOLED display, flagship Snapdragon silicon, and fast charging.",
    chipset: "Snapdragon 8 Elite",
    displaySizeInches: 6.67,
    displayResolution: "3200 x 1440",
    batteryMah: 5300,
    cameraSummary: "50MP main + 50MP telephoto + 32MP ultrawide; 32MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 39999,
    sourceUrl: "https://www.mi.com/ph/product/poco-f7-ultra/",
  }),
  makePocoPhone({
    slug: "poco-f7-pro",
    name: "POCO F7 Pro",
    description:
      "A gaming-focused 5G phone with a 120Hz AMOLED display, Snapdragon flagship performance, and a large battery.",
    chipset: "Snapdragon 8 Gen 3",
    displaySizeInches: 6.67,
    displayResolution: "3200 x 1440",
    batteryMah: 6000,
    cameraSummary: "50MP main + 8MP ultrawide; 20MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 28999,
    sourceUrl: "https://www.mi.com/ph/product/poco-f7-pro/",
  }),
  makePocoPhone({
    slug: "poco-f7",
    name: "POCO F7",
    description:
      "A high-performance 5G phone with a 120Hz AMOLED display, Snapdragon 8s Gen 4 power, and a 6500mAh battery.",
    chipset: "Snapdragon 8s Gen 4",
    displaySizeInches: 6.83,
    displayResolution: "2772 x 1280",
    batteryMah: 6500,
    cameraSummary: "50MP main + 8MP ultrawide; 20MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 512,
    amount: 28999,
    sourceUrl: "https://www.mi.com/ph/product/poco-f7/",
  }),
  makePocoPhone({
    slug: "poco-x7-pro",
    name: "POCO X7 Pro",
    description:
      "A performance-oriented 5G phone with a 120Hz AMOLED display, Dimensity 8400 Ultra, and a 6000mAh battery.",
    chipset: "MediaTek Dimensity 8400 Ultra",
    displaySizeInches: 6.67,
    displayResolution: "2712 x 1220",
    batteryMah: 6000,
    cameraSummary: "50MP OIS main + 8MP ultrawide; 20MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 19999,
    sourceUrl: "https://www.mi.com/ph/product/poco-x7-pro/",
  }),
  makePocoPhone({
    slug: "poco-x7",
    name: "POCO X7",
    description:
      "A value 5G phone with a curved 120Hz AMOLED display, capable cameras, and long-lasting battery life.",
    chipset: "MediaTek Dimensity 7300 Ultra",
    displaySizeInches: 6.67,
    displayResolution: "2712 x 1220",
    batteryMah: 5110,
    cameraSummary: "50MP OIS main + 8MP ultrawide + 2MP macro; 20MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 16999,
    sourceUrl: "https://www.mi.com/ph/product/poco-x7/",
  }),
  makePocoPhone({
    slug: "poco-m7-pro-5g",
    name: "POCO M7 Pro 5G",
    description:
      "A balanced 5G phone with a 120Hz AMOLED display, a large battery, and a high-resolution main camera.",
    chipset: "MediaTek Dimensity 700",
    displaySizeInches: 6.67,
    displayResolution: "2400 x 1080",
    batteryMah: 5110,
    cameraSummary: "50MP OIS main + 2MP depth; 20MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 14999,
    sourceUrl: "https://www.mi.com/ph/product/poco-m7-pro-5g/",
  }),
  makePocoPhone({
    slug: "poco-m7",
    name: "POCO M7",
    description:
      "An affordable large-screen 5G phone with a 7000mAh battery, smooth refresh rate, and expandable storage.",
    chipset: "Snapdragon 4 Gen 2",
    displaySizeInches: 6.9,
    displayResolution: "2340 x 1080",
    batteryMah: 7000,
    cameraSummary: "50MP main camera; 8MP selfie",
    has5g: true,
    ramGb: 6,
    storageGb: 128,
    amount: 9999,
    sourceUrl: "https://www.mi.com/ph/product/poco-m7/",
  }),
  makePocoPhone({
    slug: "poco-c75",
    name: "POCO C75",
    description:
      "A budget 4G phone with a 120Hz display, a large battery, and a practical everyday camera.",
    chipset: "MediaTek Helio G81 Ultra",
    displaySizeInches: 6.88,
    displayResolution: "1640 x 720",
    batteryMah: 5160,
    cameraSummary: "50MP main camera; 13MP selfie",
    has5g: false,
    ramGb: 8,
    storageGb: 256,
    amount: 7499,
    sourceUrl: "https://www.mi.com/ph/product/poco-c75/",
  }),
  makePocoPhone({
    slug: "poco-f6-pro",
    name: "POCO F6 Pro",
    description:
      "A flagship-killer 5G phone with a 120Hz WQHD+ AMOLED display, Snapdragon performance, and 120W charging.",
    chipset: "Snapdragon 8 Gen 2",
    displaySizeInches: 6.67,
    displayResolution: "3200 x 1440",
    batteryMah: 5000,
    cameraSummary: "50MP OIS main + 8MP ultrawide + 2MP macro; 16MP selfie",
    has5g: true,
    ramGb: 12,
    storageGb: 256,
    amount: 26999,
    sourceUrl: "https://www.mi.com/ph/product/poco-f6-pro/",
  }),
  makePocoPhone({
    slug: "poco-f6",
    name: "POCO F6",
    description:
      "A lightweight 5G performance phone with a 120Hz AMOLED display, Snapdragon 8s Gen 3, and fast charging.",
    chipset: "Snapdragon 8s Gen 3",
    displaySizeInches: 6.67,
    displayResolution: "2712 x 1220",
    batteryMah: 5000,
    cameraSummary: "50MP OIS main + 8MP ultrawide; 20MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 21999,
    sourceUrl: "https://www.mi.com/ph/product/poco-f6/",
  }),
];

function makeRedmiPhone(item: PhoneSeed): SeedProduct {
  return makePhone(item, REDMI);
}

const additionalRedmiPhones: SeedProduct[] = [
  makeRedmiPhone({
    slug: "redmi-note-14-pro-plus-5g",
    name: "Redmi Note 14 Pro+ 5G",
    description:
      "A premium Redmi 5G phone with a curved 1.5K display, 200MP camera, and 120W charging.",
    chipset: "Snapdragon 7s Gen 3",
    displaySizeInches: 6.67,
    displayResolution: "2712 x 1220",
    batteryMah: 5110,
    cameraSummary: "200MP OIS main + 8MP ultrawide + 2MP macro; 20MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 25999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-note-14-pro-plus-5g/",
  }),
  makeRedmiPhone({
    slug: "redmi-note-14-pro-5g",
    name: "Redmi Note 14 Pro 5G",
    description:
      "A camera-focused 5G phone with a 200MP OIS camera, IP68 resistance, and a 120Hz AMOLED display.",
    chipset: "MediaTek Dimensity 7300-Ultra",
    displaySizeInches: 6.67,
    displayResolution: "2712 x 1220",
    batteryMah: 5110,
    cameraSummary: "200MP OIS main + 8MP ultrawide; 20MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 19999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-note-14-pro-5g/",
  }),
  makeRedmiPhone({
    slug: "redmi-note-14-5g",
    name: "Redmi Note 14 5G",
    description:
      "A balanced 5G phone with a 120Hz AMOLED display, 108MP camera, and long-lasting battery.",
    chipset: "MediaTek Dimensity 7025-Ultra",
    displaySizeInches: 6.67,
    displayResolution: "2400 x 1080",
    batteryMah: 5110,
    cameraSummary: "108MP main + 2MP depth + 2MP macro; 20MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 14999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-note-14-5g/",
  }),
  makeRedmiPhone({
    slug: "redmi-note-14",
    name: "Redmi Note 14",
    description:
      "A value Redmi phone with a 120Hz AMOLED display, 108MP camera, and 5,500mAh battery.",
    chipset: "MediaTek Helio G99-Ultra",
    displaySizeInches: 6.67,
    displayResolution: "2400 x 1080",
    batteryMah: 5500,
    cameraSummary: "108MP main + 2MP depth + 2MP macro; 20MP selfie",
    has5g: false,
    ramGb: 8,
    storageGb: 256,
    amount: 11999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-note-14/",
  }),
  makeRedmiPhone({
    slug: "redmi-15-5g",
    name: "Redmi 15 5G",
    description:
      "A large-screen 5G Redmi phone built around a huge battery and a smooth adaptive display.",
    chipset: "Snapdragon 6s Gen 3",
    displaySizeInches: 6.9,
    displayResolution: "2340 x 1080",
    batteryMah: 7000,
    cameraSummary: "50MP main camera; 8MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 10999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-15-5g/",
  }),
  makeRedmiPhone({
    slug: "redmi-15",
    name: "Redmi 15",
    description:
      "A long-lasting 4G smartphone with a 7000mAh battery, large display, and durable everyday design.",
    chipset: "Snapdragon 685",
    displaySizeInches: 6.9,
    displayResolution: "2340 x 1080",
    batteryMah: 7000,
    cameraSummary: "50MP main camera; 8MP selfie",
    has5g: false,
    ramGb: 8,
    storageGb: 256,
    amount: 8999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-15/",
  }),
  makeRedmiPhone({
    slug: "redmi-a5",
    name: "Redmi A5",
    description:
      "An entry-level Redmi phone with a 120Hz display, 32MP camera, and 5,200mAh battery.",
    chipset: "UNISOC T7250",
    displaySizeInches: 6.88,
    displayResolution: "1640 x 720",
    batteryMah: 5200,
    cameraSummary: "32MP AI main camera; 5MP selfie",
    has5g: false,
    ramGb: 4,
    storageGb: 128,
    amount: 4999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-a5/",
  }),
  makeRedmiPhone({
    slug: "redmi-14c",
    name: "Redmi 14C",
    description:
      "A budget Redmi phone with a large 120Hz display, 5160mAh battery, and 50MP camera.",
    chipset: "MediaTek Helio G81 Ultra",
    displaySizeInches: 6.88,
    displayResolution: "1640 x 720",
    batteryMah: 5160,
    cameraSummary: "50MP main camera; 13MP selfie",
    has5g: false,
    ramGb: 8,
    storageGb: 256,
    amount: 6999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-14c/",
  }),
  makeRedmiPhone({
    slug: "redmi-13",
    name: "Redmi 13",
    description:
      "A dependable 4G phone with a 108MP camera, 90Hz display, and 5030mAh battery.",
    chipset: "MediaTek Helio G91 Ultra",
    displaySizeInches: 6.79,
    displayResolution: "2460 x 1080",
    batteryMah: 5030,
    cameraSummary: "108MP main + 2MP macro; 13MP selfie",
    has5g: false,
    ramGb: 8,
    storageGb: 128,
    amount: 7999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-13/",
  }),
  makeRedmiPhone({
    slug: "redmi-note-13-pro-plus-5g",
    name: "Redmi Note 13 Pro+ 5G",
    description:
      "A premium Redmi 5G phone with a 200MP OIS camera, curved AMOLED display, and fast charging.",
    chipset: "MediaTek Dimensity 7200-Ultra",
    displaySizeInches: 6.67,
    displayResolution: "2712 x 1220",
    batteryMah: 5000,
    cameraSummary: "200MP OIS main + 8MP ultrawide + 2MP macro; 16MP selfie",
    has5g: true,
    ramGb: 8,
    storageGb: 256,
    amount: 21999,
    sourceUrl: "https://www.mi.com/ph/product/redmi-note-13-pro-plus-5g/",
  }),
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
  ...additionalSamsungPhones.map((item) => makePhone(item, SAMSUNG)),
  ...additionalRealmePhones.map((item) => makePhone(item, REALME)),
  ...additionalOppoPhones.map((item) => makePhone(item, OPPO)),
  ...additionalIphonePhones,
  ...additionalApplePhones,
  ...additionalPocoPhones,
  ...additionalRedmiPhones,
];

const dataSourceFields = {
  name: "Phone Product Seed Data",
  websiteUrl:
    "https://www.samsung.com/ph/business/smartphones/galaxy-a/galaxy-a55-5g-awesome-lilac-256gb-sm-a556elvcphl/",
  license: "Replace with the verified source license before adding products.",
  attributionText:
    "Replace with the source attribution required for your product data.",
};

async function getOrCreateDataSource() {
  return (
    (await db.orm.public.DataSource.where({
      name: dataSourceFields.name,
    }).first()) ?? (await db.orm.public.DataSource.create(dataSourceFields))
  );
}

async function getOrCreateBrand(item: SeedProduct) {
  return (
    (await db.orm.public.Brand.where({ slug: item.brand.slug }).first()) ??
    (await db.orm.public.Brand.create({
      slug: item.brand.slug,
      name: item.brand.name,
      websiteUrl: item.brand.websiteUrl ?? null,
    }))
  );
}

async function upsertProduct(
  item: SeedProduct,
  brand: { id: number },
  dataSource: { id: number },
) {
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

  const product = await db.orm.public.Product.where({
    slug: item.slug,
  }).first();

  if (product) {
    await db.orm.public.Product.where({ id: product.id }).update(productFields);
    return product;
  }

  return db.orm.public.Product.create(productFields);
}

async function upsertPhoneSpec(productId: number, spec: SeedProduct["spec"]) {
  const existingSpec = await db.orm.public.PhoneSpec.where({
    productId,
  }).first();

  if (existingSpec) {
    await db.orm.public.PhoneSpec.where({ id: existingSpec.id }).update(spec);
    return;
  }

  await db.orm.public.PhoneSpec.create({ productId, ...spec });
}

async function getOrCreateRetailer(
  price: SeedProduct["variants"][number]["price"],
) {
  return (
    (await db.orm.public.Retailer.where({
      slug: price.retailerSlug,
    }).first()) ??
    (await db.orm.public.Retailer.create({
      slug: price.retailerSlug,
      name: price.retailerName,
      websiteUrl: price.retailerWebsiteUrl ?? null,
    }))
  );
}

async function upsertVariant(
  productId: number,
  variantData: SeedProduct["variants"][number],
) {
  const variantFields = {
    name: variantData.name,
    color: variantData.color ?? null,
    ramGb: variantData.ramGb ?? null,
    storageGb: variantData.storageGb ?? null,
    sku: variantData.sku,
  };

  const variant = await db.orm.public.ProductVariant.where({
    productId,
    sku: variantData.sku,
  }).first();

  if (variant) {
    await db.orm.public.ProductVariant.where({ id: variant.id }).update(
      variantFields,
    );
    return variant;
  }

  return db.orm.public.ProductVariant.create({ productId, ...variantFields });
}

async function upsertPrice(
  variantId: number,
  priceData: SeedProduct["variants"][number]["price"],
) {
  const retailer = await getOrCreateRetailer(priceData);
  const existingPrice = await db.orm.public.ProductPrice.where({
    variantId,
    retailerId: retailer.id,
    checkedAt: priceData.checkedAt,
  }).first();

  if (existingPrice) return;

  await db.orm.public.ProductPrice.create({
    variantId,
    retailerId: retailer.id,
    amount: priceData.amount,
    currency: priceData.currency,
    availability: priceData.availability ?? null,
    productUrl: priceData.productUrl ?? null,
    checkedAt: priceData.checkedAt,
  });
}

async function seedProduct(item: SeedProduct, dataSource: { id: number }) {
  const brand = await getOrCreateBrand(item);
  const product = await upsertProduct(item, brand, dataSource);

  await upsertPhoneSpec(product.id, item.spec);

  for (const variantData of item.variants) {
    const variant = await upsertVariant(product.id, variantData);
    await upsertPrice(variant.id, variantData.price);
  }

  console.log(`Seeded: ${product.name}`);
}

async function main() {
  if (products.length === 0) {
    console.log(
      "No products to seed. Add verified products to the products array.",
    );
    return;
  }

  const dataSource = await getOrCreateDataSource();

  for (const product of products) {
    await seedProduct(product, dataSource);
  }

  console.log(`Finished. ${products.length} products are available.`);
}

main().catch((error) => {
  console.error("Product seed failed:", error);
  process.exitCode = 1;
});
