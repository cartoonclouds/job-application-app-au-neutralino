import { bindable, BindingMode, containerless, inject } from "aurelia";

@inject()
@containerless
export class ApplicationStatistic {
  // https://docs.aurelia.io/getting-to-know-aurelia/components/bindable-properties/bindable-setter
  @bindable({ mode: BindingMode.toView }) public title: string;
  @bindable({ mode: BindingMode.toView }) public text: string;
  @bindable({ mode: BindingMode.toView }) public icon: string;
}
