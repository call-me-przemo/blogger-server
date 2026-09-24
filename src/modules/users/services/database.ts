import type { DatabaseSchemasType } from "@/database";
import { usersTable } from "@/database/schemas";

export class UsersDatabaseService {
  constructor(private db: DatabaseSchemasType) {}

  async getAllUsers() {
    return this.db.select().from(usersTable);
  }
}
