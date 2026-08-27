import { db } from "@/prisma/db";

type RouteContext = {
  params: Promise<{slug: string}>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
) {

  const { slug } = await params;

  const recipe = await db.orm.public.Recipe
    .where({
      slug,
      isPublished: true,
    })
    .first();

  if (!recipe) {
    return Response.json(
      {
        error: {
          code: "RECIPE_NOT_FOUND",
          message: "Recipe not found",
        },
      },
      { status: 404 }
    );
  }

  const steps = await db.orm.public.RecipeStep
    .where({ recipeId: recipe.id })
    .orderBy((step) => step.stepNumber.asc())
    .all();

  const recipeIngredients = await db.orm.public.RecipeIngredient
    .where({ recipeId: recipe.id})
    .orderBy((item) => item.sortOrder.asc())
    .all();

  const ingredients = await Promise.all(
    recipeIngredients.map((item) => 
      db.orm.public.Ingredient.first({
        id: item.ingredientId,
      })
    )
  );

  const categories = await db.orm.public.RecipeCategory
    .where({ recipeId: recipe.id })
    .all();

  const categoryDetails = await Promise.all(
    categories.map((item) => 
      db.orm.public.Category.first({
        id: item.categoryId,
      })
    )
  );

  const diets = await db.orm.public.RecipeDiet
    .where({ recipeId: recipe.id })
    .all();

  const dietDetails = await Promise.all(
    diets.map((item) =>
      db.orm.public.Diet.first({
        id: item.dietId,
      })
    )
  );

  const nutrition = await db.orm.public.RecipeNutrition
    .where({ recipeId: recipe.id })
    .first();

  const cuisine = recipe.cuisineId
    ? await db.orm.public.Cuisine.first({ id: recipe.cuisineId })
    : null;
  
  return Response.json({
    data: {
      ...recipe,
      cuisine,
      steps,
      ingredients: recipeIngredients.map((item, index) => ({
        amount: item.amount,
        unit: item.unit,
        note: item.note,
        sortOrder: item.sortOrder,
        ingredient: ingredients[index],
      })),
      categories: categoryDetails,
      diets: dietDetails,
      nutrition,
    },
  });
}