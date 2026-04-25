import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { readEnvs } from "@/config";
import { HTTPException } from "hono/http-exception";

export function runApp() {
  const envs = readEnvs();
  const app = new Hono();

  if (envs.APP_ENV === "development") {
    app.use(logger());
  }

  app
    .notFound((ctx) => {
      const httpCode = 404;

      return ctx.json(
        {
          code: httpCode,
          status: "Not found",
        },
        httpCode,
      );
    })
    .onError((err, ctx) => {
      if (err instanceof HTTPException) {
        return err.getResponse();
      }

      const httpCode = 500;

      return ctx.json(
        {
          code: httpCode,
          status: "Internal server error",
        },
        httpCode,
      );
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
