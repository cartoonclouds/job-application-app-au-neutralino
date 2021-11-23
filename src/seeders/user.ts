import { User } from "../models/User";
import { Seeder } from "./seeder";
import { AddressSeeder } from "./address";

const faker = require("faker");

export class UserSeeder extends Seeder<User> {
  constructor() {
    super();
  }

  private run(count: number, withRelations: boolean = true): User[] {
    return new Array(count)
      .fill(undefined)
      .map(() => this.generate(withRelations));
  }

  private generate(withRelations: boolean = true): User {
    return new User({
      name: faker.name.findName(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
      address: withRelations ? AddressSeeder.generate() : undefined,
    });
  }
}
