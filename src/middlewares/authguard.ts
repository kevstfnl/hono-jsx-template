import { createMiddleware } from "hono/factory";

const authguard = createMiddleware(async (c, next) => {
	await next();
});

export default authguard;
