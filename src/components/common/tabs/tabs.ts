import { bindable, EventAggregator } from "aurelia";
// https://github.com/Vheissu/aurelia-tabs
// https://github.com/aurelia-plugins/aurelia-plugins-tabs
// https://stackoverflow.com/questions/35799475/how-to-add-a-tab-or-other-ui-component-with-aurelia

export class Tabs {
  @bindable tabs: any = null;
  @bindable showNewTab: boolean = true;

  constructor(
    private readonly element: HTMLElement,
    private readonly eventAggregator: EventAggregator
  ) {}

  // https://docs.aurelia.io/getting-to-know-aurelia/components/component-lifecycles
  attached() {
    // let sections = document.getElementsByClassName("tab-sections__tab-section");

    this.element.addEventListener("click", (e) => {
      if (e.target && (e.target as HTMLElement).tagName === "A") {
        let sectionId = (e.target as HTMLElement)
          .getAttribute("href")
          ?.replace("#", "");
        let section = document.getElementById(`_tabbed-section-${sectionId}`);

        if (section) {
          this.eventAggregator.publish(`tab.change-${sectionId}`, {});

          let selectedTabs = document.getElementsByClassName("selected");

          if (selectedTabs[0]) {
            selectedTabs[0].classList.remove("selected");
          }

          (e.target as HTMLElement).parentElement?.classList.add("selected");

          Array.from(document.getElementsByTagName("tab-section")).forEach(
            (e) => {
              e.classList.remove("active");
            }
          );

          section.parentElement?.classList.add("active");
        }
      }
      e.preventDefault();
    });
  }

  public emitNewTabRequest() {
    this.eventAggregator.publish(`tab.new-request`);
  }
}
