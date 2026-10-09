import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";

export async function createDb(
  connectionOptions: ConnectionOptions,
  logger?: boolean,
) {
  const db = drizzle({
    connection: connectionOptions,
    logger,
    relations,
  });

  // check db connection, it seems that drizzle connects on the first query
  await db.execute("select 1");

  return db;
}

export type DatabaseSchemasType = Awaited<ReturnType<typeof createDb>>;

interface ConnectionOptions {
  port: number;
  host: string;
  user: string;
  database: string;
  password: string;
}
