import { schemaName } from "../schema-name";
import { users } from "./users";

export const visibility = schemaName.enum("visibility", ["public", "members"]);

export const posts = schemaName.table("posts", (t) => ({
  id: t.uuid().defaultRandom().primaryKey(),
  userId: t
    .uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: t.varchar().notNull(),
  content: t.text().notNull(),
  visibility: visibility().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));
