import { bindable, inject } from 'aurelia';

import { Action } from '../../../models/Action';
import { JobApplication } from '../../../models/JobApplication';
import { DataTableHeader } from '../../common/data-table/data-table';
import { MenuItem } from '../../common/icon-menu/icon-menu';
import { observable } from '@aurelia/runtime';

@inject()
export class JobApplicationTab {
  @observable public searchText: string;
  @bindable public jobApplication: JobApplication = new JobApplication();

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
      class: "text-center",
    }),

    new DataTableHeader({
      isSortable: false,
      isSearchable: false,
      class: "actions",
    }),
  ];

  public readonly menuItems = [
    new MenuItem({
      displayName: "Open Action",
      action: (action: Action, event) => {
        console.log('OPEN ACTION', action);
        return true;
      },
    }),
  ];


  public activate(params?: { jobApplication?: JobApplication }) {
    if (params?.jobApplication) {
      this.jobApplication = params?.jobApplication;
    }
  }
}
