import mongoose, { Model, Schema, Types } from "mongoose";

export interface IShoppingList {
	_id: Types.ObjectId;
	name: string;
	author: Types.ObjectId;
	items?: { name: string; quantity: number }[];
	createdAt: Date;
	updatedAt: Date;
}

const shoppingListSchema = new mongoose.Schema<IShoppingList>({
	name: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	items: [
		{
			name: { type: String, required: true },
			quantity: { type: Number, required: true },
		},
	],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const ShoppingListModel: Model<IShoppingList> = mongoose.model<IShoppingList>(
	"ShoppingList",
	shoppingListSchema
);

export default ShoppingListModel;
