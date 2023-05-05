/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xxxs: "285px",
				xxs: "320px",
			},
			colors: {
				primary: "0043DC",
				secondary: "FF7900",
			},
			backgroundColor: {
				primary: "0043DC",
				secondary: "FF7900",
			},
			fontFamily: {
				primary: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [],
};
