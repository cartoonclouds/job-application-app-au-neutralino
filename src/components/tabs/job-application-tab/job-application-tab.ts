import { bindable } from "aurelia";
import { JobApplication } from "../../../models/JobApplication";
import { DataTableHeader } from "../../common/data-table/data-table";
import { Action } from "../../../models/Action";

export class JobApplicationTab {
  @bindable jobApplication: JobApplication = new JobApplication();

  public readonly actionsTableHeaders = [
    new DataTableHeader({
      displayName: "Created",
      propertyGetter: (action: Action) => action.createdAt.toISOString(),
    }),
    new DataTableHeader({
      displayName: "Contact Method",
      propertyGetter: (action: Action) => action.contactMethod,
    }),
    new DataTableHeader({
      displayName: "Contact Person",
      propertyGetter: (action: Action) => action.contactPerson.name,
    }),
    new DataTableHeader({
      displayName: "Requires Follow-up",
      propertyGetter: (action: Action) => (action.requiresFollowup ? "1" : "0"),
    }),

    new DataTableHeader({
      isSortable: false,
      isSearchable: false,
    }),
  ];

  public activate(params?: { jobApplication?: JobApplication }) {
    if (params?.jobApplication) {
      this.jobApplication = params?.jobApplication;
    }
  }
}
