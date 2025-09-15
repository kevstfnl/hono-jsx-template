export type OgType =
	| "website"
	| "article"
	| "profile"
	| "book"
	| "music.song"
	| "music.album"
	| "video.movie"
	| "video.episode";

export interface SEO {
	title?: string;
	description?: string;
	keywords?: string[];
	canonicalUrl?: string;
	robots?: {
		index?: boolean;
		follow?: boolean;
		noarchive?: boolean;
		nosnippet?: boolean;
		noimageindex?: boolean;
		notranslate?: boolean;
		maxSnippet?: number;
		maxImagePreview?: "none" | "standard" | "large";
		maxVideoPreview?: number;
	};

	/* Open Graph */
	openGraph?: {
		type?: OgType;
		url?: string;
		siteName?: string;
		title?: string;
		description?: string;
		locale?: string;
		images?: Array<{
			url: string;
			width?: number;
			height?: number;
			alt?: string;
			type?: string;
		}>;
		publishedTime?: string;
		modifiedTime?: string;
		authors?: string[];
	};

	/* Twitter */
	twitter?: {
		card?: "summary" | "summary_large_image" | "app" | "player";
		site?: string;
		creator?: string;
		title?: string;
		description?: string;
		image?: string;
	};

	alternates?: {
		canonical?: string;
		languages?: Record<string, string>;
		media?: Record<string, string>;
	};

	jsonLd?: Array<Record<string, unknown>> | Record<string, unknown>;

	meta?: Array<{
		name?: string;
		property?: string;
		content: string;
	}>;

	links?: Array<{
		rel: string;
		href: string;
		hrefLang?: string;
		type?: string;
		sizes?: string;
	}>;

	icons?: {
		icon?:
			| string
			| Array<string | { url: string; type?: string; sizes?: string }>;
		shortcut?: string;
		apple?: string | Array<string | { url: string; sizes?: string }>;
		maskIcon?: { url: string; color?: string };
	};
}
