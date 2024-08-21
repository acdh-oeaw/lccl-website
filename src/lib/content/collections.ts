import { collection, fields } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { createCollection } from "@/lib/content/create-collection";
import { createComponents, headingLevels } from "@/lib/content/create-components";
import { createCollectionPaths } from "@/lib/content/create-paths";
// import { createPreviewUrl } from "@/lib/content/create-preview-url";

export const events = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/events/", locale);

	return collection({
		label: "Events",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/events/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			image: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const pages = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/pages/", locale);

	return collection({
		label: "Pages",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			image: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const partners = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/partners/", locale);

	return collection({
		label: "Partners",
		path: contentPath,
		slugField: "name",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/partners/{slug}"),
		entryLayout: "form",
		columns: ["name"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			logo: fields.image({
				label: "Logo",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			location: fields.text({
				label: "Location",
				// validation: { isRequired: false },
			}),
			website: fields.url({
				label: "Website",
				// validation: { isRequired: false },
			}),
			lead: fields.object(
				{
					name: fields.text({
						label: "Name",
						validation: { isRequired: true },
					}),
					image: fields.image({
						label: "Image",
						// validation: { isRequired: false },
						...createAssetPaths(assetPath),
					}),
					website: fields.url({
						label: "Website",
						// validation: { isRequired: false },
					}),
				},
				{
					label: "Lead",
				},
			),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const people = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/people/", locale);

	return collection({
		label: "People",
		path: contentPath,
		slugField: "name",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/people/{slug}"),
		entryLayout: "form",
		columns: ["name"],
		schema: {
			name: fields.slug({
				name: {
					label: "Name",
					validation: { isRequired: true },
				},
			}),
			image: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			role: fields.text({
				label: "Role",
				// validation: { isRequired: false },
			}),
			lead: fields.checkbox({
				label: "Lead",
				defaultValue: false,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const projects = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/projects/", locale);

	return collection({
		label: "Projects",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/projects/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			image: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const publicLectures = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/public-lectures/", locale);

	return collection({
		label: "Public lectures",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/public-lectures/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			image: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});

export const seminars = createCollection((locale) => {
	const { assetPath, contentPath } = createCollectionPaths("/seminars/", locale);

	return collection({
		label: "Seminars",
		path: contentPath,
		slugField: "title",
		format: { contentField: "content" },
		// previewUrl: createPreviewUrl("/seminars/{slug}"),
		entryLayout: "content",
		columns: ["title"],
		schema: {
			title: fields.slug({
				name: {
					label: "Title",
					validation: { isRequired: true },
				},
			}),
			publicationDate: fields.date({
				label: "Publication date",
				validation: { isRequired: true },
				defaultValue: { kind: "today" },
			}),
			image: fields.image({
				label: "Image",
				// validation: { isRequired: false },
				...createAssetPaths(assetPath),
			}),
			summary: fields.text({
				label: "Summary",
				validation: { isRequired: true },
				multiline: true,
			}),
			content: fields.mdx({
				label: "Content",
				options: {
					heading: headingLevels,
					image: createAssetPaths(assetPath),
				},
				components: createComponents(assetPath, locale),
			}),
		},
	});
});
