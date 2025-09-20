import { Hono } from "hono";
import authguard from "@/middlewares/authguard";

const authenticationRouter = new Hono()

	.get("/login", (c) => c.text("hi"))

	.post("/login", (c) => c.text("hi"))

	.get("/register", (c) => c.text("hi"))

	.post("/register", (c) => c.text("hi"))

	// Authguard
	.use(authguard)

	.get("/logout", (c) => c.text("hi"))

	.get("/force-logout", (c) => c.text("hi"));

export default authenticationRouter;
