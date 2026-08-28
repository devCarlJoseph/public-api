import { number } from "zod";
import { db } from "../prisma/db";

const IMAGE_BASE_URL = "https://your-domain.vercel.app/images/recipes";

type SeedIngredient = {
  slug: string;
  name: string;
  amount: number | null;
  unit: string | null;
  note?: string;
};

type SeedRecipe = {
  slug: string;
  title: string;
  description: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  categorySlug: string;
  categoryName: string;
  steps: string[];
  ingredients: SeedIngredient[];
  nutrition: {
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    fiberG: number;
  };
};

const recipes: SeedRecipe[] = [
  {
    slug: "chicken-adobo",
    title: "Classic Filipino Chicken Adobo",
    description:
      "Tender chicken simmered in soy sauce, vinegar, garlic, bay leaves, and black pepper until rich, savory, and flavorful.",
    prepMinutes: 20,
    cookMinutes: 45,
    servings: 4,
    categorySlug: "main-dishes",
    categoryName: "Main Dishes",
    steps: [
      "Pat the chicken dry and place it in a large bowl.",
      "Add soy sauce, garlic, and black pepper. Marinate for at least 20 minutes.",
      "Brown the chicken in cooking oil over medium heat.",
      "Add the vinegar, water, bay leaves, and brown sugar.",
      "Simmer covered for 30 minutes, then uncover and reduce the sauce before serving with rice.",
    ],
    ingredients: [
      {
        slug: "chicken-thighs",
        name: "Chicken Thighs",
        amount: 1,
        unit: "kilogram",
        note: "Bone-in or boneless",
      },
      {
        slug: "soy-sauce",
        name: "Soy Sauce",
        amount: 0.5,
        unit: "cup",
      },
      {
        slug: "white-vinegar",
        name: "White Vinegar",
        amount: 0.5,
        unit: "cup",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 8,
        unit: "cloves",
        note: "Lightly crushed",
      },
      {
        slug: "bay-leaves",
        name: "Bay Leaves",
        amount: 3,
        unit: "leaves",
      },
      {
        slug: "black-peppercorns",
        name: "Black Peppercorns",
        amount: 1,
        unit: "teaspoon",
      },
      {
        slug: "brown-sugar",
        name: "Brown Sugar",
        amount: 1,
        unit: "tablespoon",
      },
      {
        slug: "cooking-oil",
        name: "Cooking Oil",
        amount: 1,
        unit: "tablespoon",
      },
      {
        slug: "water",
        name: "Water",
        amount: 1,
        unit: "cup",
      },
    ],
    nutrition: {
      calories: 520,
      proteinG: 38,
      carbsG: 12,
      fatG: 34,
      fiberG: 1,
    },
  },

  {
    slug: "sinigang-na-baboy",
    title: "Sinigang na Baboy",
    description:
      "A comforting Filipino sour soup made with pork, tamarind, tomatoes, radish, green beans, and leafy vegetables.",
    prepMinutes: 20,
    cookMinutes: 75,
    servings: 6,
    categorySlug: "soups",
    categoryName: "Soups",
    steps: [
      "Place the pork, onion, tomatoes, and water in a large pot.",
      "Bring the mixture to a boil and remove any foam from the surface.",
      "Lower the heat and simmer until the pork becomes tender.",
      "Add the tamarind soup base, radish, eggplant, and green beans.",
      "Add the water spinach and season with fish sauce before serving hot.",
    ],
    ingredients: [
      {
        slug: "pork-belly",
        name: "Pork Belly",
        amount: 1,
        unit: "kilogram",
        note: "Cut into serving pieces",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "large",
        note: "Quartered",
      },
      {
        slug: "tomatoes",
        name: "Tomatoes",
        amount: 2,
        unit: "pieces",
        note: "Quartered",
      },
      {
        slug: "tamarind-soup-base",
        name: "Tamarind Soup Base",
        amount: 1,
        unit: "packet",
      },
      {
        slug: "radish",
        name: "White Radish",
        amount: 1,
        unit: "medium",
        note: "Sliced",
      },
      {
        slug: "eggplant",
        name: "Eggplant",
        amount: 1,
        unit: "piece",
        note: "Sliced",
      },
      {
        slug: "green-beans",
        name: "Green Beans",
        amount: 150,
        unit: "grams",
      },
      {
        slug: "water-spinach",
        name: "Water Spinach",
        amount: 2,
        unit: "cups",
      },
      {
        slug: "fish-sauce",
        name: "Fish Sauce",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "water",
        name: "Water",
        amount: 8,
        unit: "cups",
      },
    ],
    nutrition: {
      calories: 410,
      proteinG: 31,
      carbsG: 18,
      fatG: 24,
      fiberG: 5,
    },
  },

  {
    slug: "chicken-tinola",
    title: "Chicken Tinola",
    description:
      "A light Filipino ginger chicken soup with green papaya, chili leaves, garlic, and fish sauce.",
    prepMinutes: 15,
    cookMinutes: 45,
    servings: 4,
    categorySlug: "soups",
    categoryName: "Soups",
    steps: [
      "Heat oil in a pot and sauté garlic, onion, and ginger.",
      "Add the chicken pieces and cook until lightly browned.",
      "Pour in the water and bring the soup to a boil.",
      "Simmer until the chicken is tender.",
      "Add green papaya and chili leaves, then season with fish sauce.",
    ],
    ingredients: [
      {
        slug: "whole-chicken",
        name: "Whole Chicken",
        amount: 1,
        unit: "kilogram",
        note: "Cut into pieces",
      },
      {
        slug: "ginger",
        name: "Fresh Ginger",
        amount: 50,
        unit: "grams",
        note: "Sliced",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "piece",
        note: "Sliced",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
      },
      {
        slug: "green-papaya",
        name: "Green Papaya",
        amount: 2,
        unit: "cups",
        note: "Peeled and sliced",
      },
      {
        slug: "chili-leaves",
        name: "Chili Leaves",
        amount: 2,
        unit: "cups",
      },
      {
        slug: "fish-sauce",
        name: "Fish Sauce",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "cooking-oil",
        name: "Cooking Oil",
        amount: 1,
        unit: "tablespoon",
      },
      {
        slug: "water",
        name: "Water",
        amount: 7,
        unit: "cups",
      },
    ],
    nutrition: {
      calories: 330,
      proteinG: 35,
      carbsG: 14,
      fatG: 15,
      fiberG: 3,
    },
  },

  {
    slug: "pancit-canton",
    title: "Pancit Canton",
    description:
      "Stir-fried Filipino noodles with chicken, shrimp, cabbage, carrots, green beans, and savory soy seasoning.",
    prepMinutes: 25,
    cookMinutes: 25,
    servings: 5,
    categorySlug: "noodles",
    categoryName: "Noodles",
    steps: [
      "Soak or prepare the noodles according to the package instructions.",
      "Sauté garlic and onion in a large wok.",
      "Cook the chicken and shrimp until fully done.",
      "Add the vegetables and stir-fry until slightly tender.",
      "Add the noodles, soy sauce, oyster sauce, and broth. Toss until combined.",
    ],
    ingredients: [
      {
        slug: "flour-noodles",
        name: "Flour Noodles",
        amount: 500,
        unit: "grams",
      },
      {
        slug: "chicken-breast",
        name: "Chicken Breast",
        amount: 300,
        unit: "grams",
        note: "Thinly sliced",
      },
      {
        slug: "shrimp",
        name: "Shrimp",
        amount: 250,
        unit: "grams",
        note: "Peeled",
      },
      {
        slug: "cabbage",
        name: "Cabbage",
        amount: 2,
        unit: "cups",
        note: "Shredded",
      },
      {
        slug: "carrots",
        name: "Carrots",
        amount: 1,
        unit: "large",
        note: "Julienned",
      },
      {
        slug: "green-beans",
        name: "Green Beans",
        amount: 1,
        unit: "cup",
        note: "Sliced",
      },
      {
        slug: "soy-sauce",
        name: "Soy Sauce",
        amount: 3,
        unit: "tablespoons",
      },
      {
        slug: "oyster-sauce",
        name: "Oyster Sauce",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "chicken-broth",
        name: "Chicken Broth",
        amount: 1,
        unit: "cup",
      },
      {
        slug: "cooking-oil",
        name: "Cooking Oil",
        amount: 2,
        unit: "tablespoons",
      },
    ],
    nutrition: {
      calories: 480,
      proteinG: 27,
      carbsG: 68,
      fatG: 12,
      fiberG: 6,
    },
  },

  {
    slug: "kare-kare",
    title: "Kare-Kare",
    description:
      "A rich Filipino peanut stew made with beef, vegetables, peanut butter, and a savory shrimp paste accompaniment.",
    prepMinutes: 30,
    cookMinutes: 120,
    servings: 6,
    categorySlug: "main-dishes",
    categoryName: "Main Dishes",
    steps: [
      "Boil the beef until tender, reserving the cooking broth.",
      "Sauté garlic and onion, then add annatto oil.",
      "Add peanut butter, ground peanuts, and beef broth.",
      "Add the tender beef and simmer until the sauce thickens.",
      "Blanch the vegetables separately and serve the stew with shrimp paste.",
    ],
    ingredients: [
      {
        slug: "beef-shank",
        name: "Beef Shank",
        amount: 1,
        unit: "kilogram",
        note: "Cut into pieces",
      },
      {
        slug: "peanut-butter",
        name: "Peanut Butter",
        amount: 1,
        unit: "cup",
      },
      {
        slug: "ground-peanuts",
        name: "Ground Peanuts",
        amount: 0.5,
        unit: "cup",
      },
      {
        slug: "annatto-seeds",
        name: "Annatto Seeds",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "eggplant",
        name: "Eggplant",
        amount: 2,
        unit: "pieces",
        note: "Sliced",
      },
      {
        slug: "bok-choy",
        name: "Bok Choy",
        amount: 2,
        unit: "cups",
      },
      {
        slug: "string-beans",
        name: "String Beans",
        amount: 2,
        unit: "cups",
      },
      {
        slug: "shrimp-paste",
        name: "Shrimp Paste",
        amount: 0.5,
        unit: "cup",
        note: "Serve on the side",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 5,
        unit: "cloves",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "piece",
      },
    ],
    nutrition: {
      calories: 590,
      proteinG: 39,
      carbsG: 24,
      fatG: 39,
      fiberG: 7,
    },
  },

  {
    slug: "beef-caldereta",
    title: "Beef Caldereta",
    description:
      "A hearty Filipino beef stew cooked with tomato sauce, liver spread, potatoes, carrots, and bell peppers.",
    prepMinutes: 25,
    cookMinutes: 105,
    servings: 6,
    categorySlug: "main-dishes",
    categoryName: "Main Dishes",
    steps: [
      "Season the beef and brown it in a heavy pot.",
      "Sauté garlic, onion, and tomato paste.",
      "Return the beef to the pot and add tomato sauce and broth.",
      "Simmer until the beef is tender.",
      "Add liver spread, potatoes, carrots, and peppers. Cook until the vegetables are tender.",
    ],
    ingredients: [
      {
        slug: "beef-chuck",
        name: "Beef Chuck",
        amount: 1,
        unit: "kilogram",
        note: "Cubed",
      },
      {
        slug: "tomato-sauce",
        name: "Tomato Sauce",
        amount: 2,
        unit: "cups",
      },
      {
        slug: "liver-spread",
        name: "Liver Spread",
        amount: 0.5,
        unit: "cup",
      },
      {
        slug: "potatoes",
        name: "Potatoes",
        amount: 3,
        unit: "pieces",
        note: "Cubed",
      },
      {
        slug: "carrots",
        name: "Carrots",
        amount: 2,
        unit: "pieces",
        note: "Sliced",
      },
      {
        slug: "bell-peppers",
        name: "Bell Peppers",
        amount: 2,
        unit: "pieces",
        note: "Sliced",
      },
      {
        slug: "tomato-paste",
        name: "Tomato Paste",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "beef-broth",
        name: "Beef Broth",
        amount: 3,
        unit: "cups",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 5,
        unit: "cloves",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "piece",
      },
    ],
    nutrition: {
      calories: 620,
      proteinG: 43,
      carbsG: 31,
      fatG: 38,
      fiberG: 6,
    },
  },

  {
    slug: "pork-menudo",
    title: "Pork Menudo",
    description:
      "A classic Filipino pork and liver stew with potatoes, carrots, bell peppers, tomato sauce, and raisins.",
    prepMinutes: 25,
    cookMinutes: 70,
    servings: 6,
    categorySlug: "main-dishes",
    categoryName: "Main Dishes",
    steps: [
      "Marinate the pork in soy sauce and calamansi juice.",
      "Brown the pork in a large pot.",
      "Sauté garlic and onion, then add tomato sauce.",
      "Return the pork and simmer until tender.",
      "Add liver, potatoes, carrots, peppers, and raisins. Cook until done.",
    ],
    ingredients: [
      {
        slug: "pork-shoulder",
        name: "Pork Shoulder",
        amount: 750,
        unit: "grams",
        note: "Cubed",
      },
      {
        slug: "pork-liver",
        name: "Pork Liver",
        amount: 250,
        unit: "grams",
        note: "Cubed",
      },
      {
        slug: "tomato-sauce",
        name: "Tomato Sauce",
        amount: 2,
        unit: "cups",
      },
      {
        slug: "potatoes",
        name: "Potatoes",
        amount: 2,
        unit: "pieces",
        note: "Cubed",
      },
      {
        slug: "carrots",
        name: "Carrots",
        amount: 2,
        unit: "pieces",
        note: "Cubed",
      },
      {
        slug: "bell-peppers",
        name: "Bell Peppers",
        amount: 1,
        unit: "piece",
      },
      {
        slug: "raisins",
        name: "Raisins",
        amount: 0.25,
        unit: "cup",
      },
      {
        slug: "soy-sauce",
        name: "Soy Sauce",
        amount: 3,
        unit: "tablespoons",
      },
      {
        slug: "calamansi-juice",
        name: "Calamansi Juice",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 5,
        unit: "cloves",
      },
    ],
    nutrition: {
      calories: 540,
      proteinG: 35,
      carbsG: 34,
      fatG: 28,
      fiberG: 5,
    },
  },

  {
    slug: "lumpiang-shanghai",
    title: "Lumpiang Shanghai",
    description:
      "Crispy Filipino spring rolls filled with seasoned ground pork, carrots, onions, and garlic.",
    prepMinutes: 35,
    cookMinutes: 25,
    servings: 6,
    categorySlug: "appetizers",
    categoryName: "Appetizers",
    steps: [
      "Combine ground pork, carrots, onion, garlic, egg, and seasonings.",
      "Place a small amount of filling on each spring roll wrapper.",
      "Roll tightly and seal the edge with water.",
      "Heat oil and fry the rolls until golden brown.",
      "Drain on a rack or paper towel and serve with sweet chili sauce.",
    ],
    ingredients: [
      {
        slug: "ground-pork",
        name: "Ground Pork",
        amount: 500,
        unit: "grams",
      },
      {
        slug: "spring-roll-wrappers",
        name: "Spring Roll Wrappers",
        amount: 30,
        unit: "pieces",
      },
      {
        slug: "carrots",
        name: "Carrots",
        amount: 1,
        unit: "piece",
        note: "Finely chopped",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "piece",
        note: "Finely chopped",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
        note: "Minced",
      },
      {
        slug: "egg",
        name: "Egg",
        amount: 1,
        unit: "piece",
      },
      {
        slug: "soy-sauce",
        name: "Soy Sauce",
        amount: 1,
        unit: "tablespoon",
      },
      {
        slug: "cooking-oil",
        name: "Cooking Oil",
        amount: 4,
        unit: "cups",
        note: "For frying",
      },
    ],
    nutrition: {
      calories: 430,
      proteinG: 21,
      carbsG: 34,
      fatG: 24,
      fiberG: 2,
    },
  },

  {
    slug: "lechon-kawali",
    title: "Lechon Kawali",
    description:
      "Crispy deep-fried Filipino pork belly served with a savory vinegar dipping sauce.",
    prepMinutes: 15,
    cookMinutes: 100,
    servings: 5,
    categorySlug: "main-dishes",
    categoryName: "Main Dishes",
    steps: [
      "Place the pork belly in a pot with water, garlic, bay leaves, and salt.",
      "Simmer until the pork is tender.",
      "Remove the pork and allow it to cool completely.",
      "Pat the skin dry and fry until golden and crispy.",
      "Rest the pork, slice it, and serve with dipping sauce.",
    ],
    ingredients: [
      {
        slug: "pork-belly",
        name: "Pork Belly",
        amount: 1,
        unit: "kilogram",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 6,
        unit: "cloves",
      },
      {
        slug: "bay-leaves",
        name: "Bay Leaves",
        amount: 3,
        unit: "leaves",
      },
      {
        slug: "white-vinegar",
        name: "White Vinegar",
        amount: 0.5,
        unit: "cup",
        note: "For dipping sauce",
      },
      {
        slug: "salt",
        name: "Salt",
        amount: 1,
        unit: "tablespoon",
      },
      {
        slug: "black-peppercorns",
        name: "Black Peppercorns",
        amount: 1,
        unit: "teaspoon",
      },
      {
        slug: "cooking-oil",
        name: "Cooking Oil",
        amount: 4,
        unit: "cups",
        note: "For deep frying",
      },
    ],
    nutrition: {
      calories: 760,
      proteinG: 30,
      carbsG: 3,
      fatG: 70,
      fiberG: 0,
    },
  },

  {
    slug: "sisig",
    title: "Filipino Pork Sisig",
    description:
      "A sizzling Filipino dish made with chopped pork, onions, chili peppers, calamansi, and a savory soy dressing.",
    prepMinutes: 25,
    cookMinutes: 60,
    servings: 4,
    categorySlug: "main-dishes",
    categoryName: "Main Dishes",
    steps: [
      "Boil the pork face or pork belly until tender.",
      "Grill or pan-sear the pork until the edges become crisp.",
      "Chop the pork into small pieces.",
      "Sauté onion, garlic, and chili peppers.",
      "Add the chopped pork, soy sauce, and calamansi juice. Serve sizzling.",
    ],
    ingredients: [
      {
        slug: "pork-belly",
        name: "Pork Belly",
        amount: 750,
        unit: "grams",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "large",
        note: "Finely chopped",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
      },
      {
        slug: "red-chili",
        name: "Red Chili",
        amount: 2,
        unit: "pieces",
        note: "Sliced",
      },
      {
        slug: "calamansi-juice",
        name: "Calamansi Juice",
        amount: 3,
        unit: "tablespoons",
      },
      {
        slug: "soy-sauce",
        name: "Soy Sauce",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "mayonnaise",
        name: "Mayonnaise",
        amount: 3,
        unit: "tablespoons",
      },
    ],
    nutrition: {
      calories: 610,
      proteinG: 32,
      carbsG: 9,
      fatG: 49,
      fiberG: 2,
    },
  },

  {
    slug: "bistek-tagalog",
    title: "Bistek Tagalog",
    description:
      "Thin slices of beef marinated in calamansi and soy sauce, then cooked with caramelized onions.",
    prepMinutes: 30,
    cookMinutes: 25,
    servings: 4,
    categorySlug: "main-dishes",
    categoryName: "Main Dishes",
    steps: [
      "Marinate the beef in calamansi juice, soy sauce, garlic, and pepper.",
      "Heat oil and sear the beef slices quickly on both sides.",
      "Remove the beef and sauté the onion rings.",
      "Return the beef to the pan and add the marinade.",
      "Simmer briefly and serve with steamed rice.",
    ],
    ingredients: [
      {
        slug: "beef-sirloin",
        name: "Beef Sirloin",
        amount: 700,
        unit: "grams",
        note: "Thinly sliced",
      },
      {
        slug: "calamansi-juice",
        name: "Calamansi Juice",
        amount: 0.25,
        unit: "cup",
      },
      {
        slug: "soy-sauce",
        name: "Soy Sauce",
        amount: 0.25,
        unit: "cup",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 2,
        unit: "large",
        note: "Sliced into rings",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
      },
      {
        slug: "black-pepper",
        name: "Ground Black Pepper",
        amount: 1,
        unit: "teaspoon",
      },
      {
        slug: "cooking-oil",
        name: "Cooking Oil",
        amount: 2,
        unit: "tablespoons",
      },
    ],
    nutrition: {
      calories: 460,
      proteinG: 42,
      carbsG: 13,
      fatG: 27,
      fiberG: 2,
    },
  },

  {
    slug: "ginataang-kalabasa",
    title: "Ginataang Kalabasa at Sitaw",
    description:
      "A creamy Filipino vegetable stew made with squash, string beans, coconut milk, garlic, and shrimp.",
    prepMinutes: 15,
    cookMinutes: 30,
    servings: 4,
    categorySlug: "vegetable-dishes",
    categoryName: "Vegetable Dishes",
    steps: [
      "Sauté garlic and onion in cooking oil.",
      "Add the shrimp and cook until pink.",
      "Add squash and coconut milk.",
      "Simmer until the squash is almost tender.",
      "Add string beans and fish sauce, then cook until the vegetables are tender.",
    ],
    ingredients: [
      {
        slug: "butternut-squash",
        name: "Squash",
        amount: 500,
        unit: "grams",
        note: "Peeled and cubed",
      },
      {
        slug: "string-beans",
        name: "String Beans",
        amount: 250,
        unit: "grams",
        note: "Cut into pieces",
      },
      {
        slug: "shrimp",
        name: "Shrimp",
        amount: 250,
        unit: "grams",
        note: "Peeled",
      },
      {
        slug: "coconut-milk",
        name: "Coconut Milk",
        amount: 2,
        unit: "cups",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 4,
        unit: "cloves",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "piece",
      },
      {
        slug: "fish-sauce",
        name: "Fish Sauce",
        amount: 1,
        unit: "tablespoon",
      },
    ],
    nutrition: {
      calories: 350,
      proteinG: 20,
      carbsG: 29,
      fatG: 20,
      fiberG: 7,
    },
  },

  {
    slug: "tortang-talong",
    title: "Tortang Talong",
    description:
      "Grilled Filipino eggplant omelet made with egg, garlic, onion, and ground pork.",
    prepMinutes: 20,
    cookMinutes: 25,
    servings: 4,
    categorySlug: "vegetable-dishes",
    categoryName: "Vegetable Dishes",
    steps: [
      "Grill the eggplants until the skin is charred and the inside is tender.",
      "Peel the eggplants while keeping the stems attached.",
      "Flatten each eggplant with a fork.",
      "Dip the eggplant in beaten egg mixed with pork, onion, and garlic.",
      "Pan-fry until golden on both sides.",
    ],
    ingredients: [
      {
        slug: "eggplant",
        name: "Eggplant",
        amount: 4,
        unit: "pieces",
      },
      {
        slug: "egg",
        name: "Egg",
        amount: 4,
        unit: "pieces",
      },
      {
        slug: "ground-pork",
        name: "Ground Pork",
        amount: 200,
        unit: "grams",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "piece",
        note: "Finely chopped",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 3,
        unit: "cloves",
      },
      {
        slug: "cooking-oil",
        name: "Cooking Oil",
        amount: 3,
        unit: "tablespoons",
      },
      {
        slug: "salt",
        name: "Salt",
        amount: 1,
        unit: "teaspoon",
      },
    ],
    nutrition: {
      calories: 290,
      proteinG: 18,
      carbsG: 17,
      fatG: 17,
      fiberG: 6,
    },
  },

  {
    slug: "arroz-caldo",
    title: "Arroz Caldo",
    description:
      "A comforting Filipino chicken and rice porridge flavored with ginger, garlic, onion, and fish sauce.",
    prepMinutes: 15,
    cookMinutes: 55,
    servings: 5,
    categorySlug: "breakfast",
    categoryName: "Breakfast",
    steps: [
      "Sauté garlic, onion, and ginger in cooking oil.",
      "Add the chicken and cook until lightly browned.",
      "Add the rice and stir until coated with the aromatics.",
      "Pour in the chicken broth and simmer until the rice is soft.",
      "Season with fish sauce and serve with calamansi and boiled egg.",
    ],
    ingredients: [
      {
        slug: "chicken-thighs",
        name: "Chicken Thighs",
        amount: 600,
        unit: "grams",
        note: "Cut into pieces",
      },
      {
        slug: "glutinous-rice",
        name: "Glutinous Rice",
        amount: 1.5,
        unit: "cups",
      },
      {
        slug: "chicken-broth",
        name: "Chicken Broth",
        amount: 8,
        unit: "cups",
      },
      {
        slug: "ginger",
        name: "Fresh Ginger",
        amount: 50,
        unit: "grams",
        note: "Julienned",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 5,
        unit: "cloves",
      },
      {
        slug: "onion",
        name: "Onion",
        amount: 1,
        unit: "piece",
      },
      {
        slug: "fish-sauce",
        name: "Fish Sauce",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "calamansi-juice",
        name: "Calamansi Juice",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "egg",
        name: "Egg",
        amount: 2,
        unit: "pieces",
        note: "Hard-boiled",
      },
    ],
    nutrition: {
      calories: 390,
      proteinG: 25,
      carbsG: 53,
      fatG: 9,
      fiberG: 2,
    },
  },

  {
    slug: "pancit-palabok",
    title: "Pancit Palabok",
    description:
      "Filipino rice noodles covered with shrimp sauce and topped with shrimp, egg, pork, and crispy garlic.",
    prepMinutes: 35,
    cookMinutes: 40,
    servings: 5,
    categorySlug: "noodles",
    categoryName: "Noodles",
    steps: [
      "Soak and cook the rice noodles until tender.",
      "Prepare the shrimp stock using shrimp shells.",
      "Thicken the stock with cornstarch and annatto oil.",
      "Top the noodles with the shrimp sauce.",
      "Garnish with shrimp, boiled egg, pork, spring onion, and fried garlic.",
    ],
    ingredients: [
      {
        slug: "rice-noodles",
        name: "Rice Noodles",
        amount: 500,
        unit: "grams",
      },
      {
        slug: "shrimp",
        name: "Shrimp",
        amount: 350,
        unit: "grams",
      },
      {
        slug: "ground-pork",
        name: "Ground Pork",
        amount: 250,
        unit: "grams",
      },
      {
        slug: "annatto-seeds",
        name: "Annatto Seeds",
        amount: 2,
        unit: "tablespoons",
      },
      {
        slug: "cornstarch",
        name: "Cornstarch",
        amount: 3,
        unit: "tablespoons",
      },
      {
        slug: "egg",
        name: "Egg",
        amount: 3,
        unit: "pieces",
        note: "Hard-boiled",
      },
      {
        slug: "garlic",
        name: "Garlic",
        amount: 6,
        unit: "cloves",
        note: "Fried until crisp",
      },
      {
        slug: "fish-sauce",
        name: "Fish Sauce",
        amount: 2,
        unit: "tablespoons",
      },
    ],
    nutrition: {
      calories: 510,
      proteinG: 28,
      carbsG: 71,
      fatG: 13,
      fiberG: 3,
    },
  },
];

