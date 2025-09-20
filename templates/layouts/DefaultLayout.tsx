import { Footer } from "@partials/Footer";
import { Header } from "@partials/Header";
import type { FC } from "hono/jsx";


console.log("DefaultLayout");

export const DefaultLayout: FC = ({ children }) => (
	<body>
		<Header />
		{children}
		<Footer />
	</body>
);
