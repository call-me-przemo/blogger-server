import type { UsersDatabaseService } from "./services";
import type { Context } from "hono";

export class UsersController {
  constructor(private readonly dbService: UsersDatabaseService) {}

  async getAllUsersList(ctx: Context) {
    const users = await this.dbService.getAllUsers();

    return ctx.json(users);
  }
}
