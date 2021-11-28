import { bindable, BindingMode, containerless, EventAggregator, inject } from "aurelia";
import { TabHeader } from "../tab-group";
import { TabService } from "../../../../services/TabService";

@inject()
@containerless
export class Tab {
  @bindable({ mode: BindingMode.oneTime }) id: string;
  @bindable({ mode: BindingMode.twoWay }) selected: boolean = false;
  @bindable({ mode: BindingMode.twoWay }) tabHeader: TabHeader;
  @bindable({ mode: BindingMode.oneTime })
  onClick: () => any = this.showTab;

  constructor(private readonly tabService: TabService) {}

  public closeTab() {
    this.tabService.removeTab(this.id);

    return true;
  }

  public showTab() {
    this.tabService.openTab(this.id);

    return true;
  }
}
