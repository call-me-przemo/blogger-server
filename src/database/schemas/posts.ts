import { dbSchema } from "../create-db";
import { usersTable } from "./users";

export const visibilityEnum = dbSchema.enum("visibility", [
  "public",
  "members",
]);

export const postsTable = dbSchema.table("posts", (t) => ({
  id: t.uuid().defaultRandom().primaryKey(),
  userId: t
    .uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  title: t.varchar().notNull(),
  content: t.text().notNull(),
  visibility: visibilityEnum().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));
