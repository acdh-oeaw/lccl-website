import { config } from "@keystatic/core";

import { env } from "@/config/env.config";
import { defaultLocale } from "@/config/i18n.config";
import {
	events,
	pages,
	partners,
	people,
	projects,
	publicLectures,
	seminars,
} from "@/lib/content/collections";
import { indexPage, metadata, navigation } from "@/lib/content/singletons";

export default config({
	collections: {
		events: events(defaultLocale),
		pages: pages(defaultLocale),
		people: people(defaultLocale),
		partners: partners(defaultLocale),
		projects: projects(defaultLocale),
		publicLectures: publicLectures(defaultLocale),
		seminars: seminars(defaultLocale),
	},
	singletons: {
		indexPage: indexPage(defaultLocale),
		metadata: metadata(defaultLocale),
		navigation: navigation(defaultLocale),
	},
	storage:
		env.PUBLIC_KEYSTATIC_MODE === "github" &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER &&
		env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME
			? {
					kind: "github",
					repo: {
						owner: env.PUBLIC_KEYSTATIC_GITHUB_REPO_OWNER,
						name: env.PUBLIC_KEYSTATIC_GITHUB_REPO_NAME,
					},
					branchPrefix: "content/",
				}
			: {
					kind: "local",
				},
	ui: {
		brand: {
			name: "LCCL",
		},
		navigation: {
			data: ["events", "people", "partners", "projects", "publicLectures", "seminars"],
			pages: ["indexPage", "pages"],
			settings: ["metadata", "navigation"],
		},
	},
});
