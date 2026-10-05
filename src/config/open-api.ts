import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import { openAPIRouteHandler } from "hono-openapi";
import type { BlankEnv, BlankSchema } from "hono/types";

export function createOpenApiRoutes(app: Hono<BlankEnv, BlankSchema, "/">) {
  const router = new Hono();

  router.get(
    "/schema",
    openAPIRouteHandler(app, {
      documentation: {
        info: {
          title: "Blogger REST API",
          version: "1.0.0",
          description: "REST API for managing simple blogging system",
        },
        tags: [{ name: "Users" }, { name: "Posts" }],
        servers: [
          { url: "http://localhost:3000", description: "Local Server" },
        ],
      },
    }),
  );

  router.get("/ui", swaggerUI({ url: "schema" }));

  return router;
}
