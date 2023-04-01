import { Router } from "express";
import { RecipeCategories, Regions } from "../../models/Recipe";
import { saveRecipeDetails } from "../../data/Recipes";

interface RequestRecipe {
	title: string;
	desc: string;
	ingredients: {
		name: string;
		quantity: {
			num: number;
			suffix: string;
		};
	}[];
	category: RecipeCategories;
	steps: string[];
	tags: string[];
	image: string;
	video?: string;
	region: Regions;
	servings?: number;
	prepTime: number;
	cookTime: number;
	notes?: string;
	nutrition?: {
		calories?: number;
		protein?: number;
		carb?: number;
		fat?: number;
	};
}

const RecipeCreateRouter = Router();

RecipeCreateRouter.route("/")
	.get((req, res) => {
		res.render("pages/recipe/create", { user: req.user });
	})
	.post(async (req, res) => {
		const recipe: RequestRecipe = req.body;

		const result = await saveRecipeDetails({
			...recipe,
			author: req.user!._id,
		});

		res.render("pages/user/recipes", { user: req.user, saved: result });
	});

export default RecipeCreateRouter;
