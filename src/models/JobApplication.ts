import { Job } from "./Job";
import { Company } from "./Company";
import { Action } from "./Action";
import { Model } from "./Model";
import { modelSchema } from "../decorators/model-schema";

/**
 * Job Application model.
 */
@modelSchema({
  job: "Job",
  company: "Company",
  actions: "Action[]",
  requiresFollowup: "boolean",
})
export class JobApplication extends Model<JobApplication> {
  public job: Job;
  public requiresFollowup?: boolean;
  public company: Company;
  public actions?: Action[];

  constructor(attributes?: Partial<JobApplication>) {
    super(attributes);
  }
}
