import { defineConfig } from "drizzle-kit";
import { join } from "node:path";
import { readEnvs } from "@/config";

const envs = readEnvs();
const dbDirPath = join("src", "database");

export default defineConfig({
  out: join("src", "database", "migrations"),
  schema: [
    join(dbDirPath, "schema-name.ts"),
    join(dbDirPath, "schemas", "index.ts"),
  ],
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
