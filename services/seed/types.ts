export type SeedBrand = {
  slug: string;
  name: string;
  websiteUrl?: string;
};

export type SeedPhoneSpec = {
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

export type SeedPrice = {
  retailerSlug: string;
  retailerName: string;
  retailerWebsiteUrl?: string;
  amount: number;
  currency: string;
  availability?: string;
  productUrl?: string;
  checkedAt: string;
};

export type SeedVariant = {
  sku: string;
  name: string;
  color?: string;
  ramGb?: number;
  storageGb?: number;
  price: SeedPrice;
};

export type SeedProduct = {
  slug: string;
  type: string;
  name: string;
  model?: string;
  description?: string;
  imageUrl?: string;
  releaseDate?: string;
  brand: SeedBrand;
  phoneSpec?: SeedPhoneSpec;
  variants?: SeedVariant[];
};