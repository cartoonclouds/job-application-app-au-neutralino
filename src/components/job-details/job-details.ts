import { bindable, BindingMode } from "aurelia";
import { EmploymentType } from "../../enums/employment-type";
import { Job } from "../../models/Job";
import { JobProfession } from "../../enums/job-profession";

export class JobDetails {
  @bindable({ mode: BindingMode.twoWay }) public job: Job = new Job();

  public get employmentTypeOptions() {
    return Object.values(EmploymentType);
  }

  public get jobProfessionOptions() {
    return Object.values(JobProfession);
  }
}
