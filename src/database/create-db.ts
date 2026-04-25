import * as schemas from "./schemas";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

export async function createDb(
  connectionOptions: ConnectionOptions,
  logger?: boolean,
) {
  const db = drizzle({
    connection: connectionOptions,
    logger,
  }) as NodePgDatabase<typeof schemas>;

  // check db connection, it seems that drizzle connects on the first query
  await db.execute("select 1");

  return db;
}

interface ConnectionOptions {
  port: number;
  host: string;
  user: string;
  database: string;
  password: string;
}
