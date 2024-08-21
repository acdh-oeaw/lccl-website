import { fields, singleton } from "@keystatic/core";

import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { headingLevels } from "@/lib/content/create-components";
import { createSingletonPaths } from "@/lib/content/create-paths";
// import { createPreviewUrl } from "@/lib/content/create-preview-url";
import { createSingleton } from "@/lib/content/create-singleton";

export const indexPage = createSingleton((locale) => {
	const { assetPath, contentPath } = createSingletonPaths("/index-page/", locale);

	return singleton({
		label: "Home page",
		path: contentPath,
		format: { data: "json" },
		// previewUrl: createPreviewUrl("/"),
		entryLayout: "form",
		schema: {
			hero: fields.object(
				{
					title: fields.text({
						label: "Title",
						validation: { isRequired: true },
					}),
					image: fields.image({
						label: "Image",
						validation: { isRequired: true },
						...createAssetPaths(assetPath),
					}),
				},
				{
					label: "Hero section",
				},
			),
			main: fields.object(
				{
					sections: fields.blocks(
						{
							data: {
								label: "Data section",
								itemLabel(props) {
									return props.fields.title.value;
								},
								schema: fields.object({
									title: fields.text({
										label: "Title",
										validation: { isRequired: true },
									}),
									collections: fields.multiselect({
										label: "Collection",
										options: [{ label: "Events", value: "events" }],
										defaultValue: ["events"],
									}),
									count: fields.number({
										label: "Count",
										validation: { isRequired: true },
									}),
								}),
							},
							links: {
								label: "Links section",
								itemLabel(props) {
									return props.fields.title.value;
								},
								schema: fields.object({
									title: fields.text({
										label: "Title",
										validation: { isRequired: true },
									}),
									// variant: fields.select({
									// 	label: "Variant",
									// 	options: [
									// 		{ label: "Cards", value: "cards" },
									// 	],
									// 	defaultValue: "cards",
									// }),
									links: fields.blocks(
										{
											page: {
												label: "Page",
												itemLabel(props) {
													return props.fields.title.value;
												},
												schema: fields.object(
													{
														title: fields.text({
															label: "Title",
															validation: { isRequired: true },
														}),
														id: fields.relationship({
															label: "Page",
															validation: { isRequired: true },
															collection: "pages",
														}),
													},
													{
														label: "Page",
													},
												),
											},
										},
										{
											label: "Links",
										},
									),
								}),
							},
							text: {
								label: "Text section",
								itemLabel(props) {
									return props.fields.title.value;
								},
								schema: fields.object({
									title: fields.text({
										label: "Title",
										validation: { isRequired: true },
									}),
									content: fields.mdx({
										label: "Content",
										options: {
											heading: headingLevels,
											image: createAssetPaths(assetPath),
										},
										// components: createComponents(assetPath, locale),
									}),
								}),
							},
						},
						{
							label: "Sections",
						},
					),
				},
				{
					label: "Main content",
				},
			),
		},
	});
});

export const metadata = createSingleton((locale) => {
	const { contentPath } = createSingletonPaths("/metadata/", locale);

	return singleton({
		label: "Metadata",
		path: contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			title: fields.text({
				label: "Title",
				validation: { isRequired: true },
			}),
			description: fields.text({
				label: "Description",
				validation: { isRequired: true },
			}),
			manifest: fields.object(
				{
					name: fields.text({
						label: "Name",
						validation: { isRequired: true },
					}),
					"short-name": fields.text({
						label: "Short name",
						validation: { isRequired: true },
					}),
					description: fields.text({
						label: "Description",
						validation: { isRequired: true },
					}),
				},
				{
					label: "Webmanifest",
				},
			),
		},
	});
});

const links = {
	link: fields.object(
		{
			label: fields.text({
				label: "Label",
				validation: { isRequired: true },
			}),
			href: fields.url({
				label: "URL",
				validation: { isRequired: true },
			}),
		},
		{
			label: "Link",
		},
	),
	page: fields.object(
		{
			label: fields.text({
				label: "Label",
				validation: { isRequired: true },
			}),
			id: fields.relationship({
				label: "Page",
				validation: { isRequired: true },
				collection: "pages",
			}),
		},
		{
			label: "Page",
		},
	),
	separator: fields.empty(),
};

export const navigation = createSingleton((locale) => {
	const { contentPath } = createSingletonPaths("/navigation/", locale);

	return singleton({
		label: "Navigation",
		path: contentPath,
		format: { data: "json" },
		entryLayout: "form",
		schema: {
			links: fields.blocks(
				{
					link: {
						label: "Link",
						itemLabel(props) {
							return `${props.fields.label.value} (Link)`;
						},
						schema: links.link,
					},
					page: {
						label: "Page",
						itemLabel(props) {
							return `${props.fields.label.value} (Page)`;
						},
						schema: links.page,
					},
					separator: {
						label: "Separator",
						schema: links.separator,
					},
					menu: {
						label: "Menu",
						itemLabel(props) {
							return `${props.fields.label.value} (Menu)`;
						},
						schema: fields.object(
							{
								label: fields.text({
									label: "Label",
									validation: { isRequired: true },
								}),
								links: fields.blocks(
									{
										link: {
											label: "Link",
											itemLabel(props) {
												return props.fields.label.value;
											},
											schema: links.link,
										},
										page: {
											label: "Page",
											itemLabel(props) {
												return `${props.fields.label.value} (Page)`;
											},
											schema: links.page,
										},
										separator: {
											label: "Separator",
											schema: links.separator,
										},
									},
									{
										label: "Links",
										validation: { length: { min: 1 } },
									},
								),
							},
							{
								label: "Menu",
							},
						),
					},
				},
				{
					label: "Links",
					validation: { length: { min: 1 } },
				},
			),
		},
	});
});
