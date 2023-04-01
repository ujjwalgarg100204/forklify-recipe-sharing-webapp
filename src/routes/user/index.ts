import { Router } from "express";
import { getRecipeCollectionOfUser } from "../../data/RecipesCollection";
import RecipeCreateRouter from "./create";
import { getRecipesOfUser } from "../../data/User";
import RecipeModel, { IRecipe } from "../../models/Recipe";
import { isAuthenticated } from "../util";
import User from "../../models/User";
import RecipeUserRouter from "./recipe";
import CollectionUserRouter from "./collection";

const UserRouter = Router();

UserRouter.use(isAuthenticated);

UserRouter.use("/create", RecipeCreateRouter);
UserRouter.use("/collections", CollectionUserRouter);
UserRouter.use("/recipes", RecipeUserRouter);

UserRouter.get("/", (req, res) => {
	res.redirect("/u/dashboard");
});

UserRouter.get("/dashboard", async (req, res) => {
	const userRecipes = (await getRecipesOfUser(req.user!._id)) as IRecipe[];
	const commentsNum = userRecipes.reduce(
		(previousValue, currentValue) =>
			previousValue +
			currentValue.reviews.filter(review =>
				review.user.equals(req.user!._id)
			).length,
		0
	);
	res.render("pages/user/dashboard", { commentsNum, user: req.user });
});

export default UserRouter;
