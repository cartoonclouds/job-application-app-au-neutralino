import { bindable, BindingMode } from "aurelia";

export class SearchInput {
  @bindable({ mode: BindingMode.oneTime }) name: string;
  @bindable({ mode: BindingMode.oneTime }) placeholderText: string =
    "Search...";
  @bindable({ mode: BindingMode.oneTime }) border: boolean = true;

  @bindable({ mode: BindingMode.oneTime }) alignRight: boolean = false;
  @bindable({ mode: BindingMode.toView }) disabled: boolean = false;
  @bindable({ mode: BindingMode.toView }) readonly: boolean = false;

  @bindable({ mode: BindingMode.toView }) showPrefixIcon: boolean = true;
  @bindable({ mode: BindingMode.toView }) prefixIconType:
    | "search"
    | "calendar" = "search";
  @bindable({ mode: BindingMode.oneTime }) labelText: string =
    this.prefixIconType === "calendar" ? "Date:" : "Search:";

  @bindable({ mode: BindingMode.oneTime }) onClearSearch: () => void =
    () => ({});
  @bindable({ mode: BindingMode.twoWay }) value: any;

  private $input: JQuery<HTMLInputElement>;
  private hasFocus: boolean = false;
  private static uniqueId = 0;

  constructor(private readonly element: HTMLElement) {}

  public binding() {
    if (this.name == null || this.name === "") {
      this.name = `search-input-${SearchInput.uniqueId++}`;
    }
  }

  public unbind() {
    this.clearSearch();
  }

  public attached() {
    this.$input = $(this.element).find("input");

    $(this.element).on("focus", this.gotFocus);
    $(this.element).on("blur", this.lostFocus);
  }

  public gotFocus() {
    this.hasFocus = true;
  }

  public lostFocus() {
    this.hasFocus = false;
  }

  public get showInput() {
    return this.hasFocus || (!!this.$input && this.$input.val() !== "");
  }

  public clearSearch(evt?) {
    this.value = "";

    evt?.stopPropagation();
    this.$input?.trigger("focus");
    this.onClearSearch?.();
  }

  public openSearch(evt?: Event) {
    evt?.stopPropagation();
    this.$input?.trigger("focus");
  }
}
