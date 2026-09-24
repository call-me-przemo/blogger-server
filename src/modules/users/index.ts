import { UsersDatabaseService } from "./services";
import { UsersController } from "./controller";
import { Hono } from "hono";
import { usersSelectSchema } from "./schemas";
import { type DatabaseSchemasType } from "@/database";

export function createUsersRoutes(db: DatabaseSchemasType) {
  const router = new Hono();
  const dbService = new UsersDatabaseService(db);
  const usersController = new UsersController(dbService);

  router.get(
    "/",
    usersSelectSchema,
    usersController.getAllUsersList.bind(usersController),
  );

  return router;
}
