import { pgSchema } from "drizzle-orm/pg-core";
import { type DatabaseSchemasType } from "./types";
import { drizzle } from "drizzle-orm/node-postgres";

export async function createDb(
  connectionOptions: ConnectionOptions,
  logger?: boolean,
) {
  const db = drizzle({
    connection: connectionOptions,
    logger,
  }) as unknown as DatabaseSchemasType;

  // check db connection, it seems that drizzle connects on the first query
  await db.execute("select 1");

  return db;
}

export const dbSchema = pgSchema("blogger-app");

interface ConnectionOptions {
  port: number;
  host: string;
  user: string;
  database: string;
  password: string;
}
