import { bindable } from "aurelia";
import { TabGroup } from "./tab-group";
import { TabService } from "../../../services/TabService";
// https://github.com/Vheissu/aurelia-tabs
// https://github.com/aurelia-plugins/aurelia-plugins-tabs
// https://stackoverflow.com/questions/35799475/how-to-add-a-tab-or-other-ui-component-with-aurelia

// https://docs.aurelia.io/getting-to-know-aurelia/components/component-lifecycles
export class Tabs {
  @bindable tabs: TabGroup[] = null;
  @bindable showNewTab: boolean = true;

  constructor(private readonly tabService: TabService) {}
}
