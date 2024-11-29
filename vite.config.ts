import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	base: "/ScheduleForTheWeek/",
	server: {
		watch: {
			usePolling: true,
		},
	},
	resolve: {
		alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
	},
});
