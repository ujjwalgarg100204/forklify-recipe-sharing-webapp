import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IRecipeCollection extends Document {
	title: string;
	author: Types.ObjectId;
	recipes?: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const recipeCollectionSchema = new mongoose.Schema<IRecipeCollection>({
	title: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	recipes: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const RecipeCollectionModel: Model<IRecipeCollection> =
	mongoose.model<IRecipeCollection>(
		"RecipeCard Collections",
		recipeCollectionSchema
	);

export default RecipeCollectionModel;
