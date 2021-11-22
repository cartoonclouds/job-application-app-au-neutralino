import { JobApplicationRepository } from "../../../repositories/job-applications";
export class SummaryTab {
  constructor(
    public readonly applicationRepository: JobApplicationRepository
  ) {}

  public get applicationsRequiringFollowup(): number {
    return this.applicationRepository.getApplicationsRequiringFollowup().length;
  }
}
