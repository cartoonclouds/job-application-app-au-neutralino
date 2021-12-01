import { TabGroup, TabHeader, TabContent } from "./components/common/tabs";
import { SummaryTab } from "./components/tabs/summary-tab/summary-tab";
import {
  Action,
  Address,
  Company,
  Job,
  JobApplication,
  Model,
  Person,
  User,
} from "./models";
import { SeederService } from "./services/SeederService";
import { TabService } from "./services/TabService";
import { UUIDService } from "./services/UUIDService";

// https://github.com/Vheissu/aurelia-tabs
// https://github.com/aurelia-plugins/aurelia-plugins-tabs
// https://stackoverflow.com/questions/35799475/how-to-add-a-tab-or-other-ui-component-with-aurelia

// https://docs.aurelia.io/getting-to-know-aurelia/components/component-lifecycles
export class App {
  constructor(
    private readonly tabService: TabService,
    public readonly seederService: SeederService
  ) {
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
  }

  attached() {
    this.tabService.addTab(
      new TabGroup(
        UUIDService.generate(),
        new TabHeader({
          label: "Job Application Summary",
          tooltip: "The dashboard of all job applications",
          disabled: false,
          closeable: false,
          moveable: false,
        }),
        new TabContent({
          viewModel: SummaryTab,
        })
      )
    );

    this.tabService.addTab();
  }
}
