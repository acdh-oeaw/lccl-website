import { join } from "node:path/posix";

import { assert } from "@acdh-oeaw/lib";
import type { ImageMetadata } from "astro";

const images = import.meta.glob<{ default: ImageMetadata }>(
	"/public/assets/**/*.{avif,bmp,gif,jpeg,jpg,png,svg,webp}",
);

export function getImageImport(path: string): Promise<{ default: ImageMetadata }> {
	const publicPath = join("/public", decodeURIComponent(path));
	const image = images[publicPath];
	assert(image, `Missing image "${publicPath}".`);

	return image();
}
