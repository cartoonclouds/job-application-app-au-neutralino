import { User } from "../models/User";
// import { InMemoryStorage } from '../services/storage/InMemoryStorage';

/**
 * User Service
 */
export class UserService {
  private static instance: UserService;

  private activeUser: User;

  // private constructor(private readonly storage: InMemoryStorage) {}
  constructor() {
    this.activeUser = new User();
  }

  public static getUserService(): UserService {
    return this.instance || (this.instance = new this());
  }

  public getActiveUser(): User {
    return this.activeUser; //?? this.storage.get("User", "ABC123");
  }
}
