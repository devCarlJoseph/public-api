import { db } from "@/prisma/db";
import { getClientIp, publicApiRateLimit } from "@/lib/rate-limits";

export async function GET(request: Request) {
  try {
    const clientIP = getClientIp(request);
    const rateLimit = await publicApiRateLimit.limit(`ip:${clientIP}`);

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

    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "20");
    const search = url.searchParams.get("search")?.trim();

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
      return Response.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "Page must be at least 1 and limit must be between 1 and 100.",
          },
        },
        { status: 400 }
      );
    }

    const offset = (page - 1) * limit;

    let query = db.orm.public.Product.where({
      type: "PHONE",
      isPublished: true,
    });

    if (search) {
      query = query.where((product) =>
        product.name.ilike(`%${search}%`),
      );
    }

    const rows = await query
      .select(
        "id",
        "slug",
        "name",
        "model",
        "description",
        "imageUrl",
        "releaseDate",
      )
      .include("brand", (brand) =>
        brand.select("slug", "name", "websiteUrl"),
      )
      .include("phoneSpec")
      .include("variants", (variant) =>
        variant.select("id", "name", "color", "ramGb", "storageGb", "sku")
        .include("prices", (price) =>
          price
              .select(
                "amount",
                "currency",
                "availability",
                "productUrl",
              )
              .orderBy((price) => price.checkedAt.desc())
              .limit(1),
        ),
      )
      .orderBy((product) => product.createdAt.desc())
      .limit(limit + 1)
      .offset(offset)
      .all();

      const hasNextPage = rows.length > limit;

      return Response.json(
        {
          data: rows.slice(0, limit),
          meta: {
            page,
            limit,
            nextPage: hasNextPage ? page + 1 : null,
          },
        },
        { headers: rateLimitHeaders },
      );
  } catch (error) {
    console.error("Failed to load phones:", error);

    return Response.json(
      {
        error: {
          code: "PHONES_FETCH_FAILED",
          message: "Unable to load phones",
        },
      },
      { status: 500 },
    );
  }
}