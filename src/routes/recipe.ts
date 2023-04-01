import { Router } from "express";
import { getPopularRecipes, getRecipeDetails } from "../data/Recipes";

const RecipeRouter = Router();

// protected routes
RecipeRouter.get("/create", (req, res) => {
	res.redirect("/u/recipe/create");
});

RecipeRouter.get("/update/:id", (req, res) => {
	const recipeID = req.params.id;
	res.redirect(`/u/recipe/update/${recipeID}`);
});

// public routes
RecipeRouter.get("/search", (req, res) => {
	res.render("pages/recipe/search", { user: req.user, resultRecipes: [] });
});

RecipeRouter.get("/popular", async (req, res) => {
	const popularRecipes = await getPopularRecipes();

	res.render("pages/recipe/popular", { popularRecipes, user: req.user });
});

RecipeRouter.get("/", async (req, res) => {
	const recipes = (await getPopularRecipes()).map(recipe => ({
		...recipe,
		id: recipe._id.toString(),
		totalTime: recipe.cookTime + recipe.prepTime,
		stars: 4,
		noOfIngredient: recipe.ingredients.length,
		bookmarked: true,
	}));

	res.render("pages/recipe/recipes", { recipes, user: req.user });
});

RecipeRouter.get("/:recipeID", async (req, res) => {
	const recipeID = req.params.recipeID;
	const recipeData = await getRecipeDetails(recipeID);

	const recipe = { ...recipeData, stars: 4 };

	const recipes = (await getPopularRecipes()).map(recipe => ({
		...recipe,
		id: recipe._id.toString(),
		totalTime: recipe.cookTime + recipe.prepTime,
		stars: 4,
		noOfIngredient: recipe.ingredients.length,
		bookmarked: true,
	}));

	res.render("pages/recipe/recipe-id", {
		recipe: recipe,
		user: req.user,
		servings: 4,
		calories: 5,
		protein: 200,
		carb: 200,
		fat: 400,
		recipes: recipes.slice(0, 5),
	});
});

export default RecipeRouter;
