/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xxxs: "285px",
				xxs: "320px",
				md: "1020px",
				lg: "1440px",
			},
			colors: {
				primary: "#0043DC",
				secondary: "#FF7900",
			},
			textColor: {
				secondary: "#FF7900",
				gray: "#656565",
			},
			fontFamily: {
				primary: ["Poppins", "sans-serif"],
			},
			maxHeight: {
				events: "560px",
			},
		},
	},
	plugins: [],
};
