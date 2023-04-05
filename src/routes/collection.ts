import { Router } from "express";
import {
	getAllRecipeCollections,
	getRecipeCollection,
} from "../data/RecipesCollection";
import { IRecipeCollection } from "../models/RecipeCollection";
import { getRecipe } from "../data/Recipes";
import { RecipeCollectionDetailed } from "../types/custom/frontend-types";
import { toRecipeCard } from "../utils";

const CollectionRouter = Router();

// protected routes

// only authenticated users can create a collection but, I don't need to
// specifically check if user is authenticated here as path "/u/c/create" already
// does that
CollectionRouter.get("/create", (req, res) => {
	res.redirect("/u/collection/create");
});

// only authenticated users can create update a collection but, I don't need to
// specifically check if user is authenticated here as path "/u/c/update" already
// does that
CollectionRouter.get("/update/:id", (req, res) => {
	const { id: collectionID } = req.params;
	res.redirect(`/u/collection/update/${collectionID}`);
});

// public routes
CollectionRouter.get("/search", (req, res) => {
	res.render("pages/collection/search", { user: req.user });
});

CollectionRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const collectionData = (await getRecipeCollection(id)) as IRecipeCollection;
	const recipesContained = (
		await Promise.all(
			collectionData.recipes.map(
				async recipeID => (await getRecipe(recipeID))!
			)
		)
	).map(recipe => toRecipeCard(recipe));

	const collection: RecipeCollectionDetailed = {
		...collectionData,
		recipesContaine,
	};

	res.render("pages/collections/[id]", { collection, user: req.user });
});

CollectionRouter.get("/", async (req, res) => {
	const collections = await getAllRecipeCollections();
	res.render("pages/collections/", { collections, user: req.user });
});

export default CollectionRouter;
