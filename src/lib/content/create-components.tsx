import { createUrl, pick } from "@acdh-oeaw/lib";
import { fields, NotEditable } from "@keystatic/core";
import {
	type ContentComponent,
	inline,
	mark,
	repeating,
	wrapper,
} from "@keystatic/core/content-components";
import {
	BookTextIcon,
	DownloadIcon,
	GridIcon,
	HeadingIcon,
	ImageIcon,
	SuperscriptIcon,
	VideoIcon,
} from "lucide-react";

import type { Locale } from "@/config/i18n.config";
import { createAssetPaths } from "@/lib/content/create-asset-paths";
import { useObjectUrl } from "@/lib/content/use-object-url";

export const figureAlignments = [
	{ label: "Center", value: "center" },
	{ label: "Stretch", value: "stretch" },
] as const;

const gridVariants = [
	{ label: "Two columns", value: "two-columns" },
	{ label: "Three columns", value: "three-columns" },
	{ label: "Four columns", value: "four-columns" },
	{ label: "Two columns, right is 2x as wide", value: "one-two-columns" },
	{ label: "Two columns, right is 3x as wide", value: "one-three-columns" },
	{ label: "Two columns, right is 4x as wide", value: "one-four-columns" },
] as const;

const videoProviders = [{ label: "YouTube", value: "youtube" }] as const;

const components = {
	DownloadLink(assetPath) {
		return mark({
			label: "Download link",
			icon: <DownloadIcon />,
			tag: "a",
			className: "underline decoration-dotted",
			schema: {
				href: fields.file({
					label: "File",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
			},
		});
	},
	Figure(assetPath) {
		return wrapper({
			label: "Figure",
			description: "An image with caption.",
			icon: <ImageIcon />,
			schema: {
				src: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
				alt: fields.text({
					label: "Image description for screen readers",
					// validation: { isRequired: false },
				}),
				alignment: fields.select({
					label: "Alignment",
					options: figureAlignments,
					defaultValue: "stretch",
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				const contentType = value.src?.extension === "svg" ? "image/svg+xml" : undefined;
				const src = useObjectUrl(value.src?.data ?? null, contentType);

				if (src == null) {
					return null;
				}

				return (
					<figure>
						<NotEditable>
							<img alt={value.alt} src={src} />
						</NotEditable>
						{children ? <figcaption>{children}</figcaption> : null}
					</figure>
				);
			},
		});
	},
	Footnote() {
		return mark({
			label: "Footnote",
			icon: <SuperscriptIcon />,
			className: "underline decoration-dotted align-super text-sm",
			schema: {},
		});
	},
	Grid() {
		return repeating({
			label: "Grid",
			description: "A grid layout.",
			icon: <GridIcon />,
			children: ["GridItem"],
			schema: {
				variant: fields.select({
					label: "Variant",
					options: gridVariants,
					defaultValue: "two-columns",
				}),
			},
		});
	},
	GridItem() {
		return wrapper({
			label: "Grid item",
			description: "A grid cell.",
			icon: <GridIcon />,
			forSpecificLocations: true,
			schema: {},
		});
	},
	HeadingId() {
		return inline({
			label: "Heading ID",
			description: "A custom heading id as a link target.",
			icon: <HeadingIcon />,
			schema: {
				id: fields.text({
					label: "Identifier",
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				const { value } = props;

				return (
					<NotEditable>
						<span className="opacity-50">#{value.id}</span>
					</NotEditable>
				);
			},
		});
	},
	InternalLink(_assetPath, _locale) {
		return mark({
			label: "Internal link",
			icon: <BookTextIcon />,
			tag: "a",
			schema: {
				item: fields.conditional(
					fields.select({
						label: "Collection",
						options: [
							{ label: "Events", value: "events" },
							{ label: "Pages", value: "pages" },
							{ label: "People", value: "people" },
							{ label: "Partners", value: "partners" },
							{ label: "Projects", value: "projects" },
							{ label: "Public lectures", value: "publicLectures" },
							{ label: "Seminars", value: "seminars" },
						],
						defaultValue: "pages",
					}),
					{
						events: fields.relationship({
							label: "Event",
							collection: "events",
							validation: { isRequired: true },
						}),
						pages: fields.relationship({
							label: "Page",
							collection: "pages",
							validation: { isRequired: true },
						}),
						partners: fields.relationship({
							label: "Partner",
							collection: "partners",
							validation: { isRequired: true },
						}),
						people: fields.relationship({
							label: "People",
							collection: "people",
							validation: { isRequired: true },
						}),
						projects: fields.relationship({
							label: "Projects",
							collection: "projects",
							validation: { isRequired: true },
						}),
						publicLectures: fields.relationship({
							label: "Public lectures",
							collection: "publicLectures",
							validation: { isRequired: true },
						}),
						seminars: fields.relationship({
							label: "Seminars",
							collection: "seminars",
							validation: { isRequired: true },
						}),
					},
				),
			},
		});
	},
	Speaker(assetPath) {
		return wrapper({
			label: "Speaker",
			description: "A speaker bio with image.",
			icon: <ImageIcon />,
			schema: {
				image: fields.image({
					label: "Image",
					...createAssetPaths(assetPath),
					validation: { isRequired: true },
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				const contentType = value.image?.extension === "svg" ? "image/svg+xml" : undefined;
				const src = useObjectUrl(value.image?.data ?? null, contentType);

				return (
					<div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 32 }}>
						{src ? <img alt="" src={src} /> : null}
						{children}
					</div>
				);
			},
		});
	},
	Video() {
		return wrapper({
			label: "Video",
			description: "A YouTube video.",
			icon: <VideoIcon />,
			schema: {
				provider: fields.select({
					label: "Provider",
					options: videoProviders,
					defaultValue: "youtube",
				}),
				id: fields.text({
					label: "Video identifier",
					validation: { isRequired: true },
				}),
				startTime: fields.number({
					label: "Start time",
					// validation: { isRequired: false },
				}),
			},
			ContentView(props) {
				const { children, value } = props;

				const href = String(
					createUrl({
						baseUrl: "https://www.youtube-nocookie.com",
						pathname: `/embed/${value.id}`,
					}),
				);

				return (
					<figure>
						<NotEditable>
							<iframe allowFullScreen={true} src={href} title="Video" />
						</NotEditable>
						{children ? <figcaption>{children}</figcaption> : null}
					</figure>
				);
			},
		});
	},
} satisfies Record<string, (assetPath: `/${string}/`, locale: Locale) => ContentComponent>;

export function createComponents(
	assetPath: `/${string}/`,
	locale: Locale,
	include?: Array<keyof typeof components>,
) {
	const _components = include ? pick(components, include) : components;

	return Object.fromEntries(
		Object.entries(_components).map(([key, value]) => {
			return [key, value(assetPath, locale)];
		}),
	);
}

export const headingLevels = [2, 3, 4, 5] as const;
