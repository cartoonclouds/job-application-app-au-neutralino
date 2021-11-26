import { Person } from "../models/Person";
import { Seeder } from "./seeder";
import { UUIDService } from "../services/UUIDService";
import moment from "moment";

const faker = require("faker");

export class PersonSeeder extends Seeder<Person> {
  constructor() {
    super();
  }

  private run(count: number, withRelations: boolean = true): Person[] {
    return new Array(count)
      .fill(undefined)
      .map(() => this.generate(withRelations));
  }

  private generate(withRelations: boolean = true): Person {
    return new Person({
      id: UUIDService.generate(),
      createdAt: moment(),
      updatedAt: moment(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      title: faker.name.prefix(),
    });
  }
}
