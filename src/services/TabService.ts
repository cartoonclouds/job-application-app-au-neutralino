import { inject } from "aurelia";

import {
  TabContent,
  TabGroup,
  TabHeader,
} from "../components/common/tabs/tab-group";
import { JobApplicationTab } from "../components/tabs/job-application-tab/job-application-tab";
import { UUIDService } from "./UUIDService";

/**
 * Service to control tabs and tab section visibility.
 */
@inject()
export class TabService {
  public tabList: TabGroup[] = [];

  /**
   * Returns the selected tab.
   *
   * @return {TabGroup}
   */
  public get selectedTab(): TabGroup | undefined {
    return this.tabList.find((tab: TabGroup) => tab.selected);
  }

  /**
   * Returns the entire list of tabs.
   *
   * @returns {TabGroup[]}
   */
  public tabs() {
    return this.tabList;
  }

  /**
   * Finds a tab by it's ID.
   *
   * @param {string} id
   * @returns {TabGroup}
   */
  public tab(id: string) {
    return this.tabList.find((t) => t.id === id);
  }

  /**
   * Returns the count of all tabs.
   *
   * @return {number}
   */
  public tabCount(): number {
    return this.tabList.length;
  }

  /**
   * Adds a tab to the list of tabs.
   *
   * Note if no tab is passed a new, empty one is created.
   *
   * @param {TabGroup | undefined} tab the tab group to add
   * @param {boolean} show determines whether the newly added tab should be shown
   * @return {TabGroup} the newly added tab
   */
  public addTab(tab?: TabGroup, show: boolean = true): TabGroup {
    if (!tab) {
      tab = new TabGroup(
        UUIDService.generate(),
        new TabHeader({
          label: `New Job Application ${this.tabCount()}`,
        }),
        new TabContent({
          viewModel: JobApplicationTab,
        })
      );
    }

    this.tabList.push(tab);

    if (show) {
      this.showTab(tab.id);
    }

    return tab;
  }

  /**
   * Makes a tab visible.
   *
   * @param {string} tabId ID of the tab to make visible
   */
  public showTab(tabId: string) {
    const tab = this.tab(tabId);

    if (!tab) {
      throw Error(`Unknown tab ${tabId}`);
    }

    let section = document.getElementById(`_tabbed-section-${tabId}`);

    if (section) {
      this.tabList.forEach((tab: TabGroup) => (tab.selected = false));

      tab.selected = true;
    }
  }

  /**
   * Closes (removes) a tab.
   *
   * @param {string} tabId ID of the tab to close
   */
  public closeTab(tabId: string) {
    const tab: TabGroup = this.tab(tabId);

    if (!tab.tabHeader.closeable) {
      return;
    }

    const tabIdx = this.tabList.findIndex((tab: TabGroup) => tab.id === tabId);

    if (tabIdx >= 0) {
      // open previous tab
      if (this.selectedTab.id === tabId) {
        const previousTab = this.tabList[Math.max(0, tabIdx - 1)];

        this.showTab(previousTab.id);
      }

      this.tabList.splice(tabIdx, 1);
    }

    console.assert(
      tabIdx >= 0,
      `Tab (${tabId}) with index ${tabIdx} not found`
    );
  }
}
