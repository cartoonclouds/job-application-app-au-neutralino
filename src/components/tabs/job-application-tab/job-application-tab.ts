import { bindable } from "aurelia";
import { JobApplication } from "../../../models/JobApplication";

export class JobApplicationTab {
  @bindable jobApplication: JobApplication = new JobApplication();

  public activate(params?: { jobApplication?: JobApplication }) {
    if (params?.jobApplication) {
      this.jobApplication = params?.jobApplication;
    }
  }
}
