import type { Context } from "hono";
import type { PostsDatabaseService } from "./services";

export class PostsController {
  constructor(private readonly dbService: PostsDatabaseService) {}

  async getAllPostsList(ctx: Context) {
    const posts = await this.dbService.getAllPosts();

    return ctx.json(posts);
  }

  async getOnePost(ctx: Context) {
    const post = await this.dbService.getOnePost(ctx.req.param("id")!);

    return ctx.json(post);
  }
}