async function getOrCreateCategory(slug: string, name: string) {
  return (
    (await db.orm.public.Category.where({ slug }).first()) ??
    (await db.orm.public.Category.create({ slug, name }))
  );
}

async function getOrCreateIngredient(item: SeedIngredient) {
  return (
    (await db.orm.public.Ingredient.where({ slug: item.slug }).first()) ??
    (await db.orm.public.Ingredient.create({
      slug: item.slug,
      name: item.name,
    }))
  );
}

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

  const dairyFreeDiet =
    (await db.orm.public.Diet.where({ slug: "dairy-free" }).first()) ??
    (await db.orm.public.Diet.create({
      slug: "dairy-free",
      name: "Dairy Free",
    }));

  const ingredientMap = new Map<string, { id: number }>();

  for (const recipeData of recipes) {
    for (const ingredientData of recipeData.ingredients) {
      if (!ingredientMap.has(ingredientData.slug)) {
        const ingredient = await getOrCreateIngredient(ingredientData);
        ingredientMap.set(ingredientData.slug, ingredient);
      }
    }
  }

  const oldAdobo = await db.orm.public.Recipe.where({
    slug: "chicken-abodo",
  }).first();

  const correctAdobo = await db.orm.public.Recipe.where({
    slug: "chicken-adobo",
  }).first();

  if (oldAdobo && !correctAdobo) {
    await db.orm.public.Recipe.where({ id: oldAdobo.id }).update({
      slug: "chicken-adobo",
    });

    console.log("Corrected chicken-abobo to chicken adobo");
  }

  for (const recipeData of recipes) {
    const category = await getOrCreateCategory(
      recipeData.categorySlug,
      recipeData.categoryName,
    );

    let recipe = await db.orm.public.Recipe.where({
      slug: recipeData.slug,
    }).first();

    const recipeFields = {
      slug: recipeData.slug,
      title: recipeData.title,
      description: recipeData.description,
      imageUrl: `${IMAGE_BASE_URL}/${recipeData.slug}.jpg`,
      prepMinutes: recipeData.prepMinutes,
      cookMinutes: recipeData.cookMinutes,
      servings: recipeData.servings,
      cuisineId: cuisine.id,
      dataSourceId: dataSource.id,
      isPublished: true,
    };

    if (recipe) {
      await db.orm.public.Recipe.where({ id: recipe.id }).update(recipeFields);
    } else {
      recipe = await db.orm.public.Recipe.create(recipeFields);
    }

    const existingSteps = await db.orm.public.RecipeStep.where({
      recipeId: recipe.id,
    }).all();

    if (existingSteps.length === 0) {
      for (let index = 0; index < recipeData.steps.length; index++) {
        await db.orm.public.RecipeStep.create({
          recipeId: recipe.id,
          stepNumber: index + 1,
          instruction: recipeData.steps[index],
        });
      }
    }

    const existingIngredients = await db.orm.public.RecipeIngredient.where({
      recipeId: recipe.id,
    }).all();

    if (existingIngredients.length === 0) {
      for (let index = 0; index < recipeData.ingredients.length; index++) {
        const item = recipeData.ingredients[index];
        const ingredient = ingredientMap.get(item.slug);

        if (!ingredient) {
          throw new Error(`Ingredient not found: ${item.slug}`);
        }

        await db.orm.public.RecipeIngredient.create({
          recipeId: recipe.id,
          ingredientId: ingredient.id,
          amount: item.amount,
          unit: item.unit,
          note: item.note ?? null,
          sortOrder: index + 1,
        });
      }
    }

    const existingCategoryLink = await db.orm.public.RecipeCategory.where({
      recipeId: recipe.id,
      categoryId: category.id,
    }).first();

    if (!existingCategoryLink) {
      await db.orm.public.RecipeCategory.create({
        recipeId: recipe.id,
        categoryId: category.id,
      });
    }

    const existingDietLink = await db.orm.public.RecipeDiet.where({
      recipeId: recipe.id,
      dietId: dairyFreeDiet.id,
    }).first();

    if (!existingDietLink) {
      await db.orm.public.RecipeDiet.create({
        recipeId: recipe.id,
        dietId: dairyFreeDiet.id,
      });
    }

    const existingNutrition = await db.orm.public.RecipeNutrition.where({
      recipeId: recipe.id,
    }).first();

    const nutritionFileds = {
      calories: recipeData.nutrition.calories,
      proteinG: recipeData.nutrition.proteinG,
      carbsG: recipeData.nutrition.carbsG,
      fatG: recipeData.nutrition.fatG,
      fiberG: recipeData.nutrition.fiberG,
    };

    if (existingNutrition) {
      await db.orm.public.RecipeNutrition.where({
        id: existingNutrition.id,
      }).update(nutritionFileds);
    } else {
      await db.orm.public.RecipeNutrition.create({
        recipeId: recipe.id,
        ...nutritionFileds,
      });
    }

    console.log(`Seeded: ${recipeData.title}`);
  }

  console.log(`Finished. ${recipes.length} recipes are available`);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
})
