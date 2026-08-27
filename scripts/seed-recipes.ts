import { db } from "../prisma/db";

async function main() {
  const dataSource =
    (await db.orm.public.DataSource.where({
      name: "Original Recipe Seed Data",
    }).first()) ??
    (await db.orm.public.DataSource.create({
      name: "Original Recipe Seed Data",
      license: "Original content",
      attributionText: "Created for My Public API",
    }));

  const cuisine =
    (await db.orm.public.Cuisine.where({ slug: "filipino" }).first()) ??
    (await db.orm.public.Cuisine.create({
      slug: "filipino",
      name: "Filipino",
    }));

  const category =
    (await db.orm.public.Category.where({ slug: "main-dishes" }).first()) ??
    (await db.orm.public.Category.create({
      slug: "main-dishes",
      name: "Main Dishes",
    }));

  const diet =
    (await db.orm.public.Diet.where({ slug: "dairy-free" }).first()) ??
    (await db.orm.public.Diet.create({
      slug: "dairy-free",
      name: "Dairy Free",
    }));

  const ingredientData = [
    { slug: "chicken-thighs", name: "Chicken Thighs" },
    { slug: "soy-sauce", name: "Soy Sauce" },
    { slug: "white-vinegar", name: "White Vinegar" },
    { slug: "garlic", name: "Garlic" },
    { slug: "bay-leaves", name: "Bay Leaves" },
    { slug: "black-peppercorns", name: "Black Peppercorns" },
    { slug: "brown-sugar", name: "Brown Sugar" },
    { slug: "cooking-oil", name: "Cooking Oil" },
    { slug: "water", name: "Water" },
  ];

  const ingredients = new Map();

  for (const item of ingredientData) {
    const ingredient =
      (await db.orm.public.Ingredient.where({ slug: item.slug }).first()) ??
      (await db.orm.public.Ingredient.create(item));

    ingredients.set(item.slug, ingredient);
  }

  const imageUrl = "https://your-domain.vercel.app/images/recipes/chicken-adobo.jpg";

  const oldRecipe = await db.orm.public.Recipe.where({
    slug: "chicken-abodo",
  }).first();

  if (oldRecipe) {
    await db.orm.public.Recipe.where({ id: oldRecipe.id }).update({
      slug: "chicken-adobo",
      imageUrl,
    });

    console.log("Recipe slug corrected.");
    return;
  }

  const existingRecipe = await db.orm.public.Recipe.where({
    slug: "chicken-adobo",
  }).first();

  if (existingRecipe) {
    await db.orm.public.Recipe.where({ id: existingRecipe.id }).update({
      imageUrl: "https://your-domain.vercel.app/images/recipes/chicken-adobo.jpg",
    });

    console.log("Recipe image updated.");
    return;
  }

  const recipe = await db.orm.public.Recipe.create({
    slug: "chicken-abodo",
    title: "Classic Filipino Chicken Abodo",
    description:
      "Tender chicken thighs simmered in soy sauce, vinegar, garlic, bay leaves, and black pepper until rich, savory, and flavorful.",
    imageUrl: "https://your-domain.vercel.app/images/recipes/chicken-adobo.jpg",
    prepMinutes: 20,
    cookMinutes: 45,
    servings: 4,
    cuisineId: cuisine.id,
    dataSourceId: dataSource.id,
    isPublished: true,
  });

  const steps = [
    "Pat the chicken thighs dry and remove any excess skin or fat.",
    "Place the chicken in a bowl and add the soy sauce, half of the garlic, and black peppercorns. Marinate for at least 20 minutes.",
    "Heat the cooking oil in a large pot over medium heat.",
    "Remove the chicken from the marinade and brown both sides for approximately 3 minutes per side.",
    "Add the remaining marinade, white vinegar, water, remaining garlic, bay leaves, and brown sugar.",
    "Bring the liquid to a gentle boil. Do not stir during the first few minutes after adding the vinegar.",
    "Reduce the heat, cover the pot, and simmer for 30 minutes until the chicken is tender.",
    "Remove the lid and simmer for another 10 minutes until the sauce becomes slightly thick.",
    "Taste the sauce, adjust the seasoning if necessary, and serve with steamed rice.",
  ];

  for (let index = 0; index < steps.length; index++) {
    await db.orm.public.RecipeStep.create({
      recipeId: recipe.id,
      stepNumber: index + 1,
      instruction: steps[index],
    });
  }

  const recipeIngredients = [
    {
      slug: "chicken-thighs",
      amount: 1,
      unit: "kilogram",
      note: "Bone-in or boneless",
    },
    {
      slug: "soy-sauce",
      amount: 0.5,
      unit: "cup",
      note: "Use regular or low-sodium soy sauce",
    },
    {
      slug: "white-vinegar",
      amount: 0.5,
      unit: "cup",
      note: "Do not stir immediately after adding",
    },
    {
      slug: "garlic",
      amount: 8,
      unit: "cloves",
      note: "Lightly crushed",
    },
    {
      slug: "bay-leaves",
      amount: 3,
      unit: "leaves",
      note: "Remove before serving",
    },
    {
      slug: "black-peppercorns",
      amount: 1,
      unit: "teaspoon",
      note: "Whole peppercorns",
    },
    {
      slug: "brown-sugar",
      amount: 1,
      unit: "tablespoon",
      note: "Balances the vinegar",
    },
    {
      slug: "cooking-oil",
      amount: 1,
      unit: "tablespoon",
      note: "For browning the chicken",
    },
    {
      slug: "water",
      amount: 1,
      unit: "cup",
      note: "Add more if the sauce reduces too quickly",
    },
  ];

  for (let index = 0; index < recipeIngredients.length; index++) {
    const item = recipeIngredients[index];
    const ingredient = ingredients.get(item.slug);

    await db.orm.public.RecipeIngredient.create({
      recipeId: recipe.id,
      ingredientId: ingredient.id,
      amount: item.amount,
      unit: item.unit,
      note: item.note,
      sortOrder: index + 1,
    });
  }

  await db.orm.public.RecipeCategory.create({
    recipeId: recipe.id,
    categoryId: category.id,
  });

  await db.orm.public.RecipeDiet.create({
    recipeId: recipe.id,
    dietId: diet.id,
  });

  await db.orm.public.RecipeNutrition.create({
    recipeId: recipe.id,
    calories: 520,
    proteinG: 38,
    carbsG: 12,
    fatG: 34,
    fiberG: 1,
  });

  console.log("Detailed recipe created: ", recipe.title);
}

main().catch((error) => {
  console.error("seed failed:", error);
  process.exitCode = 1;
});
