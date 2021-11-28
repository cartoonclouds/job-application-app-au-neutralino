import { inject } from "aurelia";
import { JobApplication } from "../../../models";
import { ActionRepository } from "../../../repositories/action";
import { CompanyRepository } from "../../../repositories/company";
import { JobApplicationRepository } from "../../../repositories/job-application";
import { DataTableHeader } from "../../common/data-table/data-table";
@inject()
export class SummaryTab {
  public readonly jobApplicationTableHeaders = [
    new DataTableHeader({
      displayName: "Created",
      propertyGetter: (application: JobApplication) =>
        application.createdAt.toISOString(),
    }),
    new DataTableHeader({
      displayName: "Title",
      propertyGetter: (application: JobApplication) => application.job.title,
    }),
    new DataTableHeader({
      displayName: "Company",
      propertyGetter: (application: JobApplication) => application.company.name,
    }),
    new DataTableHeader({
      displayName: "Contact Person",
      propertyGetter: (application: JobApplication) =>
        application.company && application.company.contactPeople.length > 0
          ? application.company.contactPeople[0].name
          : "-",
    }),
    new DataTableHeader({
      displayName: "Requires Follow-up",
      propertyGetter: (application: JobApplication) =>
        application.requiresFollowup ? "1" : "0",
        class: "text-center",
    }),

    new DataTableHeader({
      isSortable: false,
      isSearchable: false,
      class: "actions",
    }),
  ];

  constructor(
    public readonly applicationRepository: JobApplicationRepository,
    public readonly actionsRepository: ActionRepository,
    public readonly companyRepository: CompanyRepository
  ) {}

  public attached() {
    console.log(this.jobApplications);
  }

  public get applicationsRequiringFollowup(): number {
    return this.applicationRepository.getApplicationsRequiringFollowup().length;
  }

  public get actionsRequiringFollowup(): number {
    return this.actionsRepository.getActionsRequiringFollowup().length;
  }

  public get jobApplications() {
    return this.applicationRepository.jobApplicationList;
  }
}
