import { inject } from "aurelia";

import { ApplicationSummary } from "../components/application-summary/application-summary";
import {
  TabContent,
  TabGroup,
  TabHeader,
} from "../components/common/tabs/tab-group";
import { JobApplicationTab } from "../components/tabs/job-application-tab/job-application-tab";
import { SummaryTab } from "../components/tabs/summary-tab/summary-tab";
import { JobApplicationRepository } from "../repositories/job-application";
import { UUIDService } from "../services/UUIDService";

/**
 * Service to control tabs and tab section visibility.
 */
@inject()
export class TabService {
  public static tabList = [];

  constructor(
    public readonly jobApplicationRepository: JobApplicationRepository
  ) {
    TabService.tabList = [
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
        }),
        new TabContent({
          viewModel: JobApplicationTab,
          model: {
            jobApplication: jobApplicationRepository.jobApplications()[0],
          },
        })
      ),
    ];
  }

  public removeTab(tabId: string) {
    const tabIdx = TabService.tabList.findIndex(
      (tab: TabGroup) => tab.id === tabId
    );

    console.log("remove tab", tabIdx);

    if (tabIdx >= 0) {
      // open previous tab
      if (this.selectedTab.id === tabId) {
        const previousTab = TabService.tabList[Math.max(0, tabIdx - 1)];

        this.openTab(previousTab.id);
      }

      //TODO Fix bug when deleting middle tabs
      TabService.tabList.splice(tabIdx, 1);
    }

    console.assert(
      tabIdx >= 0,
      `Tab (${tabId}) with index ${tabIdx} not found`
    );
  }

  public get selectedTab(): TabGroup | undefined {
    return TabService.tabList.find((tab: TabGroup) => tab.selected);
  }

  public openTab(tabId: string) {
    const tab = TabService.tab(tabId);
    let section = document.getElementById(`_tabbed-section-${tabId}`);

    if (section) {
      TabService.tabList.forEach((tab: TabGroup) => (tab.selected = false));

      tab.selected = true;
    }
  }

  public static tabs() {
    return this.tabList;
  }

  public static tab(id: string) {
    return this.tabList.find((t) => t.id === id);
  }

  public static tabCount(): number {
    return this.tabList.length;
  }

  public addJobApplicationTab() {
    const newTab = new TabGroup(
      UUIDService.generate(),
      new TabHeader({
        label: `Header label for tab ${TabService.tabCount()}`,
        tooltip: `Tooltip for tab ${TabService.tabCount()}`,
      }),
      new TabContent({
        viewModel: ApplicationSummary,
        model: {
          newMessage:
            "Aenean lacinia! Mauris eleifend est et turpis. Duis id erat. Suspendisse potenti. Aliquam vulputate, pede vel vehicula accumsan, mi neque rutrum erat, eu congue orci lorem eget lorem. Vestibulum non ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce sodales. Quisque eu urna vel enim commodo pellentesque. Praesent eu risus hendrerit ligula tempus pretium. Curabitur lorem enim, pretium nec, feugiat nec, luctus a, lacus.",
        },
      })
    );
    TabService.tabList.push(newTab);

    this.openTab(newTab.id);
  }
}
