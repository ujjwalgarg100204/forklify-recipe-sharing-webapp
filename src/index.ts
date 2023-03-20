import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import config from "./config/config";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

// apply all the configuration
config(app);

app.get("/", (req: Request, res: Response) => {
	res.render("pages/index");
});

app.get("/login", (req: Request, res: Response) => {
	res.render("pages/recipe/login");
});

app.get("/find-recipe", (req: Request, res: Response) => {
	res.render("pages/recipe/find-recipe");
});

app.get("/recipe", (req: Request, res: Response) => {
	res.render("pages/recipe/recipe");
});

app.get("/saved-recipe", (req: Request, res: Response) => {
	res.render("pages/recipe/saved-recipes");
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
