import type { DatabaseSchemasType } from "@/database";
import { Hono } from "hono";
import { PostsDatabaseService } from "./services";
import { PostsController } from "./controller";
import { postsSelectSchema } from "./schemas";

export function createPostsRoutes(db: DatabaseSchemasType) {
  const router = new Hono();
  const dbService = new PostsDatabaseService(db);
  const postsController = new PostsController(dbService);

  router.get(
    "/",
    postsSelectSchema,
    postsController.getAllPostsList.bind(postsController),
  );

  return router;
}
