import { bindable, BindingMode, inject } from "aurelia";

import { PropertyNameOrFunction } from "../../../custom_typings/common";
import { Utility } from "../../../utilities/common";

/**
 * A simple dropdown
 */
@inject()
export class Dropdown {
  @bindable({ mode: BindingMode.toView }) public name: string;
  @bindable({ mode: BindingMode.twoWay }) public models: any[] = [];

  @bindable({ mode: BindingMode.oneTime }) public key?: PropertyNameOrFunction;
  @bindable({ mode: BindingMode.oneTime })
  public labelKey?: PropertyNameOrFunction;

  @bindable({ mode: BindingMode.oneTime }) public showSearch: boolean = false;
  @bindable({ mode: BindingMode.oneTime }) public placeholder: string = "";
  @bindable({ mode: BindingMode.toView }) public disabled: boolean = false;

  @bindable({ mode: BindingMode.twoWay }) selected: any | any[];

  private $select: JQuery<Element>;
  private static uniqueId = 0;

  constructor(public readonly element: Element) {}

  public binding() {
    if (this.name == null || this.name === "") {
      this.name = `dropdown-${Dropdown.uniqueId++}`;
    }
  }

  protected attached() {
    // this.$select = $(this.element).find("select");

    this.init();
  }

  protected detached() {
    // release memory
    // if (this.$select?.select2()) {
    //   this.$select.off("select2:select");
    //   this.$select.select2("destroy");
    //   this.$select = null;
    // }
  }

  private init() {
    // this.$select.select2(this.select2Options);
    // this.$select.on(
    //   "select2:select",
    //   (event) => (this.selected = (event.params.data as any).model)
    // );
  }

  protected modelsChanged() {
    this.init();
  }

  protected disabledChanged() {
    this.init();
  }

  public getValue(item: any) {
    return this.getValueFromKey(item, this.key);
  }

  public getLabel(item: any) {
    return this.getValueFromKey(item, this.labelKey);
  }

  private getValueFromKey(item: any, key: PropertyNameOrFunction | undefined) {
    if (!item || !key) {
      return item;
    }
    return Utility.getValueFromPropertyNameOrFunction(item, key);
  }

  public isSelected(model): boolean {
    return this.getValue(model) == this.getValue(this.selected);
  }
}
