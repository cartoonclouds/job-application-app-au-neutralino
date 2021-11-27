import { BindingMode, bindable } from "aurelia";

export class SortIcon {
  @bindable({ mode: BindingMode.toView }) sorting = false;
  @bindable({ mode: BindingMode.twoWay }) ascending = true;

  public setAscending() {
    this.ascending = true;
  }

  public setDescending() {
    this.ascending = false;
  }
}
