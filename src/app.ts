import { Action, Address, Company, Job, JobApplication, Model, Person, User } from "./models";
import { TabRepository } from './repositories/tabs';
import { EventAggregator } from 'aurelia';
import { ArrayUtility } from './utilities/array-utility';

export class App {
  constructor(private readonly eventAggregator: EventAggregator) {
    Model.modelTypes.set("action", Action);
    Model.modelTypes.set("address", Address);
    Model.modelTypes.set("company", Company);
    Model.modelTypes.set("job", Job);
    Model.modelTypes.set("jobapplication", JobApplication);
    Model.modelTypes.set("person", Person);
    Model.modelTypes.set("user", User);

    // console.log(Model.modelTypes);

    // console.log(job.save());

    // console.log(Job.find(job.id));

    // console.log(Job.className, job.instanceName);

    // console.log(job.id, job.rate);

    this.eventAggregator.subscribe(`tab.new-request`, () => {
      this.addJobApplicationTab();
    });

    this.eventAggregator.subscribe(`tab.close-request`, ({ tab_id }) => {
      const tabIdx = ArrayUtility.findIndexOfArray(
        this.tabs,
        (tab) => tab.id === tab_id
      );

      if (tabIdx >= 0) {
        this.tabs.splice(tabIdx, 1);
      }

      // @TODO Select next tab on close this.tabs[Math.min(0, tabIdx - 1)].selected = true;
    });
  }

  public tabs = TabRepository.tabs();

  public addJobApplicationTab() {
    TabRepository.addJobApplicationTab();
  }
}
