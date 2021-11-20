import { bindable, BindingMode, containerless, EventAggregator } from "aurelia";
import { TabHeader } from "../tab-group";

@containerless
export class Tab {
  @bindable({ mode: BindingMode.oneTime }) id: string = "";
  @bindable({ mode: BindingMode.oneTime }) tabHeader?: TabHeader;

  constructor(private readonly eventAggregator: EventAggregator) {}

  public emitCloseTabRequest() {
    this.eventAggregator.publish(`tab.close-request`, {
      tab_id: this.id,
    });
  }
}
