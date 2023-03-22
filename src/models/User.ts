import mongoose, { Document, Model, Schema, Types } from "mongoose";

export enum OauthProvider {
	github = "github",
	google = "google",
	linkedin = "linkedin",
}

export interface IUser extends Document {
	username: string;
	oauthID: string;
	oauthProvider: OauthProvider;
	email?: string;
	profile: {
		name: string;
		bio?: string;
		avatar?: string;
		location?: string;
	};
	recipes?: Types.ObjectId[];
	bookmarkedRecipes?: Types.ObjectId[];
	mealPlans?: Types.ObjectId[];
	shoppingLists?: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	oauthID: { type: String, required: true },
	oauthProvider: {
		type: String,
		enum: Object.values(OauthProvider),
		required: true,
	},
	email: { type: String, unique: true },
	profile: {
		name: { type: String, required: true },
		bio: String,
		avatar: String,
		location: String,
	},
	recipes: [{ type: Schema.Types.ObjectId, ref: "RecipeCard" }],
	bookmarkedRecipes: [{ type: Schema.Types.ObjectId, ref: "RecipeCard" }],
	mealPlans: [{ type: Schema.Types.ObjectId, ref: "MealPlan" }],
	shoppingLists: [{ type: Schema.Types.ObjectId, ref: "ShoppingList" }],
});

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default UserModel;
