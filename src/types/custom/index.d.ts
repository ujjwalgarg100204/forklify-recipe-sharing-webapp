import GitHubProfile from "./github-profile";
import { Types } from "mongoose";
import { HowItWorksType, ProfileCard, RecipeCard } from "./frontend-types";

type MongoID = string | Types.ObjectId;

export {
	GitHubProfile,
	MongoID,
	RecipeCard,
	ProfileCard,
	HowItWorksType,
	CategoriesIcon,
};
