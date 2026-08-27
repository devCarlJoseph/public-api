import { db } from "@/prisma/db";


export async function GET() {
  try {
    const recipes = await db.orm.public.Recipe
    .where({ isPublished: true })
    .select(
      "id",
      "slug",
      "title",
      "description",
      "imageUrl",
      "prepMinutes",
      "cookMinutes",
      "servings"
    )
    .orderBy((recipe) => recipe.createdAt.desc())
    .limit(20)
    .all();

    return Response.json({
      data: recipes,
      meta: {
        count: recipes.length,
        limit: 20,
      }
    });
  } catch (error) {
    console.error("Failed to load recipes:", error);

    return Response.json(
      {
      error: {
          code: "RECIPES_FETCH_FAILED",
          message: "Unable to load recipes",
        },
      },
      { status: 500 }
    );
  }
}