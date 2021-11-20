import moment from "moment";
import { Model } from "./Model";
import { Address } from "./Address";
import { EmploymentType } from "../enums/employment-type";
import { JobProfession } from "../enums/job-profession";
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
})
export class Job extends Model<Job> {
  public url?: string;
  public comments?: string;
  public reference?: string;

  public closingDate?: moment.Moment;
  public salary?: NumberRange;
  public rate?: PayRate;
  public profession?: JobProfession; // programmer, clerk, librarian JobProfession
  public employmentType?: EmploymentType;
  public address?: Address;

  constructor(attributes?: Partial<Job>) {
    super(attributes);
  }
}