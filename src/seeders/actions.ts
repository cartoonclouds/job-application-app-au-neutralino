import { Action } from "../models/Action";
import { Seeder } from "./seeder";
import { PersonSeeder } from "./person";
import {
  ContactMethodEnum,
  ContactMethodEnumCount,
} from "../enums/contact-method";

const faker = require("faker");

export class ActionSeeder extends Seeder<Action> {
  constructor() {
    super();
  }


  private run(count: number, withRelations: boolean = true): Action[] {
    return new Array(count)
      .fill(undefined)
      .map(() => this.generate(withRelations));
  }

  private generate(withRelations: boolean = true): Action {
    return new Action({
      parentAction: withRelations ? ActionSeeder.generate(false) : undefined,
      contactPerson: withRelations ? PersonSeeder.generate() : undefined,
      comments: faker.lorem.paragraph(),
      contactMethod:
        ContactMethodEnum[this.randomInt(0, ContactMethodEnumCount)],
      requiresFollowup: faker.datatype.boolean(),
    });
  }
}
