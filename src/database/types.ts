import { NodePgDatabase } from "drizzle-orm/node-postgres";

export type DatabaseSchemasType = NodePgDatabase<
  typeof import("@/database/schemas")
>;
