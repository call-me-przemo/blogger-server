import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import { openAPIRouteHandler } from "hono-openapi";

export function createOpenApiRoutes() {
  const router = new Hono();

  router.get(
    "/schema",
    openAPIRouteHandler(router, {
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

  router.get("/ui", swaggerUI({ url: "schema" }));

  return router;
}
