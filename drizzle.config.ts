import { defineConfig } from "drizzle-kit";
import { join } from "node:path";
import { readEnvs } from "@/config";

const envs = readEnvs();

export default defineConfig({
  out: join("src", "database", "migrations"),
  schema: join("src", "database", "schemas"),
  dialect: "postgresql",
  dbCredentials: {
    port: envs.DATABASE_PORT,
    host: envs.DATABASE_HOST,
    user: envs.DATABASE_USER,
    database: envs.DATABASE_SCHEMA,
    password: envs.DATABASE_PASSWORD,
    ssl: false,
  },
});
