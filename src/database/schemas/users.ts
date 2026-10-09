import { schemaName } from "../schema-name";

export const users = schemaName.table("users", (t) => ({
  id: t.uuid().defaultRandom().primaryKey(),
  firstName: t.varchar().notNull(),
  lastName: t.varchar().notNull(),
  email: t.varchar().unique().notNull(),
  password: t.varchar().notNull(),
  updatedAt: t.timestamp({ withTimezone: true }),
  createdAt: t.timestamp({ withTimezone: true }).defaultNow().notNull(),
}));
