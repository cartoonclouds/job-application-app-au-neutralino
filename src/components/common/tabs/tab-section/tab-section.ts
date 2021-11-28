import { bindable, BindingMode, inject } from "aurelia";

@inject()
export class TabSection {
  @bindable section: string;
  @bindable viewModel: any;
  @bindable model: any;
  @bindable({ mode: BindingMode.twoWay }) selected: boolean = false;
}
