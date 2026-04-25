import { UsersDatabaseService } from "./services";
import { UsersController } from "./controller";
import { Hono } from "hono";
import * as schemas from "@/database/schemas";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

export function createUsersRoutes(db: NodePgDatabase<typeof schemas>) {
  const router = new Hono();
  const dbService = new UsersDatabaseService(db);
  const usersController = new UsersController(dbService);

  router.get("/", usersController.getAllUsersList.bind(usersController));

  return router;
}
