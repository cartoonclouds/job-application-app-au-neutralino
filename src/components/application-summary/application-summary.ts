import { bindable, BindingMode } from "aurelia";
import { Utility } from "../../utilities/common";

export class ApplicationSummary {
  @bindable({ mode: BindingMode.twoWay })
  public message2: string;

  // https://docs.aurelia.io/getting-to-know-aurelia/components/bindable-properties/bindable-setter
  @bindable({ set: Utility.truthyDetector, mode: BindingMode.toView })
  public visible: Boolean = false;

  constructor() {
    this.message2 = " works!";
  }

  activate(model: any) {
    this.message2 = model.message2;
  }
}
