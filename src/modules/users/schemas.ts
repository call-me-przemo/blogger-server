import { usersTable } from "@/database";
import { createSelectSchema } from "drizzle-zod";

export const usersSelectSchema = createSelectSchema(usersTable);
