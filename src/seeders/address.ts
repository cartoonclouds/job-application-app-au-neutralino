import moment from "moment";
import { Address } from "../models/Address";
import { UUIDService } from "../services/UUIDService";
import { Seeder } from "./seeder";

const faker = require("faker");

export class AddressSeeder extends Seeder<Address> {
  constructor() {
    super();
  }

  private run(count: number, withRelations: boolean = true): Address[] {
    return new Array(count)
      .fill(undefined)
      .map(() => this.generate(withRelations));
  }

  private generate(withRelations: boolean = true): Address {
    return new Address({
      id: UUIDService.generate(),
      createdAt: moment(),
      updatedAt: moment(),
      address_line_1: faker.address.secondaryAddress(),
      address_line_2: faker.address.streetAddress(),
      suburb: faker.address.city(),
      state: faker.address.state(),
      postcode: faker.address.zipCodeByState(),
      country: faker.address.country(),
    });
  }
}
