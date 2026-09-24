import { serve } from "@hono/node-server";
import { createApp } from "@/create-app";
import { readEnvs } from "@/config";
import { createDb } from "@/database";

const envs = readEnvs();
const db = await createDb(
  {
    port: envs.DATABASE_PORT,
    host: envs.DATABASE_HOST,
    user: envs.DATABASE_USER,
    database: envs.DATABASE_SCHEMA,
    password: envs.DATABASE_PASSWORD,
  },
  envs.APP_ENV === "development",
);
const app = await createApp(db, envs.APP_ENV);

serve(
  {
    fetch: app.fetch,
    port: envs.APP_PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
