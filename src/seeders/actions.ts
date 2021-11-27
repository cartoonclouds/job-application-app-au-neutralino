import { Action } from "../models/Action";
import { Seeder } from "./seeder";
import { PersonSeeder } from "./person";
import { ContactMethodEnum } from "../enums/contact-method";
import { EnumUtility } from "../utilities/enum-utility";
import { UUIDService } from "../services/UUIDService";
import moment from "moment";

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
    const standardProperties = this.generateStandardProperties();

    return new Action(
      Object.assign(standardProperties, {
        parentAction: withRelations ? ActionSeeder.generate(false) : undefined,
        contactPerson: withRelations ? PersonSeeder.generate() : undefined,
        comments: faker.lorem.paragraph(),
        contactMethod: EnumUtility.getRandomEnum(ContactMethodEnum),
        requiresFollowup: faker.datatype.boolean(),
      })
    );
  }
}
