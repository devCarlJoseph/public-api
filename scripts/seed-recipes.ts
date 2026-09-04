import { db } from "../prisma/db";
import { getOrCreateCategory } from "../services/seed/category";
import { getOrCreateCuisine } from "../services/seed/cuisine";
import { getOrCreateRecipeDataSource } from "../services/seed/data-source";
import { getOrCreateDiet } from "../services/seed/diet";
import { getOrCreateIngredient } from "../services/seed/ingredient";
import { seedRecipe } from "../services/seed/recipe";
import { recipes } from "./seed-data/recipes";

async function main() {
  const dataSource = await getOrCreateRecipeDataSource();
  const cuisine = await getOrCreateCuisine();
  const dairyFreeDiet = await getOrCreateDiet();

  const ingredientMap = new Map<string, { id: number }>();

  for (const recipeData of recipes) {
    for (const ingredientData of recipeData.ingredients) {
      if (ingredientMap.has(ingredientData.slug)) {
        continue;
      }

      const ingredient = await getOrCreateIngredient(ingredientData);

      if (!ingredient) {
        throw new Error(
          `Failed to create ingredient: ${ingredientData.slug}`,
        );
      }

      ingredientMap.set(ingredientData.slug, {
        id: ingredient.id,
      });
    }
  }

  const oldAdobo = await db.orm.public.Recipe.where({
    slug: "chicken-abodo",
  }).first();

  const correctAdobo = await db.orm.public.Recipe.where({
    slug: "chicken-adobo",
  }).first();

  if (oldAdobo && !correctAdobo) {
    await db.orm.public.Recipe.where({
      id: oldAdobo.id,
    }).update({
      slug: "chicken-adobo",
    });

    console.log("Corrected recipe slug: chicken-abodo → chicken-adobo");
  }

  for (const recipeData of recipes) {
    const category = await getOrCreateCategory(
      recipeData.categorySlug,
      recipeData.categoryName,
    );

    const recipe = await seedRecipe(recipeData, {
      cuisineId: cuisine.id,
      dataSourceId: dataSource.id,
      dietId: dairyFreeDiet.id,
      categoryId: category.id,
      ingredients: ingredientMap,
    });

    console.log(`Seeded: ${recipe.title}`);
  }

  console.log(
    `Finished. ${recipes.length} recipes are available.`,
  );
}

main().catch((error) => {
  console.error("Recipe seed failed:", error);
  process.exitCode = 1;
});