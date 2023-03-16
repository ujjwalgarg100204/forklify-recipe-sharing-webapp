import express, { Express } from "express";
import configEJS from "./ejs.config";
import path from "path";

function config(app: Express): void {
	// config EJS
	configEJS(app);

	// add static files to express
	app.use(express.static(path.join(__dirname, "..", "public")));
}

export default config;
