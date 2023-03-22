import { Express } from "express";
import path from "path";

export default function configEJS(app: Express): void {
	app.set("views", path.join(__dirname, "..", "..", "src", "views"));
	app.set("view engine", "ejs");
}
