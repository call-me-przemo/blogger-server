import type { DatabaseSchemasType } from "@/database";
import { Hono } from "hono";
import { PostsDatabaseService } from "./services";
import { PostsController } from "./controller";
import { getAllPosts, getOnePost } from "./schemas";

export function createPostsRoutes(db: DatabaseSchemasType) {
  const router = new Hono();
  const dbService = new PostsDatabaseService(db);
  const postsController = new PostsController(dbService);

  router.get(
    "/",
    getAllPosts,
    postsController.getAllPostsList.bind(postsController),
  );

  router.get(
    "/:id",
    getOnePost,
    postsController.getOnePost.bind(postsController),
  );

  return router;
}
