import { Router } from "express";

const CollectionRouter = Router();

CollectionRouter.get("/create", (req, res) => {
	res.render("pages/collection/create");
});

CollectionRouter.get("/search", (req, res) => {
	res.render("pages/collection/search");
});

CollectionRouter.get("/popular", (req, res) => {
	res.render("pages/collection/popular");
});

export default CollectionRouter;
