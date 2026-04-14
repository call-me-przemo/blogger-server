import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { postsTable } from "./posts";
import { usersTable } from "./users";

export const commentsTable = pgTable("comments", {
  id: uuid().defaultRandom().primaryKey(),
  postId: uuid()
    .references(() => postsTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid()
    .references(() => usersTable.id)
    .notNull(),
  content: varchar().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
