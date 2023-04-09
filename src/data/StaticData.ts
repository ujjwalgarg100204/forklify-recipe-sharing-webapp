import { CategoriesIcons, HowItWorksType, ProfileCard } from "../types/custom";
import { RecipeCategories } from "../models/Recipe";
import { FilterListItem } from "../types/custom";

export const developersProfiles: ProfileCard[] = [
	{
		name: "Ujjwal Garg",
		desc: "Just some developer, who wants to do some good",
		designation: "Main Developer",
		imagePath: "/images/devs/ujjwal.png",
		socials: {
			github: "https://github.com/ujjwalgarg100204",
			instagram: "https://instagram.com/ujjwalgarg100204",
			linkedin: "https://www.linkedin.com/in/ujjwal-garg-3a5639243",
		},
	},
	{
		name: "Harsh Aggrawal",
		desc: "Just some developer, who wants to do some good",
		designation: "Developer",
		imagePath: "/images/devs/harsh.jpg",
		socials: {
			github: "https://github.com/Harsh-agrawal369",
			instagram:
				"https://instagram.com/harsh_agrawal27?igshid=ZDdkNTZiNTM=",
			linkedin: "https://www.linkedin.com/in/harsh-agrawal-a00968225",
		},
	},
	{
		name: "Naman Rath",
		desc: "Just some developer, who wants to do some good",
		designation: "Developer",
		imagePath: "/images/devs/naman.jpeg",
		socials: {
			github: "https://github.com/namanrath007",
			instagram: "https://instagram.com/naman_rath07?igshid=ZDdkNTZiNTM=",
			linkedin: "https://www.linkedin.com/in/naman-rath-260a32247/",
		},
	},
];
/*export const developersProfiles: ProfileCard[] = [
	{
		name: "Sajal Garg",
		desc: "Just some developer, who wants to do some good",
		designation: "Full Stack Developer",
		imagePath: "/images/devs/Sajal.jpg",
		socials: {
			github: "https://github.com/",
			instagram: "https://instagram.com/sg_sajal?igshid=ZDdkNTZiNTM=",
			linkedin: "https://www.linkedin.com/in/",
		},
	},
	{
		name: "Priyanshi Shah",
		desc: "Just a developer who wants to change the world for good",
		designation: "Front-End Developer",
		imagePath: "/images/devs/Priyanshi.jpg",
		socials: {
			github: "https://github.com/Priyanshi2003-gen",
			instagram: "https://instagram.com/pranshi_27?igshid=ZDdkNTZiNTM=",
			linkedin: "https://www.linkedin.com/in/priyanshi-shah-2556aa236",
		},
	},
	{
		name: "Kalluri Manyu Srenitha",
		desc: "A determined developer who wants to learn new things",
		designation: "Database Administrator",
		imagePath: "/images/devs/Kalluri.jpeg",
		socials: {
			github: "https://github.com/kallurisrenitha",
			instagram: "https://www.instagram.com/kallurisrenithaa/",
			linkedin:
				"https://www.linkedin.com/in/kalluri-manyu-srenitha-1b8912219/",
		},
	},
];*/

export const howItWorksData: HowItWorksType[] = [
	{
		title: "Open your fridge!",
		text: "Open your fridge and take a look inside. Do you see some eggs, a few vegetables, and some leftovers? You may not realize it, but you have all the ingredients you need to make a delicious and healthy meal. But how do you turn those ingredients into a delicious dish? That's where Forklify comes in.",
	},
	{
		title: "Choose a recipe",
		text: "With so many delicious options to choose from, we understand that it can be overwhelming to decide what to cook for your next meal. That's why we've made it easier for you to choose a recipe that suits your taste buds and dietary preferences.",
	},
	{
		title: "Enjoy your dish",
		text: "Congratulations, you've successfully prepared a delicious meal from the recipes on Forklify! Now it's time to sit back, relax, and savor your creation. At Forklify, we believe that cooking is not just about nourishing your body but also about bringing joy and satisfaction to your soul.",
	},
];

export const categoriesIcons: CategoriesIcons[] = [
	{ svg: "BreadSlice", category: RecipeCategories.breakfast },
	{ svg: "DrumstickBite", category: RecipeCategories.lunch },
	{ svg: "BowlRice", category: RecipeCategories.dinner },
	{ svg: "Cake", category: RecipeCategories.dessert },
	{ svg: "Coffee", category: RecipeCategories.drink },
	{ svg: "BowlRice", category: RecipeCategories.brunch },
	{ svg: "Burger", category: RecipeCategories.snack },
	{ svg: "Shrimp", category: RecipeCategories.appetizer },
];

export const filterList: FilterListItem[] = [
	{
		title: "time",
		filters: ["under 15 min", "under 30 min", "under 60 min"],
	},
	{
		title: "dish type",
		filters: [
			"breakfast",
			"brunch",
			"snack",
			"appetizers",
			"lunch",
			"drinks",
			"dessert",
			"dinner",
		],
	},
	{
		title: "diet",
		filters: [
			"vegans",
			"glutenfree",
			"sugarfree",
			"macrobiotics",
			"lactosfree",
		],
	},
	{
		title: "regions",
		filters: [
			"japanese",
			"chinese",
			"vietnamese",
			"russian",
			"korean",
			"indian",
			"indonesian",
			"pakistan",
			"turkish",
		],
	},
];
