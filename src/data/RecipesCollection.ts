import RecipeCollectionModel, {
	IRecipeCollection,
} from "../models/RecipeCollection";

import { MongoID } from "../types/custom";
import { Types } from "mongoose";

export async function getRecipeCollection(
	collectionID: MongoID
): Promise<IRecipeCollection | null> {
	return await RecipeCollectionModel.findById(collectionID).lean().exec();
}

export async function updateRecipeCollection(
	id: string,
	title: string,
	desc: string,
	image: string
) {
	return RecipeCollectionModel.updateOne(
		{ _id: id },
		{ title, desc, image, updatedAt: new Date() }
	);
}

export async function getRecipeCollectionOfUser(
	userID: MongoID
): Promise<IRecipeCollection[]> {
	return await RecipeCollectionModel.find({ author: userID }).lean().exec();
}

export async function insertRecipeCollection(
	userID: string | Types.ObjectId,
	title: string,
	desc: string,
	image: string
) {
	return new RecipeCollectionModel({
		title,
		desc,
		image,
		author: userID,
	}).save();
}

export async function getAllRecipeCollections() {
	return await RecipeCollectionModel.find().lean().exec();
}
