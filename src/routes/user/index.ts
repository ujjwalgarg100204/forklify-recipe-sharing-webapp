import { Router } from "express";

const UserRouter = Router();

UserRouter.get("/saved", (req, res) => {
	res.render("pages/recipe/saved");
});
export default UserRouter;
