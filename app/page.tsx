"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch(
          "https://catalogra.vercel.app/api/v1/recipes",
        );

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const result = await response.json();

        console.log("Recipes API response:", result);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    }

    fetchRecipes();
  }, []);

  return null;
}