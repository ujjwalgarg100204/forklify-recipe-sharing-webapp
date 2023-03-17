import express, { Express } from "express";
import configEJS from "./ejs.config";

function config(app: Express): void {
	// config EJS
	configEJS(app);

	// add static files to express
	app.use(express.static("src/public"));
}

export default config;
