import { pgTable, uuid } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: uuid(),
});
