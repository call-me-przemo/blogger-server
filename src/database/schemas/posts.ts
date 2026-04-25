import {
  pgTable,
  text,
  uuid,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const visibility = pgEnum("visibility", ["public", "members"]);

export const posts = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar().notNull(),
  content: text().notNull(),
  visibility: visibility().notNull(),
  updatedAt: timestamp({ withTimezone: true }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
