import { JobApplication } from "../models/JobApplication";
import { Seeder } from "./seeder";
import { JobSeeder } from "./job";
import { CompanySeeder } from "./company";
import { ActionSeeder } from "./actions";
import moment from "moment";
import { UUIDService } from "../services/UUIDService";

const faker = require("faker");

export class JobApplicationSeeder extends Seeder<JobApplication> {
  constructor() {
    super();
  }

  private run(count: number, withRelations: boolean = true): JobApplication[] {
    return new Array(count)
      .fill(undefined)
      .map(() => this.generate(withRelations));
  }

  private generate(withRelations: boolean = true): JobApplication {
    return new JobApplication({
      id: UUIDService.generate(),
      createdAt: moment(),
      updatedAt: moment(),
      requiresFollowup: faker.datatype.boolean(),
      job: withRelations ? JobSeeder.generate() : undefined,
      company: withRelations ? CompanySeeder.generate() : undefined,
      actions: withRelations ? ActionSeeder.run(this.randomInt()) : undefined,
    });
  }
}
