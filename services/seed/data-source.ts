import { db } from "../../prisma/db";

export async function getOrCreateDataSource() {
  return (
    (await db.orm.public.DataSource.where({
      name: "Catalogra Product Seed Data",
    }).first()) ??
    (await db.orm.public.DataSource.create({
      name: "Catalogra Product Seed Data",
      license: "Verify source licenses before publishing.",
      attributionText: "Verify source attribution before publishing.",
    }))
  );
}

export async function getOrCreateRecipeDataSource() {
  return (
    (await db.orm.public.DataSource.where({
      name: "Original Recipe Seed Data",
    }).first()) ??
    (await db.orm.public.DataSource.create({
      name: "Original Recipe Seed Data",
      license: "Original content",
      attributionText: "Created for Catalogra",
    }))
  );
}