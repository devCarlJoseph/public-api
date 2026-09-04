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