import type { CookieOptions } from "hono/utils/cookie";

export function getCookieOption(maxAge: number): CookieOptions {
	const expires = new Date(Date.now() + maxAge * 1000);

	return {
		secure: process.env.ENVIRONNEMENT === "production",
		path: "/",
		httpOnly: true,
		domain: "localhost",
		sameSite: "strict",
		priority: "High",
		prefix: "secure",
		maxAge,
		expires,
	};
}
