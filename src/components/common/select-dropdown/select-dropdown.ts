import "select2";
import "select2/dist/css/select2.min.css";

import { bindable, BindingMode, inject } from "aurelia";

import { PropertyNameOrFunction } from "../../../custom_typings/common";
import { Utility } from "../../../utilities/common";
import { ObjectUtility } from "../../../utilities/object-utility";

/**
 *
 * @url https://ilikekillnerds.com/2015/08/aurelia-custom-elements-custom-callback-events-tutorial/
 * @url https://github.com/Kla3mus/select24aurelia/blob/master/select2.ts
 */
@inject()
export class SelectDropdown {
  @bindable({ mode: BindingMode.toView }) public name: string;
  @bindable({ mode: BindingMode.twoWay }) public models: any[] = [];

  @bindable({ mode: BindingMode.oneTime }) public key?: PropertyNameOrFunction;
  @bindable({ mode: BindingMode.oneTime })
  public labelKey?: PropertyNameOrFunction;

  @bindable({ mode: BindingMode.oneTime }) public multiple: boolean = false;
  @bindable({ mode: BindingMode.oneTime }) public showSearch: boolean = false;
  @bindable({ mode: BindingMode.oneTime }) public placeholder: string = "";
  @bindable({ mode: BindingMode.toView }) public disabled: boolean = false;
  @bindable({ mode: BindingMode.toView }) public options: object = {};

  @bindable({ mode: BindingMode.twoWay }) selected: any | any[];

  private $select: JQuery<Element>;
  private static uniqueId = 0;

  constructor(public readonly element: Element) {}

  // https://select2.org/searching#multi-select
  // https://github.com/select2/select2/issues/4797
  private init() {
    this.$select.select2(this.select2Options);

    this.$select.on(
      "select2:select",
      (event) => (this.selected = (event.params.data as any).model)
    );
  }

  protected get select2Options() {
    return Object.assign(
      {},
      {
        minimumResultsForSearch: this.showSearch ? undefined : -1,
        placeholder: this.placeholder,
        width: "100%",
        disabled: this.disabled,
        data: this.selectData,
      },
      this.options
    );
  }

  public get selectData() {
    return this.models.map((m) => {
      return {
        id: this.getValue(m),
        text: this.getLabel(m),
        selected: this.isSelected(m),
        model: m,
      };
    });
  }

  protected modelsChanged() {
    this.init();
  }

  protected disabledChanged() {
    this.init();
  }

  protected select2OptionsChanged() {
    this.init();
  }

  protected attached() {
    this.$select = $(this.element).find("select");

    this.init();
  }

  protected detached() {
    // release memory
    if (this.$select?.select2()) {
      this.$select.off("select2:select");
      this.$select.select2("destroy");
      this.$select = null;
    }
  }

  public binding() {
    if (this.name == null || this.name === "") {
      this.name = `select-dropdown-${SelectDropdown.uniqueId++}`;
    }
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
