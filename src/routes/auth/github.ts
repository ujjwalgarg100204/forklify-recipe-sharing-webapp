import { Router } from "express";
import passport from "passport";

const GitHubRouter = Router();

GitHubRouter.get("/", passport.authenticate("github"));

GitHubRouter.get("/redirect", passport.authenticate("github"), (req, res) => {
	// TODO: Change the path here
	// res.redirect("/profile");
	res.send(req.user);
});

export default GitHubRouter;
