import { db } from "@/prisma/db";
import { getClientIp, publicApiRateLimit } from "@/lib/rate-limits";
import { z } from "zod";

const slugSchema = z.object({
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: Request, { params }: RouteContext) {
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

    const { slug } = await params;
    const parsed = slugSchema.safeParse({ slug });

    if (!parsed.success) {
      return Response.json(
        {
          error: {
            code: "INVALID_SLUG",
            message: "The phone slug is invalid.",
            details: parsed.error.issues,
          },
        },
        { status: 400, headers: rateLimitHeaders },
      );
    }

    const phone = await db.orm.public.Product.where({
      slug: parsed.data.slug,
      type: "PHONE",
      isPublished: true,
    })
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
        variant
          .select("id", "name", "color", "ramGb", "storageGb", "sku")
          .include("prices", (price) =>
            price
              .select(
                "amount",
                "currency",
                "availability",
                "productUrl",
                "checkedAt",
              )
              .orderBy((price) => price.checkedAt.desc()),
          ),
      )
      .first();

    if (!phone) {
      return Response.json(
        {
          error: {
            code: "PHONE_NOT_FOUND",
            message: "Phone not found.",
          },
        },
        { status: 404, headers: rateLimitHeaders },
      );
    }

    return Response.json(
      { data: phone },
      { headers: rateLimitHeaders },
    );
  } catch (error) {
    console.error("Failed to load phone:", error);

    return Response.json(
      {
        error: {
          code: "PHONE_FETCH_FAILED",
          message: "Unable to load phone.",
        },
      },
      { status: 500 },
    );
  }
}
