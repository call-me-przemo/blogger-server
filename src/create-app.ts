import { Hono } from "hono";
import { createUsersRoutes } from "@/modules";
import { type DatabaseSchemasType } from "@/database";

export async function createApp(db: DatabaseSchemasType, appEnv: string) {
  const app = new Hono();

  if (appEnv === "development") {
    const { logger } = await import("hono/logger");
    const { createOpenApiRoutes } = await import("@/config");

    app.use(logger());
    app.route("/openapi", createOpenApiRoutes());
  }

  app.route("/users", createUsersRoutes(db));

  return app;
}
