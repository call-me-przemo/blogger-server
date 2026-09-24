import { usersTable } from "@/database";
import { createSelectSchema } from "drizzle-zod";
import { array } from "zod";
import { describeRoute, resolver } from "hono-openapi";

export const usersSelectSchema = describeRoute({
  description: "Returns list of all users",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: resolver(array(createSelectSchema(usersTable))),
        },
      },
    },
  },
});
