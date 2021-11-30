import { bindable, BindingMode, containerless, inject } from 'aurelia';

import { MouseButton } from '../../../../enums/common';
import { TabService } from '../../../../services/TabService';
import { TabHeader } from '../tab-group';

@inject()
@containerless
export class Tab {
  @bindable({ mode: BindingMode.oneTime }) id: string;
  @bindable({ mode: BindingMode.twoWay }) selected: boolean = false;
  @bindable({ mode: BindingMode.twoWay }) tabHeader: TabHeader;

  constructor(private readonly tabService: TabService) {}

  public tabAction(event) {
    const clickedElement: HTMLElement = event.target;

    if (
      clickedElement.classList.contains("btn-close") ||
      event.button === MouseButton.Middle
    ) {
      return this.tabService.closeTab(this.id);
    }

    return this.tabService.showTab(this.id);
  }
}
