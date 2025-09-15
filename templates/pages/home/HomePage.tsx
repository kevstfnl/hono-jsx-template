import type { FC } from "hono/jsx";
import type { SEO } from "../../../src/types/seo";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import { HTML } from "../../layouts/HTML";

const seo: SEO = {
	title: "Paprika | Accueil",
	description: "Bienvenue sur Paprika",
	keywords: ["paprika", "recettes", "cuisine", "épices"],
	canonicalUrl: "https://monsite.fr/",
	openGraph: {
		type: "website",
		siteName: "MonSite",
		url: "https://monsite.fr/",
		images: [{ url: "https://monsite.fr/og.jpg", alt: "MonSite" }],
	},
	twitter: { card: "summary_large_image", site: "@monsite" },
};

export const HomePage: FC = ({ title }) => (
	<HTML>
		<DefaultLayout>
			<main>
				<h1>{title}</h1>
				<p>Hello world</p>
			</main>
		</DefaultLayout>
	</HTML>
);
