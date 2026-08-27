import { UsersDatabaseService } from "./services";
import { UsersController } from "./controller";
import { Hono } from "hono";
import * as schemas from "@/database/schemas";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { describeRoute, resolver } from "hono-openapi";
import { usersSelectSchema } from "./schemas";

export function createUsersRoutes(db: NodePgDatabase<typeof schemas>) {
  const router = new Hono();
  const dbService = new UsersDatabaseService(db);
  const usersController = new UsersController(dbService);

  router.get(
    "/",
    describeRoute({
      description: "Returns list of all users",
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": { schema: resolver(usersSelectSchema) },
          },
        },
      },
    }),
    usersController.getAllUsersList.bind(usersController),
  );

  return router;
}
