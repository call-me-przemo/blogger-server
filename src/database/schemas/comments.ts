import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { posts } from "./posts";
import { users } from "./users";

export const comments = pgTable("comments", {
  id: uuid().defaultRandom().primaryKey(),
  postId: uuid()
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid()
    .references(() => users.id)
    .notNull(),
  content: varchar().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
