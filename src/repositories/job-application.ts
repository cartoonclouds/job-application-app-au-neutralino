import { RepositoryBase } from "./repository-base";
import { JobApplication } from "../models/JobApplication";
import { SeederService } from "../services/SeederService";
import { inject } from "aurelia";

/**
 * Repository to perform bulk actions on job applications.
 */
@inject()
export class JobApplicationRepository extends RepositoryBase {
  public jobApplicationList: JobApplication[] = [];

  constructor(public readonly seederService: SeederService) {
    super();

    this.jobApplicationList = seederService.applications;
  }

  public jobApplications() {
    return this.jobApplicationList;
  }

  public jobApplication(id: string) {
    return this.jobApplicationList.find((j) => j.id === id);
  }

  public get jobApplicationCount(): number {
    return this.jobApplicationList.length;
  }

  /**
   * Returns an array of job applications which have been set as requiring follow-up.
   */
  public getApplicationsRequiringFollowup(): JobApplication[] {
    return this.jobApplicationList.filter(
      (application: JobApplication) => application.requiresFollowup
    );
  }
  // By:
  // * salary range
  // * rate
  // * profession
  // * employmentType
  // * closing date
  // * created date
  // * company
  // * location (ie, Address suburb, state, postcode, country)
}
