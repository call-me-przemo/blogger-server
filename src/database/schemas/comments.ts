import { dbSchema } from "../create-db";
import { postsTable } from "./posts";
import { usersTable } from "./users";

export const commentsTable = dbSchema.table("comments", (t) => ({
  id: t.uuid().defaultRandom().primaryKey(),
  postId: t
    .uuid()
    .references(() => postsTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: t
    .uuid()
    .references(() => usersTable.id)
    .notNull(),
  content: t.varchar().notNull(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));
