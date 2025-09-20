import { DefaultLayout } from "@layouts/DefaultLayout";
import { HTML } from "@layouts/HTML";
import type { FC } from "hono/jsx";
import type { SEO } from "@/types/seo";

console.log("HomePage");

const seo: SEO = {
	title: "Accueil",
	description: "Welcome",
	keywords: [],
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
	<HTML seo={seo}>
		<DefaultLayout>
			<main>
				<h1>{title}</h1>
				<p>Hello world</p>
			</main>
		</DefaultLayout>
	</HTML>
);
