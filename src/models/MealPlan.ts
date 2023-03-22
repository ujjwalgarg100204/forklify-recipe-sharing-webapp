import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IMealPlan extends Document {
	name: string;
	author: Types.ObjectId;
	recipes?: {
		recipe: Types.ObjectId;
		date: Date;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const mealPlanSchema = new Schema<IMealPlan>({
	name: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	recipes: [
		{
			recipe: {
				type: Schema.Types.ObjectId,
				ref: "RecipeCard",
				required: true,
			},
			date: { type: Date, required: true },
		},
	],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const MealPlanModel: Model<IMealPlan> = mongoose.model<IMealPlan>(
	"MealPlan",
	mealPlanSchema
);

export default MealPlanModel;
