import { Router } from "express";
import GoogleRouter from "./google";
import GitHubRouter from "./github";
import LinkedInRouter from "./linkedin";

const AuthRoutes = Router();

AuthRoutes.use("/google", GoogleRouter);
AuthRoutes.use("/github", GitHubRouter);
AuthRoutes.use("/linkedin", LinkedInRouter);

AuthRoutes.get("/login", (req, res) => {
	// if already logged in, then just go to dashboard.ejs
	req.user
		? res.render("pages/user/dashboard", { user: req.user })
		: res.render("pages/login", { user: req.user });
});

AuthRoutes.get("/logout", (req, res) => {
	req.logout(() => res.redirect("/"));
});

export default AuthRoutes;
