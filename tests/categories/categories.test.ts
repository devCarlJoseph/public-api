import { describe, expect, it } from "vitest";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

describe("categories endpoint", () => {
  it(
    "returns recipe categories",
    async () => {
      const response = await fetch(`${API_URL}/api/v1/categories`);

      expect(response.status).toBe(200);

      const body = await response.json();

      expect(body.data).toBeInstanceOf(Array);
      expect(body.data.length).toBeGreaterThan(0);

      expect(body.data[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          slug: expect.any(String),
          name: expect.any(String),
        }),
      );
    },
    15_000,
  );
});