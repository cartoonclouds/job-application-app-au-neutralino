import { bindable, BindingMode, containerless, inject } from "aurelia";

@inject()
@containerless
export class TabSection {
  @bindable section: string;
  @bindable viewModel: any;
  @bindable model: any;
  @bindable({ mode: BindingMode.twoWay }) selected: boolean = false;
}
