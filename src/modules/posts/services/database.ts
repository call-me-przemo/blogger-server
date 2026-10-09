import type { DatabaseSchemasType } from "@/database";

export class PostsDatabaseService {
  constructor(private readonly db: DatabaseSchemasType) {}

  async getAllPosts() {
    return this.db.query.posts.findMany({
      columns: {
        id: true,
      },
    });
  }

  async getOnePost(id: string) {
    return this.db.query.posts.findFirst({
      where: { id },
      with: { comments: true },
    });
  }
}
