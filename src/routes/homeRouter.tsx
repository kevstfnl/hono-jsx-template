import { HomePage } from "@pages/home/HomePage";
import { Hono } from "hono";

const homeRouter = new Hono().get("", (c) => c.html(<HomePage title="Home" />));

export default homeRouter;
