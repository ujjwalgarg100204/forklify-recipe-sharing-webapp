import { IRecipe } from "./models/Recipe";
import { RecipeCard } from "./types/custom";
import { IUser } from "./models/User";
import { Stars } from "./types/custom/frontend-types";
import { NextFunction, Request, Response } from "express";

function mean(arr: number[]): number {
	return arr.reduce((prevVal, currVal) => prevVal + currVal, 0) / arr.length;
}

export function toRecipeCard(recipe: IRecipe, user?: IUser): RecipeCard {
	// calculate stars of the recipe
	// stars are just mean of all the reviews rating that the recipe has gotten
	const stars = (Math.round(
		mean(recipe.reviews?.map(review => review.rating))
	) || 0) as Stars;

	const recipeObj = {
		...recipe,
		stars,
		id: recipe._id.toString(),
		totalCookTime: recipe.cookTime + recipe.prepTime,
	};

	if (!user)
		return {
			...recipeObj,
			bookmarked: false,
		};

	// find out if the recipe is bookmarked by user or not
	const bookmarked = !!user.bookmarkedRecipes.find(bookmarked =>
		bookmarked.equals(recipe._id)
	);
	return {
		...recipeObj,
		bookmarked,
	};
}

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	req.user ? next() : res.redirect("/auth/login");
}
