import Recipe, { RecipeCategories, Regions } from "../models/Recipe";
import RecipeModel, { IRecipe } from "../models/Recipe";
import { MongoID } from "../types/custom";
import { getUserData } from "./User";
import { IUser } from "../models/User";
import { Types } from "mongoose";

export async function getPopularRecipes(): Promise<IRecipe[]> {
	// popular recipe is defined as a recipe with most bookmarkCount and higher
	// rating
	return await Recipe.find()
		.sort({ bookmarkCount: -1, "reviews.rating": -1 })
		.limit(20)
		.lean(true)
		.exec();
}

interface RecommendationCard extends IRecipe {
	totalTime: number; // cookTime + prepTime
}

export async function getRecommendationRecipes(): Promise<
	RecommendationCard[]
> {
	// give popular recipes for now
	const popularRecipes = await getPopularRecipes();

	// convert to RecommendationRecipe
	return popularRecipes.map(recipe => ({
		...recipe,
		totalTime: recipe.cookTime + recipe.prepTime,
	}));
}

export async function getRecipeDetails(
	id: MongoID
): Promise<RecommendationCard | null> {
	const foundRecipe = await Recipe.findById(id).lean(true).exec();
	return foundRecipe
		? {
				...foundRecipe,
				totalTime: foundRecipe.prepTime + foundRecipe.cookTime,
		  }
		: null;
}

interface RecipeCard extends RecommendationCard {
	stars: number; // average of all rating rounded-off
	noOfIngredient: number; // length of ingredients array
	bookmarked: boolean; // if user is authenticated then actually check the id of recipe in bookmarked array otherwise always false
}

export async function isBookmarkedByUser(
	recipeID: MongoID,
	userID: MongoID
): Promise<boolean> {
	const userData = (await getUserData(userID)) as IUser;
	return !!userData.bookmarkedRecipes.find(bookmarked =>
		bookmarked.equals(recipeID)
	);
}

export async function getRecipeCardDetails(
	recipeID: MongoID,
	userIsAuthenticated: boolean,
	userID?: MongoID
): Promise<RecipeCard | null> {
	const recipeDetail = await getRecipeDetails(recipeID);
	// if recipe ID is not valid return null
	if (!recipeDetail) return null;

	// stars are just mean of all rating rounded off to nearest integer
	const stars = Math.round(
		recipeDetail.reviews.reduce(
			(previousValue, currentValue) =>
				currentValue.rating + previousValue,
			0
		) / recipeDetail.reviews.length
	);
	const noOfIngredient = recipeDetail.ingredients.length;

	const bookmarked =
		userIsAuthenticated &&
		(await isBookmarkedByUser(recipeID, userID as MongoID));

	return {
		...recipeDetail,
		stars,
		noOfIngredient,
		bookmarked,
	};
}

export async function saveRecipeDetails(recipe: {
	title: string;
	author: Types.ObjectId;
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
}) {
	return await new RecipeModel({
		...recipe,
	}).save();
}
