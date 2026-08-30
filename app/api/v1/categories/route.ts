import { db } from "@/prisma/db";

export async function GET() {
  try {
    const categories = await db.orm.public.Category.select(
      "id",
      "slug",
      "name",
    )
    .orderBy((category) => category.name.asc())
    .all();

    return Response.json({
      data: categories,
    });
  } catch (error) {
    console.error("Failed to load categories", error);

    return Response.json (
      {
        error: {
          code: "CATEGORIES_FETCH_FAILED",
          message: "Unable to load categories",
        },
      },
      { status: 500 },
    );
  }
}
