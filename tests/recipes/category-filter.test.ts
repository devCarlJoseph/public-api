import { describe, expect, it } from "vitest";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

describe("recipe category filter", () => {
  it(
    "returns recipes from the requested category",
    async () => {
      const response = await fetch(
        `${API_URL}/api/v1/recipes?category=soups`,
      );

      expect(response.status).toBe(200);

      const body = await response.json();
      const slugs = body.data.map(
        (recipe: { slug: string }) => recipe.slug,
      );

      expect(slugs).toContain("sinigang-na-baboy");
      expect(slugs).toContain("chicken-tinola");
      expect(slugs).not.toContain("chicken-adobo");
    },
    15_000,
  );
});