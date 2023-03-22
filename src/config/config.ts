import express, { Express } from "express";
import configEJS from "./ejs.config";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import configPassport from "./passport.config";

function config(app: Express): void {
	// config EJS
	configEJS(app);

	// config passport
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// config mongoose
	const clientP = mongoose
		.connect(process.env.MONGO_LOCAL_URL as string, {
			serverSelectionTimeoutMS: 2000,
		})
		.then(m => m.connection.getClient());

	// passport-session setup & cookies setup
	app.use(
		session({
			secret: process.env.COOKIE_SECRET as string,
			resave: false,
			saveUninitialized: false,
			store: MongoStore.create({
				clientPromise: clientP,
				collectionName: "sessions",
				stringify: false,
			}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24, // equals to 1 day
			},
		})
	);

	// passport setup
	app.use(passport.initialize());
	app.use(passport.session());
	configPassport();

	// add static files to passport
	app.use(express.static("src/public"));
}

export default config;
