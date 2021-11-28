import { bindable, BindingMode, inject } from "aurelia";
import { EmploymentTypeEnum } from "../../enums/employment-type";
import { Job } from "../../models/Job";
import { JobProfessionEnum } from "../../enums/job-profession";

@inject()
export class JobDetails {
  @bindable({ mode: BindingMode.twoWay }) public job: Job = new Job();

  public get employmentTypeOptions() {
    return Object.values(EmploymentTypeEnum);
  }

  public get jobProfessionOptions() {
    return Object.values(JobProfessionEnum);
  }
}
