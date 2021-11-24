import { bindable, BindingMode } from "aurelia";

/**
 * Ellipsis Attribute
 */
export class EllipsisCustomAttribute {
  @bindable({ primary: true, mode: BindingMode.toView }) content: string = "";
  @bindable({ mode: BindingMode.toView }) options: object = {
    html: true,
  };

  private tooltip: tooltip = null;

  constructor(private readonly element: HTMLElement) {}

  public attached() {
    console.log(this.getOptions());

    this.initTooltip();
  }

  public detached() {
    this.tooltip?.tooltip("dispose");
    this.tooltip = null;
  }

  private initTooltip() {
    this.tooltip?.tooltip("dispose");

    if (this.content) {
      this.tooltip = new bootstrap.Tooltip(this.element, this.getOptions());
    }
  }

  private getOptions() {
    return Object.assign({}, this.options, { title: this.content });
  }

  propertyChanged(name, newValue, oldValue) {
    this.initTooltip();
  }
}
