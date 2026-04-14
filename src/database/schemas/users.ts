import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  firstName: varchar().notNull(),
  lastName: varchar().notNull(),
  email: varchar().unique().notNull(),
  password: varchar().notNull(),
  updatedAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
});
