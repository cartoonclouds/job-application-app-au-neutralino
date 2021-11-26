interface ITabContentOptions {
  viewModel: any;
  model?: any;
}

export class TabHeader {
  label: string;
  tooltip?: string;
  disabled: boolean = false;
  closeable: boolean = true;
  moveable: boolean = true;

  constructor(options?: Partial<TabHeader>) {
    if (options) {
      options = Object.assign(new TabHeader(), options);

      this.label = options.label;
      this.tooltip = options.tooltip;
      this.disabled = options.disabled;
      this.closeable = options.closeable;
      this.moveable = options.moveable;
    }
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
