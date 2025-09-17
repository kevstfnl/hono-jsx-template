import type { Child, FC } from "hono/jsx";
import type { SEO } from "@/types/seo";

interface HTMLProps {
	children: Child;
	seo?: SEO;
}

const buildRobots = (r?: SEO["robots"]) => {
	if (!r) return undefined;
	const parts = [
		r.index === false ? "noindex" : "index",
		r.follow === false ? "nofollow" : "follow",
		r.noarchive ? "noarchive" : null,
		r.nosnippet ? "nosnippet" : null,
		r.noimageindex ? "noimageindex" : null,
		r.notranslate ? "notranslate" : null,
		r.maxSnippet !== undefined ? `max-snippet:${r.maxSnippet}` : null,
		r.maxImagePreview ? `max-image-preview:${r.maxImagePreview}` : null,
		r.maxVideoPreview !== undefined
			? `max-video-preview:${r.maxVideoPreview}`
			: null,
	].filter(Boolean);
	return parts.join(", ");
};

export const HTML: FC<HTMLProps> = ({ children, seo }) => {
	const title = seo?.title ?? "Paprika";
	const robots = buildRobots(seo?.robots);

	const canonical = seo?.canonicalUrl ?? seo?.alternates?.canonical;

	const jsonLdArray = !seo?.jsonLd
		? []
		: Array.isArray(seo.jsonLd)
			? seo.jsonLd
			: [seo.jsonLd];

	return (
		<html lang="fr">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				{/* Title */}
				<title>{title}</title>

				{/* Description */}
				{seo?.description && (
					<meta name="description" content={seo.description} />
				)}

				{/* Keywords */}
				{seo?.keywords?.length && (
					<meta name="keywords" content={seo.keywords.join(", ")} />
				)}

				{/* Canonical */}
				{canonical && <link rel="canonical" href={canonical} />}

				{/* Robots */}
				{robots && <meta name="robots" content={robots} />}

				{/* Alternates */}
				{seo?.alternates?.languages &&
					Object.entries(seo.alternates.languages).map(([lang, href]) => (
						<link
							key={`alt-lang-${lang}`}
							rel="alternate"
							hrefLang={lang}
							href={href}
						/>
					))}
				{seo?.alternates?.media &&
					Object.entries(seo.alternates.media).map(([media, href]) => (
						<link
							key={`alt-media-${media}`}
							rel="alternate"
							media={media}
							href={href}
						/>
					))}

				{/* Open Graph */}
				{seo?.openGraph && (
					<>
						{seo.openGraph.title && (
							<meta property="og:title" content={seo.openGraph.title} />
						)}
						{seo.openGraph.description && (
							<meta
								property="og:description"
								content={seo.openGraph.description}
							/>
						)}
						{seo.openGraph.url && (
							<meta property="og:url" content={seo.openGraph.url} />
						)}
						{seo.openGraph.type && (
							<meta property="og:type" content={seo.openGraph.type} />
						)}
						{seo.openGraph.siteName && (
							<meta property="og:site_name" content={seo.openGraph.siteName} />
						)}
						{seo.openGraph.locale && (
							<meta property="og:locale" content={seo.openGraph.locale} />
						)}
						{seo.openGraph.publishedTime && (
							<meta
								property="article:published_time"
								content={seo.openGraph.publishedTime}
							/>
						)}
						{seo.openGraph.modifiedTime && (
							<meta
								property="article:modified_time"
								content={seo.openGraph.modifiedTime}
							/>
						)}
						{seo.openGraph.authors?.map((a) => (
							<meta property="article:author" content={a} />
						))}
						{seo.openGraph.images?.map((img) => (
							<>
								<meta property="og:image" content={img.url} />
								{img.alt && <meta property="og:image:alt" content={img.alt} />}
								{img.width && (
									<meta property="og:image:width" content={String(img.width)} />
								)}
								{img.height && (
									<meta
										property="og:image:height"
										content={String(img.height)}
									/>
								)}
								{img.type && (
									<meta property="og:image:type" content={img.type} />
								)}
							</>
						))}
					</>
				)}

				{/* Twitter */}
				{seo?.twitter && (
					<>
						{seo.twitter.card && (
							<meta name="twitter:card" content={seo.twitter.card} />
						)}
						{seo.twitter.site && (
							<meta name="twitter:site" content={seo.twitter.site} />
						)}
						{seo.twitter.creator && (
							<meta name="twitter:creator" content={seo.twitter.creator} />
						)}
						{seo.twitter.title && (
							<meta name="twitter:title" content={seo.twitter.title} />
						)}
						{seo.twitter.description && (
							<meta
								name="twitter:description"
								content={seo.twitter.description}
							/>
						)}
						{seo.twitter.image && (
							<meta name="twitter:image" content={seo.twitter.image} />
						)}
					</>
				)}

				{/* Icônes */}
				<IconLinks icons={seo?.icons} />


				{/* Meta & Links supplémentaires */}
				{seo?.meta?.map((m) => (
					<meta name={m.name} property={m.property} content={m.content} />
				))}
				{seo?.links?.map((l) => (
					<link
						rel={l.rel}
						href={l.href}
						hrefLang={l.hrefLang}
						type={l.type}
						sizes={l.sizes}
					/>
				))}

				{/* JSON-LD */}
				{jsonLdArray.map((obj) => (
					<script type="application/ld+json">{JSON.stringify(obj)}</script>
				))}
			</head>
			{children}
		</html>
	);
};

const IconLinks: FC<{ icons?: SEO["icons"] }> = ({ icons }) => {
	if (!icons) return null;
	const normalize = (
		v?: string | Array<string | { url: string; type?: string; sizes?: string }>,
	) =>
		(Array.isArray(v) ? v : v ? [v] : []) as Array<
			string | { url: string; type?: string; sizes?: string }
		>;

	const iconList = normalize(icons.icon);
	const appleList = normalize(icons.apple);

	return (
		<>
			{iconList.map((it) =>
				typeof it === "string" ? (
					<link rel="icon" href={it} />
				) : (
					<link rel="icon" href={it.url} type={it.type} sizes={it.sizes} />
				),
			)}
			{icons.shortcut && <link rel="shortcut icon" href={icons.shortcut} />}
			{appleList.map((it) =>
				typeof it === "string" ? (
					<link rel="apple-touch-icon" href={it} />
				) : (
					<link rel="apple-touch-icon" href={it.url} sizes={it.sizes} />
				),
			)}
			{icons.maskIcon && (
				<link
					rel="mask-icon"
					href={icons.maskIcon.url}
					color={icons.maskIcon.color}
				/>
			)}
		</>
	);
};
