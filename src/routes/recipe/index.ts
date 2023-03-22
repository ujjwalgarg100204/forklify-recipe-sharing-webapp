import { Router } from "express";

const RecipeRouter = Router();

RecipeRouter.get("/search", (req, res) => {
	res.render("pages/recipe/search");
});

RecipeRouter.get("/popular", (req, res) => {
	res.render("pages/recipe/popular");
});

export default RecipeRouter;
