import {
  pgTable,
  text,
  uuid,
  varchar,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const visibilityEnum = pgEnum("visibility", ["public", "members"]);

export const postsTable = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar().notNull(),
  content: text().notNull(),
  visibility: visibilityEnum().notNull(),
  updatedAt: timestamp({ withTimezone: true }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});
