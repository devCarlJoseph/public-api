import { describe, expect, it } from "vitest";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

describe("recipes list endpoint", () => {
  it("returns paginated recipes", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/recipes?page=1&limit=5`,
    );

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.data).toBeInstanceOf(Array);
    expect(body.data.length).toBeLessThanOrEqual(5);
    expect(body.meta).toEqual(
      expect.objectContaining({
        page: 1,
        limit: 5,
      }),
    );
  }, 15_000);

  it("supports searching recipes", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/recipes?search=chicken`,
    );

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.data).toBeInstanceOf(Array);

    for (const recipe of body.data) {
      expect(recipe.title.toLowerCase()).toContain("chicken");
    }
  }, 15_000);

  it("rejects an invalid limit", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/recipes?limit=101`,
    );

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body.error.code).toBe("VALIDATION_ERROR");
  }, 15_000);
});
