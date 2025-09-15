import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import { every } from "hono/combine";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { secureHeaders } from "hono/secure-headers";
import authenticationRouter from "./routes/authentificationRouter";
import homeRouter from "./routes/homeRouter";

const port = Number(process.env.PORT || 3000);
const maxRequestBodySize = 1024 * 20;
const origin = JSON.parse(process.env.DOMAINS || "localhost");

const app = new Hono({ router: new RegExpRouter() })
	.use(
		every(
			cors({ origin }),
			csrf({ origin }),
			secureHeaders(),
			bodyLimit({
				maxSize: maxRequestBodySize,
				onError: (c) => c.json({ message: "overflow" }, 413),
			}),
		),
	)
	.route("", homeRouter)
	.route("/auth", authenticationRouter);

export default {
	port,
	fetch: app.fetch,
	maxRequestBodySize,
};
