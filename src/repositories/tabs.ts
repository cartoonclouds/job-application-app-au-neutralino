import { RepositoryBase } from "./repository-base";
import { TabGroup, TabHeader, TabContent } from '../components/common/tabs/tab-group';
import { SummaryTab } from '../components/tabs/summary-tab/summary-tab';
import { JobApplicationTab } from '../components/tabs/job-application-tab/job-application-tab';
import { JobApplicationRepository } from './job-applications';
import { ApplicationSummary } from '../components/application-summary/application-summary';
import { UUIDService } from "../services/UUIDService";

/**
 * Repository to perform bulk actions on companies.
 */
export class TabRepository extends RepositoryBase {
  public static tabList = [
    new TabGroup(
      UUIDService.generate(),
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
      UUIDService.generate(),
      new TabHeader({
        label: "New Job Application",
        tooltip: "Tooltip for tab 2",
        initallySelected: true,
      }),
      new TabContent({
        viewModel: JobApplicationTab,
        model: {
          jobApplication: JobApplicationRepository.jobApplications()[0],
        },
      })
    ),
  ];

  public static tabs() {
    return this.tabList;
  }

  public static tab(id: string) {
    return this.tabList.find(t => t.id === id);
  }

  public static tabCount(): number {
    return this.tabList.length;
  }

  public static addJobApplicationTab() {
    this.tabList.push(
      new TabGroup(
        UUIDService.generate(),
        new TabHeader({
          label: `Header label for tab ${TabRepository.tabCount()}`,
          tooltip: `Tooltip for tab ${TabRepository.tabCount()}`,
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
