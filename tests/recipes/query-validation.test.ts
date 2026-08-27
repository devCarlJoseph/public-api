import { describe, expect, it } from "vitest";
import { recipeListQuerySchema } from "../../validators/recipe";

describe("recipe list query validation", () => {
  it("uses default values", () => {
    const result = recipeListQuerySchema.parse({});

    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
  });

  it("converts page and limit to numbers", () => {
    const result = recipeListQuerySchema.parse({
      page: "2",
      limit: "10",
    });

    expect(result.page).toBe(2);
    expect(result.limit).toBe(10);
  });

  it("trims the search value", () => {
    const result = recipeListQuerySchema.parse({
      search: " chicken ",
    });

    expect(result.search).toBe("chicken");
  });

  it("rejects a limit above 100", () => {
    expect(() =>
      recipeListQuerySchema.parse({ limit: "101" })
    ).toThrow();
  });

  it("rejects a page below 1", () => {
    expect(() =>
      recipeListQuerySchema.parse({ page: "0" })
    ).toThrow();
  });

  it("rejects an empty search", () => {
    expect(() =>
      recipeListQuerySchema.parse({ search: "" })
    ).toThrow();
  });
});