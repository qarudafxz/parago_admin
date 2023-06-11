import million from "million/compiler";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [million.vite({ mode: "preact" }), react(), svgr()],
	resolve: {
		alias: {
			"react-router-dom": path.resolve("./node_modules/react-router-dom"),
		},
	},
});
