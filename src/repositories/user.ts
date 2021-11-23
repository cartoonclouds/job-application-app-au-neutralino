import { User } from "../models/User";
import { RepositoryBase } from "./repository-base";
import { SeederService } from "../services/SeederService";
import { inject } from "aurelia";

/**
 * User Repository
 */
 @inject()
export class UserRepository extends RepositoryBase {
  private activeUser: User;

  constructor(public readonly seederService: SeederService) {
    super();

    this.activeUser = seederService.user;
  }

  public user() {
    return this.activeUser;
  }
}
