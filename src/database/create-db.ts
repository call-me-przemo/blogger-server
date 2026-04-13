import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export function createDb(connectionOptions: ConnectionOptions) {
  return drizzle(new Pool(connectionOptions));
}

interface ConnectionOptions {
  port: number;
  host: string;
  user: string;
  database: string;
  password: string;
}
