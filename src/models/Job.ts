import moment from "moment";
import { Model } from "./Model";
import { Address } from "./Address";
import { EmploymentTypeEnum } from "../enums/employment-type";
import { JobProfessionEnum } from "../enums/job-profession";
import { modelSchema } from "../decorators/model-schema";

/**
 * Job Details Model
 */
@modelSchema({
  profession: "JobProfession",
  employmentType: "EmploymentType",
  closingDate: "moment.Moment",
  salary: "NumberRange",
  rate: "PayRate",
  url: "string",
  comments: "string",
  reference: "string",
  address: "Address",
  website: "string",
})
export class Job extends Model<Job> {
  public url?: string;
  public comments?: string;
  public reference?: string;

  public closingDate?: moment.Moment;
  public salary?: NumberRange;
  public rate?: PayRate;
  public profession?: JobProfessionEnum; // programmer, clerk, librarian JobProfession
  public employmentType?: EmploymentTypeEnum;
  public address?: Address;
  public website: string;

  constructor(attributes?: Partial<Job>) {
    super(attributes);
  }
}
