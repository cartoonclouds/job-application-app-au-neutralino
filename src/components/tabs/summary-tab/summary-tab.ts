import { inject } from "aurelia";

import { JobApplication } from "../../../models";
import { ActionRepository } from "../../../repositories/action";
import { CompanyRepository } from "../../../repositories/company";
import { JobApplicationRepository } from "../../../repositories/job-application";
import { TabService } from "../../../services/TabService";
import { UUIDService } from "../../../services/UUIDService";
import { DataTableHeader } from "../../common/data-table/data-table";
import { MenuItem } from "../../common/icon-menu/icon-menu";
import { TabContent, TabGroup, TabHeader } from "../../common/tabs";
import { JobApplicationTab } from "../job-application-tab/job-application-tab";

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
      class: "actions text-right",
    }),
  ];

  public readonly menuItems = [
    new MenuItem({
      displayName: "Open Job Application",
      action: (jobApplication: JobApplication, event) => {
        this.openTab(jobApplication);
        return true;
      },
    }),
  ];

  constructor(
    public readonly applicationRepository: JobApplicationRepository,
    public readonly actionsRepository: ActionRepository,
    public readonly companyRepository: CompanyRepository,
    private readonly tabService: TabService
  ) {}

  public openTab(jobApplication: JobApplication) {
    return this.tabService.addTab(
      new TabGroup(
        UUIDService.generate(),
        new TabHeader({
          label: jobApplication.job.title,
        }),
        new TabContent({
          viewModel: JobApplicationTab,
          model: { jobApplication },
        })
      )
    );
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
