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

export class App {
  public tabs = TabService.tabs();

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
    console.log(seederService.applications);
  }

  attached() {
    this.tabService.openTab(this.tabs[1].id);
  }
}
