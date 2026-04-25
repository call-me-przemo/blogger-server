import { createDb, usersTable, postsTable, commentsTable } from "@/database";
import { readEnvs } from "@/config";
import { reset, seed } from "drizzle-seed";
import { hash } from "argon2";

const envs = readEnvs();
const db = await createDb({
  port: envs.DATABASE_PORT,
  host: envs.DATABASE_HOST,
  user: envs.DATABASE_USER,
  database: envs.DATABASE_SCHEMA,
  password: envs.DATABASE_PASSWORD,
});
const password = await hash("password");

await reset(db, { usersTable, postsTable, commentsTable });
await seed(db, { usersTable, postsTable, commentsTable }).refine((funcs) => ({
  usersTable: {
    count: 82,
    columns: {
      password: funcs.default({ defaultValue: password }),
    },
    with: { postsTable: 5, commentsTable: 7 },
  },
  postsTable: {
    columns: {
      title: funcs.loremIpsum(),
      content: funcs.loremIpsum({ sentencesCount: 20 }),
    },
  },
  commentsTable: {
    columns: {
      content: funcs.loremIpsum(),
    },
  },
}));
