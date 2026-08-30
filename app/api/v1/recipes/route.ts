import { db } from "@/prisma/db";
import { recipeListQuerySchema } from "@/validators/recipe";
import { getClientIp, publicApiRateLimit } from "@/lib/rate-limits";

export async function GET(request: Request) {
  try {
    const clientIp = getClientIp(request);

    const rateLimit = await publicApiRateLimit.limit(`ip:${clientIp}`);

    const rateLimitHeaders = {
      "X-RateLimit-Limit": String(rateLimit.limit),
      "X-RateLimit-Remaining": String(rateLimit.remaining),
      "X-RateLimit-Reset": String(Math.ceil(rateLimit.reset / 1000)),
    };

    if (!rateLimit.success) {
      return Response.json(
        {
          error: {
            code: "RATE_LIMIT_EXCEEDED",  
            message: "Too many requests. Please try again later.",
          },
        },
        {
          status: 429,
          headers: {
            ...rateLimitHeaders,
            "Retry-After": String(
              Math.max(1, Math.ceil((rateLimit.reset - Date.now()) / 1000)),
            ),
          },
        },
      );
    }

    const url = new URL(request.url);

    const parsed = recipeListQuerySchema.safeParse(
      Object.fromEntries(url.searchParams.entries()),
    );

    if (!parsed.success) {
      return Response.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid recipe query parameters",
            details: parsed.error.issues,
          },
        },
        { status: 400 },
      );
    }

    const { page, limit, search, category } = parsed.data;
    const offset = (page - 1) * limit;

    function recipeQuery() {
      let query = db.orm.public.Recipe.where({
        isPublished: true,
      });

      if (search) {
        query = query.where((recipe) => recipe.title.ilike(`%${search}%`));
      }

      if (category) {
        query = query.where((recipe) =>
          recipe.categories.some((item) =>
            item.category.some((categoryRecord) =>
              categoryRecord.slug.eq(category),
            ),
          ),
        );
      }

      return query;
    }

    const rows = await recipeQuery()
      .select(
        "id",
        "slug",
        "title",
        "description",
        "imageUrl",
        "prepMinutes",
        "cookMinutes",
        "servings",
      )
      .orderBy((recipe) => recipe.createdAt.desc())
      .limit(limit + 1)
      .offset(offset)
      .all();

    const hasNextPage = rows.length > limit;
    const recipes = rows.slice(0, limit);

    return Response.json(
      {
        data: recipes,
        meta: {
          page,
          limit,
          nextPage: hasNextPage ? page + 1 : null,
        },
      },
      {
        headers: rateLimitHeaders,
      },
    );
  } catch (error) {
    console.error("Failed to load recipes:", error);

    return Response.json(
      {
        error: {
          code: "RECIPES_FETCH_FAILED",
          message: "Unable to load recipes",
        },
      },
      { status: 500 },
    );
  }
}
