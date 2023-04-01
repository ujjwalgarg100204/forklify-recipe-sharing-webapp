import { Router } from "express";
import { getRecipesOfUser } from "../../data/User";
import { IRecipe } from "../../models/Recipe";
import { getRecipeCollectionOfUser } from "../../data/RecipesCollection";

const RecipeUserRouter = Router();

// get all recipes of user
RecipeUserRouter.get("/", async (req, res) => {
	let recipes = (await getRecipesOfUser(req.user!._id)) as IRecipe[];
	recipes = recipes.map(recipe => ({
		...recipe,
		id: recipe._id.toString(),
		totalTime: recipe.cookTime + recipe.prepTime,
		stars: 4,
		noOfIngredient: recipe.ingredients.length,
		bookmarked: true,
	}));
	res.render("pages/user/recipes", { recipes, user: req.user });
});

// get bookmarked recipes of user
RecipeUserRouter.get("/saved", async (req, res) => {
	const userCollections = await getRecipeCollectionOfUser(req.user!._id);
	res.render("pages/recipe/saved", { userCollections, user: req.user });
});

RecipeUserRouter.get("/create", (req, res) => {});

RecipeUserRouter.get("/update/:id", (req, res) => {});

export default RecipeUserRouter;
