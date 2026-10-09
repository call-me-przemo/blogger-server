import { dbSchema } from "../create-db";

export const usersTable = dbSchema.table("users", (t) => ({
  id: t.uuid().defaultRandom().primaryKey(),
  firstName: t.varchar().notNull(),
  lastName: t.varchar().notNull(),
  email: t.varchar().unique().notNull(),
  password: t.varchar().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));
