import { Hono } from "hono";
import { logger } from "hono/logger";
import { readEnvs } from "@/config";
import { HTTPException } from "hono/http-exception";
import { createDb } from "@/database";
import { createUsersRoutes } from "@/modules";
import { openAPIRouteHandler } from "hono-openapi";
import { Scalar } from "@scalar/hono-api-reference";

export async function createApp() {
  const envs = readEnvs();
  const app = new Hono();
  const db = await createDb(
    {
      port: envs.DATABASE_PORT,
      host: envs.DATABASE_HOST,
      user: envs.DATABASE_USER,
      database: envs.DATABASE_SCHEMA,
      password: envs.DATABASE_PASSWORD,
    },
    envs.APP_ENV === "development",
  );

  if (envs.APP_ENV === "development") {
    app.use(logger());
    app.get(
      "/openapi",
      openAPIRouteHandler(app, {
        documentation: {
          info: {
            title: "Blogger REST API",
            version: "1.0.0",
            description: "REST API for managing simple blogging system",
          },
          servers: [
            { url: "http://localhost:3000", description: "Local Server" },
          ],
        },
      }),
    );
    app.get("/scalar", Scalar({ url: "/openapi" }));
  }

  app
    .route("/users", createUsersRoutes(db))
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
      // TODO: replace console with fully fledged logger
      console.error(err);

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

  return { app, port: envs.APP_PORT };
}
