import { Job } from "../models/Job";
import { Seeder } from "./seeder";
import {
  JobProfessionEnum,
  JobProfessionEnumCount,
} from "../enums/job-profession";
import {
  EmploymentTypeEnum,
  EmploymentTypeEnumCount,
} from "../enums/employment-type";
import moment from "moment";
import { NumberRangeUtility } from "../utilities/number-range-utility";
import { PayRateUtility } from "../utilities/pay-rate-utility";
import { PayRateUnitEnum, PayRateUnitEnumCount } from "../enums/pay-rate-unit";
import { AddressSeeder } from "./address";

const faker = require("faker");

export class JobSeeder extends Seeder<Job> {
  constructor() {
    super();
  }

  private run(count: number, withRelations: boolean = true): Job[] {
    return new Array(count)
      .fill(undefined)
      .map(() => this.generate(withRelations));
  }

  private generate(withRelations: boolean = true): Job {
    const lowerNumberRange = this.randomInt(1, 99);
    const salary: NumberRange = NumberRangeUtility.create(
      lowerNumberRange,
      this.randomInt(lowerNumberRange, 99)
    );

    return new Job({
      profession: JobProfessionEnum[this.randomInt(0, JobProfessionEnumCount)],
      employmentType:
        EmploymentTypeEnum[this.randomInt(0, EmploymentTypeEnumCount)],
      closingDate: moment().add(this.randomInt(), "day"),
      salary,
      rate: PayRateUtility.create(
        this.randomInt(),
        PayRateUnitEnum[this.randomInt(0, PayRateUnitEnumCount)]
      ),
      url: faker.internet.url(),
      comments: faker.lorem.paragraph(),
      reference: faker.lorem.paragraph(),
      address: withRelations ? AddressSeeder.generate() : undefined,
    });
  }
}
