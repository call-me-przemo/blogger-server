import { schemaName } from "../schema-name";
import { posts, users } from ".";

export const comments = schemaName.table("comments", (t) => ({
  id: t.uuid().defaultRandom().primaryKey(),
  postId: t
    .uuid()
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  userId: t
    .uuid()
    .references(() => users.id)
    .notNull(),
  content: t.varchar().notNull(),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));
