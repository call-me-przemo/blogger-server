import { type DatabaseSchemasType, users } from "@/database";

export class UsersDatabaseService {
  constructor(private readonly db: DatabaseSchemasType) {}

  async getAllUsers() {
    return this.db.select().from(users);
  }
}
