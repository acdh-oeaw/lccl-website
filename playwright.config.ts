import { defineConfig, devices } from "@playwright/test";
import { isInCi } from "is-in-ci";
import { loadEnv } from "vite";

Object.assign(process.env, loadEnv("test", process.cwd(), ""));

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
const baseUrl = `http://localhost:${String(port)}`;

export default defineConfig({
	testDir: "./e2e",
	snapshotDir: "./e2e/snapshots",
	fullyParallel: true,
	forbidOnly: isInCi,
	retries: isInCi ? 2 : 0,
	maxFailures: 10,
	workers: isInCi ? 1 : undefined,
	reporter: isInCi ? "github" : "html",
	use: {
		baseURL: baseUrl,
		trace: "on-first-retry",
	},
	projects: [
		{
			name: "setup",
			testMatch: "global.setup.ts",
		},
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
			dependencies: ["setup"],
		},
		// {
		// 	name: "firefox",
		// 	use: { ...devices["Desktop Firefox"] },
		// 	dependencies: ["setup"],
		// },
		// {
		// 	name: "webkit",
		// 	use: { ...devices["Desktop Safari"] },
		// 	dependencies: ["setup"],
		// },
		/** Test against mobile viewports. */
		// {
		// 	name: "Mobile Chrome",
		// 	use: { ...devices["Pixel 5"] },
		// 	dependencies: ["setup"],
		// },
		// {
		// 	name: "Mobile Safari",
		// 	use: { ...devices["iPhone 12"] },
		// 	dependencies: ["setup"],
		// },
		/** Test against branded browsers. */
		// {
		// 	name: "Microsoft Edge",
		// 	use: { ...devices["Desktop Edge"], channel: "msedge" },
		// 	dependencies: ["setup"],
		// },
		// {
		// 	name: "Google Chrome",
		// 	use: { ...devices["Desktop Chrome"], channel: "chrome" },
		// 	dependencies: ["setup"],
		// },
	],
	webServer: {
		command: "node ./dist/server/entry.mjs",
		env: { HOST: "127.0.0.1", PORT: String(port), NODE_ENV: "production" },
		url: baseUrl,
		reuseExistingServer: false,
	},
});
