import { bindable } from "aurelia";
import { JobApplication } from "../../../models/JobApplication";
import { DataTableHeader } from "../../common/data-table/data-table";
import { Action } from "../../../models/Action";

export class JobApplicationTab {
  @bindable jobApplication: JobApplication = new JobApplication();

  public readonly actionsTableHeaders = [
    new DataTableHeader({
      displayName: "Parent Action",
      propertyGetter: (action: Action) => action.parentAction.id,
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
      displayName: "Comments",
      propertyGetter: (action: Action) => action.comments,
    }),
    new DataTableHeader({
      displayName: "Requires Follow-up",
      propertyGetter: (action: Action) =>
        action.requiresFollowup ? "YES" : "NO",
    }),
  ];

  public activate(params?: { jobApplication?: JobApplication }) {
    if (params?.jobApplication) {
      this.jobApplication = params?.jobApplication;
    }
  }
}
