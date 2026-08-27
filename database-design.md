model Brand {
  id         Int      @id @default(autoincrement())
  slug       String   @unique
  name       String
  websiteUrl String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  products Product[]
}

model Product {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  type        String   // PHONE, OTHER
  brandId     Int?
  name        String
  model       String?
  description String?
  imageUrl    String?
  releaseDate DateTime?
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  brand      Brand?             @relation(fields: [brandId], references: [id])
  phoneSpec  PhoneSpec?
  variants   ProductVariant[]
  categories ProductCategory[]

  @@index([type])
  @@index([brandId])
  @@index([isPublished])
}

model PhoneSpec {
  id                Int      @id @default(autoincrement())
  productId         Int      @unique
  operatingSystem   String?
  chipset           String?
  displaySizeInches Float?
  displayResolution String?
  batteryMah        Int?
  cameraSummary     String?
  has5g             Boolean  @default(false)
  hasNfc            Boolean?
  supportsEsim      Boolean?
  updatedAt         DateTime @updatedAt

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model ProductVariant {
  id        Int      @id @default(autoincrement())
  productId Int
  name      String?
  color     String?
  ramGb     Int?
  storageGb Int?
  sku       String?
  createdAt DateTime @default(now())

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  prices  ProductPrice[]

  @@index([productId])
}

model Retailer {
  id         Int      @id @default(autoincrement())
  slug       String   @unique
  name       String
  websiteUrl String?

  prices ProductPrice[]
}

model ProductPrice {
  id           Int      @id @default(autoincrement())
  variantId    Int
  retailerId   Int?
  amount       Float
  currency     String   @default("USD")
  availability String?
  productUrl   String?
  checkedAt    DateTime @default(now())

  variant  ProductVariant @relation(fields: [variantId], references: [id], onDelete: Cascade)
  retailer Retailer?      @relation(fields: [retailerId], references: [id])

  @@index([variantId, checkedAt])
}

model ProductCategory {
  productId  Int
  categoryId Int

  product  Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  category Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@id([productId, categoryId])
}