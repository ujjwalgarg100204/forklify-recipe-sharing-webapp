import { Router } from "express";
import AuthRoutes from "./auth";
import RecipeRouter from "./recipe";
import UserRouter from "./user";
import CollectionRouter from "./collection";

const IndexRouter = Router();

IndexRouter.get("/", (req, res) => {
	res.render("pages/home", { user: req.user });
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
1;

// Import all other routes
IndexRouter.use("/auth", AuthRoutes);
IndexRouter.use("/r", RecipeRouter);
IndexRouter.use("/c", CollectionRouter);
IndexRouter.use("/u", UserRouter);

export default IndexRouter;
