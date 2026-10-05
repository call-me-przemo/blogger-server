import type { DatabaseSchemasType } from "@/database";
import { postsTable, commentsTable } from "@/database";
import { eq } from "drizzle-orm";

export class PostsDatabaseService {
  constructor(private readonly db: DatabaseSchemasType) {}

  async getAllPosts() {
    return this.db
      .select()
      .from(postsTable)
      .leftJoin(commentsTable, eq(postsTable.id, commentsTable.postId));
  }
}
