import { Router } from "express";
import AuthRoutes from "./auth";
import RecipeRouter from "./recipe";
import UserRouter from "./user";
import CollectionRouter from "./collection";
import { getRecommendationRecipes } from "../data/Recipes";

const IndexRouter = Router();

// Import all other routes
IndexRouter.use("/auth", AuthRoutes);
IndexRouter.use("/r", RecipeRouter);
IndexRouter.use("/c", CollectionRouter);
IndexRouter.use("/u", UserRouter);

IndexRouter.get("/", async (req, res) => {
	const recommendedRecipes = await getRecommendationRecipes();
	res.render("pages/home", {
		recommendedRecipes: recommendedRecipes.slice(0, 5),
		user: req.user,
	});
});

IndexRouter.get("/about", (req, res) => {
	res.render("pages/about", { user: req.user });
});

IndexRouter.get("/conditions", (req, res) => {
	res.render("pages/conditions", { user: req.user });
});

IndexRouter.get("/contact", (req, res) => {
	res.render("pages/contact", { user: req.user });
});

IndexRouter.get("/privacy-policy", (req, res) => {
	res.render("pages/privacy-policy", { user: req.user });
});

export default IndexRouter;
