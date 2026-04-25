import { createDb, users, posts, comments } from "@/database";
import { readEnvs } from "@/config";
import { reset, seed } from "drizzle-seed";
import { hash } from "argon2";

const envs = readEnvs();
const db = createDb({
  port: envs.DATABASE_PORT,
  host: envs.DATABASE_HOST,
  user: envs.DATABASE_USER,
  database: envs.DATABASE_SCHEMA,
  password: envs.DATABASE_PASSWORD,
});
const password = await hash("password");

await reset(db, { users, posts, comments });
await seed(db, { users, posts, comments }).refine((funcs) => ({
  users: {
    count: 82,
    columns: {
      password: funcs.default({ defaultValue: password }),
    },
    with: { posts: 5, comments: 7 },
  },
  posts: {
    columns: {
      title: funcs.loremIpsum(),
      content: funcs.loremIpsum({ sentencesCount: 20 }),
    },
  },
  comments: {
    columns: {
      content: funcs.loremIpsum(),
    },
  },
}));
