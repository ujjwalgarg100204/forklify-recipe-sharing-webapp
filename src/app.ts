import express, { Express } from "express";
import dotenv from "dotenv";
import config from "./config/config";
import IndexRouter from "./routes";
import { getRecipe } from "./data/Recipes";
import { toRecipeCard } from "./utils";
import { getRecipeCollection } from "./data/RecipesCollection";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

// apply all the configuration
config(app);

// import all routes
app.use("/", IndexRouter);

// import testing routes
app.get("/testing/:comp", async (req, res) => {
	const { comp } = req.params;
	const recipe1 = await getRecipe("64219cc03f6383a028b19cbe");
	const recipe2 = await getRecipe("64219c6b3f6383a028b19cb8");
	const collection = await getRecipeCollection("6425d9e8bc86d319b4de2887")!;
	res.render(`pages/testing/${comp}`, {
		recipe: toRecipeCard(recipe1!, req.user),
		recipe2: toRecipeCard(recipe2!, req.user),
		collection: collection,
		user: req.user,
	});
});

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
