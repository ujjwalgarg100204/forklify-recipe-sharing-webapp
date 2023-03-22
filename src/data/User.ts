import UserModel, { IUser } from "../models/User";
import { MongoID } from "../types/custom";

export async function getUserData(userID: MongoID): Promise<IUser | null> {
	return await UserModel.findById(userID).exec();
}
