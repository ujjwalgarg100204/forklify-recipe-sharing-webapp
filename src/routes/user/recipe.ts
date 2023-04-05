import { Router } from "express";
import { getRecipesOfUser } from "../../data/User";
import { IRecipe } from "../../models/Recipe";
import {
	deleteRecipe,
	getAllBookmarkedRecipes,
	getRecipe,
	toggleBookmarkRecipe,
} from "../../data/Recipes";
import { toRecipeCard } from "../../utils";

const RecipeUserRouter = Router();

// get all recipes of user
RecipeUserRouter.get("/", async (req, res) => {
	const recipes = ((await getRecipesOfUser(req.user!._id)) as IRecipe[]).map(
		recipe => toRecipeCard(recipe)
	);
	res.render("pages/user/recipes", { recipes, user: req.user });
});

// get bookmarked recipes of user
RecipeUserRouter.get("/saved", async (req, res) => {
	const bookmarkedRecipes = (await getAllBookmarkedRecipes(req.user!)).map(
		recipe => toRecipeCard(recipe)
	);
	res.render("pages/recipe/saved", { bookmarkedRecipes, user: req.user });
});

RecipeUserRouter.get("/create", (req, res) => {
	res.render("pages/recipe/create", { user: req.user });
});
RecipeUserRouter.get("/search", (req, res) => {
	res.redirect("/r/search");
});
RecipeUserRouter.get("/edit/:id", async (req, res) => {
	const { id } = req.params;
	const recipe = await getRecipe(id);
	res.render("pages/recipe/update/[id]", {
		recipe: toRecipeCard(recipe!),
		user: req.user,
	});
});

RecipeUserRouter.get("/delete/:id", async (req, res) => {
	const { id } = req.params;
	res.render("pages/recipe/delete/[id]");
});
RecipeUserRouter.delete("/delete/:id", async (req, res) => {
	const { id } = req.params;
	const deleteResponse = await deleteRecipe(id);

	res.status(deleteResponse.success ? 200 : 500).json(deleteResponse);
});

RecipeUserRouter.get("/bookmark/:id", async (req, res) => {
	const { id } = req.params;
	console.log(req.user);
	const response = await toggleBookmarkRecipe(id, req.user!);
	res.status(response.error ? 500 : 200).json(response);
});

export default RecipeUserRouter;
