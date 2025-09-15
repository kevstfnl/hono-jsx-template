import type { FC } from "hono/jsx";
import { Footer } from "../partials/Footer";
import { Header } from "../partials/Header";

export const DefaultLayout: FC = ({ children }) => (
	<body>
		<Header />
		{children}
		<Footer />
	</body>
);
