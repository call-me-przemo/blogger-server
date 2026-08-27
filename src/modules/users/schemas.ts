import { usersTable } from "@/database";
import { createSelectSchema } from "drizzle-zod";
import { array } from "zod";

export const usersSelectSchema = array(createSelectSchema(usersTable));
