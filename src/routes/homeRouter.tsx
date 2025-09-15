import { Hono } from "hono";

import { HomePage } from "../../templates/pages/home/HomePage";

const homeRouter = new Hono().get("", (c) => c.html(<HomePage title="Home" />));

export default homeRouter;
