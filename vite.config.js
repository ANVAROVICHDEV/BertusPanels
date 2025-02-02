import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	proxy: {
		"/api": {
			target: "https://iteachpython.uz", // Asl server URL
			changeOrigin: true,
			rewrite: (path) => path.replace(/^\/api/, ""), // "/api" ni olib tashlaydi
		},
	},
});
