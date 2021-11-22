import { observable } from "@aurelia/runtime";
interface ITabHeaderOptions {
  label: string;
  tooltip?: string;
  initallySelected?: boolean; //@TODO Make sure only one is selected
  disabled?: boolean;
  closeable?: boolean;
  moveable?: boolean;
}

interface ITabContentOptions {
  viewModel: any;
  model?: any;
}

export class TabHeader {
  constructor(public readonly options: ITabHeaderOptions) {
    this.options.closeable = options.closeable ?? true;
    this.options.moveable = options.moveable ?? true;
  }
}

export class TabContent {
  constructor(public readonly options: ITabContentOptions) {}
}

export class TabGroup {
  public selected: boolean = false;

  constructor(
    public readonly id: string,
    public tabHeader: TabHeader,
    public tabContent: TabContent
  ) {}

  public get viewModel() {
    return this.tabContent.options.viewModel;
  }

  public get model() {
    return this.tabContent.options.model;
  }
}
