import { Router } from "express";
import passport from "passport";

const LinkedInRouter = Router();

LinkedInRouter.get("/", passport.authenticate("linkedin"));

LinkedInRouter.get(
	"/redirect",
	passport.authenticate("linkedin"),
	(req, res) => {
		// TODO: Change the path here
		// res.redirect("/profile");
		res.send(req.user);
	}
);

export default LinkedInRouter;
