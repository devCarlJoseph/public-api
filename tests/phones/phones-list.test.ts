import { describe, expect, it } from "vitest";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

describe("phones list endpoint", () => {
  it("returns paginated phones", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/phones?page=1&limit=5`,
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

  it("supports searching phones", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/phones?search=redmi`,
    );

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.data).toBeInstanceOf(Array);

    for (const phone of body.data) {
      expect(phone.name.toLowerCase()).toContain("redmi");
    }
  }, 15_000);

  it("reject an invalid limit", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/phones?limit=101`,
    );

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body.error.code).toBe("VALIDATION_ERROR");
  }, 15_000)
});