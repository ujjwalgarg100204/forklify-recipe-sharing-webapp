/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{html,ts,ejs}"],
	theme: {
		extend: {
			fontFamily: {
				"small-heading": ["Montserrat", "sans-serif"],
				body: ["Raleway", "sans-serif"],
				heading: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [
		require("prettier-plugin-tailwindcss"),
		require("tailwindcss-elevation"),
	],
};
4;
