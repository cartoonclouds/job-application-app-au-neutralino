import { bindable, BindingMode } from "aurelia";

export class SalaryRange {
  @bindable({ mode: BindingMode.twoWay }) public range: NumberRange;
  @bindable({ mode: BindingMode.oneTime }) public step: number = 0.5;
  @bindable({ mode: BindingMode.oneTime }) public currencySymbol: string = "$";

  private slider;

  constructor(private readonly element) {}

  // public attached() {
  // this.slider = this.element.getElementById("salary-range-slider");
  /*noUiSlider.create(this.slider, {
      start: [4000, 8000],
      range: {
        min: [2000],
        max: [10000],
      },
    });*/
  // }
}
