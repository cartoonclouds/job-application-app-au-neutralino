import { bindable, BindingMode, containerless, EventAggregator } from "aurelia";
import { TabHeader } from "../tab-group";
import { TabService } from "../../../../services/TabService";

@containerless
export class Tab {
  @bindable({ mode: BindingMode.oneTime }) id: string;
  @bindable({ mode: BindingMode.twoWay }) selected: boolean = false;
  @bindable({ mode: BindingMode.twoWay }) tabHeader: TabHeader;

  constructor(private readonly tabService: TabService) {}

  public showTab() {
    this.tabService.openTab(this.id);
  }

  public closeTab() {
    console.log("closeTab", this.id);
    this.tabService.removeTab(this.id);
  }
}
