import { Router } from "express";
import { getPopularRecipes, getRecipeDetails } from "../../data/Recipes";

const RecipeRouter = Router();

RecipeRouter.get("/search", (req, res) => {
	res.render("pages/recipe/search", { user: req.user, resultRecipes: [] });
});
RecipeRouter.get("/create", (req, res) => {
	res.render("pages/recipe/create", { user: req.user });
});
RecipeRouter.get("/:recipeID", async (req, res) => {
	const recipeID = req.params.recipeID;
	const recipeData = await getRecipeDetails(recipeID);
	res.render("pages/recipe/recipe", { recipe: recipeData, user: req.user });
});

RecipeRouter.get("/popular", async (req, res) => {
	const popularRecipes = await getPopularRecipes();
	res.render("pages/recipe/popular", { popularRecipes, user: req.user });
});

export default RecipeRouter;
