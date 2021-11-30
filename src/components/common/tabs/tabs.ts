import { bindable, inject } from 'aurelia';

import { TabService } from '../../../services/TabService';
import { TabGroup } from './tab-group';

@inject()
export class Tabs {
  @bindable tabs: TabGroup[] = null;
  @bindable showNewTab: boolean = true;

  constructor(private readonly tabService: TabService) {}
}
