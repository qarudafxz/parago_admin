/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			screens: {
				xxxs: "285px",
				xxs: "320px",
			},
		},
	},
	plugins: [],
};
