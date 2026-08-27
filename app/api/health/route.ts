import { db } from "@/prisma/db";

export async function GET() {
  try {
    await db.orm.public.Recipe.first();

    return Response.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    console.error("Health check failed: ", error);

    return Response.json(
      {
        status: "error",
        database: "disconnected",
      },
      { status: 503 },
    );
  }
}
