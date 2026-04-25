import * as schemas from "./schemas";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export function createDb(
  connectionOptions: ConnectionOptions,
): NodePgDatabase<typeof schemas> {
  return drizzle(new Pool(connectionOptions));
}

interface ConnectionOptions {
  port: number;
  host: string;
  user: string;
  database: string;
  password: string;
}
