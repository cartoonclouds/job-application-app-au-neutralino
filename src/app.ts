import {
  TabGroup,
  TabHeader,
  TabContent,
} from "./components/common/tabs/tab-group";
import { ApplicationSummary } from "./components/application-summary/application-summary";
import { SummaryTab } from "./components/tabs/summary-tab/summary-tab";
import { JobApplicationTab } from "./components/tabs/job-application-tab/job-application-tab";
import { JobApplication } from "./models/JobApplication";
import { Job } from "./models/Job";
import { Address } from "./models/Address";
import { EmploymentType } from "./enums/employment-type";
import { JobProfession } from "./enums/job-profession";
import moment from "moment";
import { EventAggregator } from "aurelia";
import { ArrayUtility } from "./utilities/array-utility";
import { Model } from "./models/Model";
import { Company } from "./models/Company";
import { Action } from "./models/Action";
import { Person } from "./models/Person";
import { User } from "./models/User";

export class App {
  constructor(private readonly eventAggregator: EventAggregator) {
    Model.modelTypes.set("action", Action);
    Model.modelTypes.set("address", Address);
    Model.modelTypes.set("company", Company);
    Model.modelTypes.set("job", Job);
    Model.modelTypes.set("jobapplication", JobApplication);
    Model.modelTypes.set("person", Person);
    Model.modelTypes.set("user", User);

    let address = new Address({
      address_line_1: "U9 2/3 Birchmore Close",
      suburb: "Plmpton",
      state: "SA",
      postcode: 5040,
      country: "Australia",
    });

    let company = new Company({
      name: "Chris Company",
      email: "chris@company.com",
      phone: "0401 943 694",
      url: "www.companyname.com",
      comments: "Comments about this company",
    });

    let job = new Job({
      profession: JobProfession.IT_PROFESSIONAL,
      employmentType: EmploymentType.FULLTIME,
      closingDate: moment().add(6, "months"),
      salary: { start: 1, end: 90000 },
      rate: { amount: 11.11, unit: "day" },
      url: "www.jobwebsite.com",
      comments: "Comments about this job",
      address: address,
    });

    // console.log(Model.modelTypes);

    console.log(job.save());

    console.log(Job.find(job.id));

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

      //@TODO Select next tab on close this.tabs[Math.min(0, tabIdx - 1)].selected = true;
    });
  }

  public tabs = [
    new TabGroup(
      "tab-1",
      new TabHeader({
        label: "Summary",
        tooltip: "Tooltip for tab 1",
        disabled: false,
        closeable: false,
        moveable: false,
      }),
      new TabContent({
        viewModel: SummaryTab,
        model: {
          message2:
            "Nunc tincidunt! Proin elit arcu, rutrum commodo, vehicula tempus, commodo a, risus. Curabitur nec arcu. Donec sollicitudin mi sit amet mauris. Nam elementum quam ullamcorper ante. Etiam aliquet massa et lorem. Mauris dapibus lacus auctor risus. Aenean tempor ullamcorper leo. Vivamus sed magna quis ligula eleifend adipiscing. Duis orci. Aliquam sodales tortor vitae ipsum. Aliquam nulla. Duis aliquam molestie erat. Ut et mauris vel pede varius sollicitudin. Sed ut dolor nec orci tincidunt interdum. Phasellus ipsum. Nunc tristique tempus lectus.",
        },
      })
    ),

    new TabGroup(
      "tab-2",
      new TabHeader({
        label: "New Job Application",
        tooltip: "Tooltip for tab 2",
        initallySelected: true,
      }),
      new TabContent({
        viewModel: JobApplicationTab,
        model: {
          jobApplication: new JobApplication(),
        },
      })
    ),
  ];

  public addJobApplicationTab() {
    this.tabs.push(
      new TabGroup(
        "tab-3",
        new TabHeader({
          label: "Header label for tab 3",
          tooltip: "Tooltip for tab 3",
        }),
        new TabContent({
          viewModel: ApplicationSummary,
          model: {
            newMessage:
              "Aenean lacinia! Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.",
          },
        })
      )
    );
  }
}
