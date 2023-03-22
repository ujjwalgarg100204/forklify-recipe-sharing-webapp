import mongoose, { Document, Model, Schema, Types } from "mongoose";

export enum RecipeCategories {
	breakfast = "breakfast",
	brunch = "brunch",
	snack = "snack",
	appetizer = "appetizers",
	lunch = "lunch",
	drink = "drinks",
	dessert = "dessert",
	dinner = "dinner",
}

export interface IRecipe extends Document {
	title: string;
	author: Types.ObjectId;
	desc: string;
	ingredients: {
		name: string;
		quantity: {
			num: number;
			suffix: string;
		};
	}[];
	category: RecipeCategories;
	steps: string[];
	tags: string[];
	image: string;
	video?: string;
	region: string;
	servings?: number;
	prepTime: number;
	cookTime: number;
	notes?: string;
	nutrition?: {
		calories?: number;
		protein?: number;
		carb?: number;
		fat?: number;
	};
	reviews?: {
		user: Types.ObjectId;
		text: String;
		date: Date;
		rating: number;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const recipeSchema: Schema = new Schema<IRecipe>({
	title: { type: String, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	desc: { type: String, required: true },
	ingredients: [
		{
			name: { type: String, required: true },
			quantity: {
				num: { type: Number, required: true },
				suffix: { type: Number, required: true },
			},
		},
	],
	category: {
		type: String,
		required: true,
		enum: Object.values(RecipeCategories),
	},
	steps: { type: [String], required: true },
	tags: { type: [String], required: true },
	image: { type: String, required: true },
	region: { type: String, required: true },
	nutrition: {
		calories: Number,
		protein: Number,
		carb: Number,
		fat: Number,
	},
	video: String,
	servings: Number,
	prepTime: { type: Number, required: true, min: 1 },
	cookTime: { type: Number, required: true, min: 1 },
	notes: String,
	reviews: [
		{
			user: { type: Schema.Types.ObjectId, ref: "User", required: true },
			text: { type: String, required: true },
			date: { type: Date, default: Date.now },
			rating: { type: Number, required: true },
		},
	],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const RecipeModel: Model<IRecipe> = mongoose.model<IRecipe>(
	"RecipeCard",
	recipeSchema
);

export default RecipeModel;
