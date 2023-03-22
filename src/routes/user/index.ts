import { NextFunction, Request, Response, Router } from "express";
import { getRecipeCollectionOfUser } from "../../data/RecipesCollection";

const UserRouter = Router();

function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	if (req.user) {
		next();
	} else {
		res.redirect("/auth/login");
	}
}

UserRouter.use(isAuthenticated);

UserRouter.get("/saved", async (req, res) => {
	const userCollections = await getRecipeCollectionOfUser(req.user!._id);
	res.render("pages/recipe/saved", { userCollections, user: req.user });
});
export default UserRouter;
