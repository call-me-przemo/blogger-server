import * as schemas from "@/database/schemas";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class UsersDatabaseService {
  constructor(private db: NodePgDatabase<typeof schemas>) {}

  async getAllUsers() {
    return this.db.select().from(schemas.usersTable);
  }
}
