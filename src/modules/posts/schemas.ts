import { postsTable, commentsTable } from "@/database";
import { createSelectSchema } from "drizzle-zod";
import { array } from "zod";
import { describeRoute, resolver } from "hono-openapi";

export const postsSelectSchema = describeRoute({
  description: "Returns list of all posts",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: resolver(array(createSelectSchema(postsTable))),
        },
      },
    },
  },
});
