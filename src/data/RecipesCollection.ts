import RecipeCollectionModel, {
	IRecipeCollection,
} from "../models/RecipeCollection";
import { getUserData } from "./User";

import { MongoID } from "../types/custom";

export async function getRecipeCollection(
	collectionID: MongoID
): Promise<IRecipeCollection | null> {
	return await RecipeCollectionModel.findById(collectionID).exec();
}

export async function getRecipeCollectionOfUser(
	userID: MongoID
): Promise<IRecipeCollection[] | null> {
	const foundUser = await getUserData(userID);
	// if user doesn't exist then return null
	if (!foundUser) return null;

	if (foundUser.recipeCollections.length === 0) return [];

	return await Promise.all(
		foundUser.recipeCollections.map(
			async recipeCollection =>
				(await getRecipeCollection(
					recipeCollection
				)) as IRecipeCollection
		)
	);
}
