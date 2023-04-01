import { Router } from "express";
import {
	getRecipeCollection,
	updateRecipeCollection,
	insertRecipeCollection,
	getRecipeCollectionOfUser,
} from "../../data/RecipesCollection";
import { IRecipeCollection } from "../../models/RecipeCollection";

const CollectionUserRouter = Router();

// Create User Collection
CollectionUserRouter.get("/create", (req, res) => {
	res.render("pages/collections/create", { user: req.user });
});

CollectionUserRouter.post("/create", async (req, res) => {
	const { title, desc, image } = req.body;
	await insertRecipeCollection(req.user!._id, title, desc, image);
	res.redirect("/u/collections"); // redirect to page where all collections are shown
});

// Update User Collection
CollectionUserRouter.get("/update/:id", async (req, res) => {
	const { id } = req.params;
	const collectionData = (await getRecipeCollection(id)) as IRecipeCollection;
	console.log({ su: "s", ...collectionData });

	res.render("pages/collections/update", {
		...collectionData,
		user: req.user,
	});
});

CollectionUserRouter.post("/update/:id", async (req, res) => {
	const { id } = req.params;
	const { title, desc, image } = req.body;

	await updateRecipeCollection(id, title, desc, image);

	res.redirect("/u/collections"); // redirect to page where all collections are shown
});

// Show all collections of user
CollectionUserRouter.get("/", (req, res) => {
	res.redirect("/u/collections/browse");
});

CollectionUserRouter.get("/browse", async (req, res) => {
	const collections = await getRecipeCollectionOfUser(req.user!._id);
	res.render("pages/collections/browse", {
		collections,
		user: req.user,
		personalised: true,
	});
});

export default CollectionUserRouter;
