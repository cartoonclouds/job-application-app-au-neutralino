import { Job } from "../models/Job";
import { Seeder } from "./seeder";
import {
  JobProfessionEnum,
  JobProfessionEnumCount,
} from "../enums/job-profession";
import { EmploymentTypeEnum } from "../enums/employment-type";
import { NumberRangeUtility } from "../utilities/number-range-utility";
import { PayRateUtility } from "../utilities/pay-rate-utility";
import { PayRateUnitEnum } from "../enums/pay-rate-unit";
import { AddressSeeder } from "./address";
import { EnumUtility } from "../utilities/enum-utility";

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
      this.randomInt(lowerNumberRange, 300)
    );

    const standardProperties = this.generateStandardProperties();

    return new Job(
      Object.assign(standardProperties, {
        title: faker.company.companyName(),
        profession: EnumUtility.getRandomEnum(JobProfessionEnum),
        employmentType: EnumUtility.getRandomEnum(EmploymentTypeEnum),
        closingDate: standardProperties.createdAt.add(
          this.randomDate().toObject()
        ),
        salary,
        rate: PayRateUtility.create(
          this.randomInt(),
          EnumUtility.getRandomEnum(PayRateUnitEnum)
        ),
        url: faker.internet.url(),
        comments: faker.lorem.paragraph(),
        reference: faker.lorem.paragraph(),
        address: withRelations ? AddressSeeder.generate() : undefined,
        website: faker.internet.domainName(),
      })
    );
  }
}
