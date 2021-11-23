import { ActionRepository } from "../../../repositories/action";
import { CompanyRepository } from "../../../repositories/company";
import { JobApplicationRepository } from "../../../repositories/job-application";

export class SummaryTab {
  constructor(
    public readonly applicationRepository: JobApplicationRepository,
    public readonly actionsRepository: ActionRepository,
    public readonly companyRepository: CompanyRepository
  ) {}

  public get applicationsRequiringFollowup(): number {
    console.log(this.applicationRepository.getApplicationsRequiringFollowup());
    return this.applicationRepository.getApplicationsRequiringFollowup().length;
  }

  public get actionsRequiringFollowup(): number {
    return this.actionsRepository.getActionsRequiringFollowup().length;
  }
}
