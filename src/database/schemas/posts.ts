import { pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const postsTable = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar().notNull(),
  content: text().notNull(),
  visibility: varchar({ enum: ["public", "members"] }).notNull(),
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
});
