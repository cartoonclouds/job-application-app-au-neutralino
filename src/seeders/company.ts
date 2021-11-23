import { Company } from '../models/Company';
import { Seeder } from "./seeder";
import { AddressSeeder } from "./address";
import { PersonSeeder } from "./person";

const faker = require("faker");

export class CompanySeeder extends Seeder<Company> {
  constructor() {
    super();
  }


  private run(count: number, withRelations: boolean = true): Company[] {
    return new Array(count)
      .fill(undefined)
      .map(() => this.generate(withRelations));
  }

  private generate(withRelations: boolean = true): Company {
    return new Company({
      name: faker.company.companyName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      url: faker.phone.phoneNumber(),
      comments: faker.internet.url(),
      address: withRelations ? AddressSeeder.generate() : undefined,
      contactPeople: withRelations
        ? PersonSeeder.run(this.randomInt(0, 5))
        : undefined,
    });
  }
}
