import { bindable, BindingMode } from "aurelia";
import { PropertyNameOrFunction } from "../../../custom_typings/common";
import { Utility } from "../../../utilities/common";

/**
 *
 * @url https://ilikekillnerds.com/2015/08/aurelia-custom-elements-custom-callback-events-tutorial/
 */
export class SelectDropdown {
  @bindable({ mode: BindingMode.twoWay }) public value: any;
  @bindable({ mode: BindingMode.twoWay })
  public models: any[] = [];

  @bindable({ mode: BindingMode.oneTime }) public key?: PropertyNameOrFunction;
  @bindable({ mode: BindingMode.oneTime })
  public labelKey?: PropertyNameOrFunction;

  @bindable({ mode: BindingMode.oneTime }) public multiple: boolean = false;
  @bindable({ mode: BindingMode.oneTime }) public showSearch: boolean = false;

  // https://stackoverflow.com/questions/50011443/tslint-how-to-disable-error-somevariable-is-declared-but-its-value-is-never-rea
  private $select: JQuery<Element>;

  constructor(private readonly element: Element) {
    this.$select = $(this.element);
  }

  private initSelect2() {
    this.$select.select2({
      minimumResultsForSearch: this.showSearch ? undefined : -1,
    });

    // matcher: this.matcher, // fix incase not passed
    // console.log(this.$select);
    // this.$select.select2({
    // placeholder: this.placeholder,
    // allowClear: this.allowClear,
    // closeOnSelect: this.closeOnSelect,
    // disabled: this.disabled,
    // minimumInputLength: this.hideSearchBox ? -1 : this.minimumInputLength, // https://select2.org/searching#limiting-display-of-the-search-box-to-large-result-sets
    // maximumInputLength: this.maximumInputLength,
    // sorter: this.sorter,
    // templateResult:,
    // templateSelection
    // });
  }

  protected attached() {
    this.$select = $(this.element).find("select");
    this.initSelect2();

    // this.select2Setup();
    // this.$dropdown = $(this.dropdown);
    // this.$select = this.$dropdown.find("select");
    // this.$dropdown.on("show.bs.dropdown", this.showHandler);
    // this.$dropdown.on("hide.bs.dropdown", this.hideHandler);
  }

  protected detached() {
    // release memory
    this.$select.select2("destroy");
    this.$select.off("select2:select");
    this.$select = null;

    // this.$dropdown.off("show.bs.dropdown", this.showHandler);
  }

  private getValue(item: any) {
    return this.getValueFromKey(item, this.key);
  }

  private getLabel(item: any) {
    return this.getValueFromKey(item, this.labelKey);
  }

  private getValueFromKey(item: any, key: PropertyNameOrFunction | undefined) {
    if (!item || !key) {
      return item;
    }
    return Utility.getValueFromPropertyNameOrFunction(item, key);
  }
}
