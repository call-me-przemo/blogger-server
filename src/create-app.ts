import { Hono } from "hono";
import { createUsersRoutes, createPostsRoutes } from "@/modules";
import { type DatabaseSchemasType } from "@/database";

export async function createApp(db: DatabaseSchemasType, appEnv: string) {
  const app = new Hono();

  if (appEnv === "development") {
    const { logger } = await import("hono/logger");
    const { createOpenApiRoutes } = await import("@/config");

    app.use(logger());
    app.route("/openapi", createOpenApiRoutes(app));
  }

  app.route("/users", createUsersRoutes(db));
  app.route("/posts", createPostsRoutes(db));

  return app;
}
