import { users } from "@/database";
import { createSelectSchema } from "drizzle-orm/zod";
import { array } from "zod";
import { describeRoute, resolver } from "hono-openapi";

export const usersSelectSchema = describeRoute({
  description: "Returns list of all users",
  tags: ["Users"],
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: resolver(array(createSelectSchema(users))),
        },
      },
    },
  },
});
