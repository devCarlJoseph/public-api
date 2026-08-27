import { describe, expect, it } from "vitest";
import { recipeSlugSchema } from "../../validators/recipe";

describe("recipe slug validation", () => {
  it("accepts a valid recipe slug", () => {
    const result = recipeSlugSchema.parse({
      slug: "chicken-adobo",
    });

    expect(result.slug).toBe("chicken-adobo");
  });

  it("trims whitespace", () => {
    const result = recipeSlugSchema.parse({
      slug: "chicken-adobo",
    });

    expect(result.slug).toBe("chicken-adobo");
  });

  it("rejects uppercase characters", () => {
    expect(() =>
      recipeSlugSchema.parse({
        slug: "Chicken-Adobo",
      }),
    ).toThrow();
  });

  it("rejects spaces inside the slug", () => {
    expect(() => 
      recipeSlugSchema.parse({
        slug: "chicken adobo",
      })
    ).toThrow();
  });

  it("rejects special characters", () => {
    expect(() =>
      recipeSlugSchema.parse({
        slug: "chicken@adobo",
      })
    ).toThrow();
  })

  it("rejects an empty slug", () => {
    expect(() => 
      recipeSlugSchema.parse({
        slug: ""
      })
    ).toThrow();
  });
});
