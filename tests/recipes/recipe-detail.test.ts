import { describe, expect, it } from "vitest";

const API_URL = "http://localhost:3000";

describe("recipe detail endpoint", () => {
  it("returns a recipe by slug", async () => {
    const response = await fetch(`${API_URL}/api/v1/recipes/chicken-adobo`);

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.data.slug).toBe("chicken-adobo");
  }, 15000);

  it("returns 404 for a missing recipe", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/recipes/recipe-does-not-exist`,
    );

    expect(response.status).toBe(404);

    const body = await response.json();

    expect(body.error.code).toBe("RECIPE_NOT_FOUND");
  }, 15000);

  it("returns 400 for an invalid slug", async () => {
    const invalidSlug = encodeURIComponent("Invalid Recipe!");

    const response = await fetch(`${API_URL}/api/v1/recipes/${invalidSlug}`);

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body.error.code).toBe("INVALID_SLUG");
  }, 15000);
});
