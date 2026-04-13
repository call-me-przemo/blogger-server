import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { readEnvs } from "./config";

export function runApp() {
  const envs = readEnvs();
  const app = new Hono();

  if (envs.APP_ENV === "development") {
    app.use(logger());
  }

  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  serve(
    {
      fetch: app.fetch,
      port: envs.APP_PORT,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    },
  );
}
