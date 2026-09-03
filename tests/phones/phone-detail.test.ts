import { describe, expect, it } from "vitest";

const API_URL = process.env.API_URL ?? "http://localhost:3000";

describe("phone detail endpoint", () => {
  it("returns a phone by slug", async () => {
    const response = await fetch(`${API_URL}/api/v1/phones/iphone-17`);

    expect(response.status).toBe(200);

    const body = await response.json();

    expect(body.data).toEqual(
      expect.objectContaining({
        slug: "iphone-17",
        name: expect.any(String),
      }),
    );

    expect(body.data.phoneSpec).toBeDefined();
    expect(body.data.variants).toBeInstanceOf(Array);
  }, 15_000);

  it("returns 404 for a missing phone", async() => {
    const response = await fetch(
      `${API_URL}/api/v1/phones/phone-does-not-exist`,
    );

    expect(response.status).toBe(404);

    const body = await response.json();

    expect(body.error.code).toBe("PHONE_NOT_FOUND");
  }, 15_000);

  it("returns 400 for an invalid slug", async () => {
    const response = await fetch(
      `${API_URL}/api/v1/phones/${encodeURIComponent("Invalide Phone!")}`,
    );

    expect(response.status).toBe(400);

    const body = await response.json();

    expect(body.error.code).toBe("INVALID_SLUG");
  }, 15_000);
});
