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
    const standardProperties = this.generateStandardProperties();

    return new Person(
      Object.assign(standardProperties, {
        name: faker.name.findName(),
        email: faker.internet.email(),
        title: faker.name.prefix(),
      })
    );
  }
}
