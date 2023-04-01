import { Router } from "express";
import { getRecipeCollections } from "../data/RecipesCollection";

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

CollectionRouter.get("/browse", async (req, res) => {
	const collections = await getRecipeCollections(20);
	res.render("pages/collections/browse", { collections, user: req.user, personalised: false });
});

export default CollectionRouter;
