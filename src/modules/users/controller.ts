import type { UsersDatabaseService } from "./services";
import { createFactory, type Factory } from "hono/factory";

export class UsersController {
  private factory: Factory;

  constructor(private dbService: UsersDatabaseService) {
    this.factory = createFactory();
  }

  getAllUsersList() {
    return this.factory.createHandlers(async (ctx) => {
      const users = await this.dbService.getAllUsers();

      return ctx.json(users);
    });
  }
}
