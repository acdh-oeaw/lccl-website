import { expect, test } from "~/e2e/lib/test";

test("serves a live health endpoint", async ({ request }) => {
	const response = await request.get("/api/health");
	expect(response.status()).toBe(200);
	expect(await response.text()).toBe("OK");
	expect(response.headers()["cache-control"]).toBe("no-store");
});

test("redirects administrators to the server-rendered CMS", async ({ request }) => {
	const redirect = await request.get("/admin", { maxRedirects: 0 });
	expect(redirect.status()).toBe(307);
	expect(redirect.headers().location).toBe("/keystatic");
	const cms = await request.get("/keystatic");
	expect(cms.status()).toBe(200);
	expect(await cms.text()).toContain("astro-island");
});

test("loads a responsive hero and the generated search index", async ({ page, request }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");
	const hero = page.locator('main img[fetchpriority="high"]');
	await expect(hero).toHaveAttribute("sizes", "100vw");
	await expect(hero).toHaveAttribute("srcset", /480w/);
	await expect
		.poll(() =>
			hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
		)
		.toBe(true);
	expect(await hero.evaluate((image: HTMLImageElement) => image.currentSrc)).toContain(".webp");
	const search = await request.get("/pagefind/pagefind.js");
	expect(search.status()).toBe(200);
});
