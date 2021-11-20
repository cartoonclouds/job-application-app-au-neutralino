import { bindable } from "aurelia";

export class TabSection {
  @bindable section!: string;
  @bindable viewModel: any;
  @bindable model: any;
  @bindable initialSection?: string;

  constructor(private readonly element: Element) {}

  attached() {
    if (this.initialSection === this.section) {
      this.element?.classList.add("active");
    }
  }
}
