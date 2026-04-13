import { pgTable, uuid } from "drizzle-orm/pg-core";

export const commentsTable = pgTable("comments", {
  id: uuid(),
});
