import { bindable, BindingMode, inject } from "aurelia";

// import "nouislider";
import * as noUiSlider from "nouislider";

@inject()
export class SalaryRange {
  @bindable({ mode: BindingMode.twoWay }) public range: NumberRange;
  @bindable({ mode: BindingMode.oneTime }) public step: number = 0.5;
  @bindable({ mode: BindingMode.oneTime }) public currencySymbol: string = "$";
  @bindable({ mode: BindingMode.oneTime }) public minMax: NumberRange = {
    start: 0,
    end: 300,
  };

  private slider: noUiSlider.API;

  constructor(private readonly element: HTMLElement) {}

  public binding() {
    if (!this.range) {
      this.range = {
        start: 10,
        end: 100,
      };
    }
  }

  public attached() {
    //.querySelector("#salary-range-slider");
    this.slider = noUiSlider.create(this.element, this.options);

    // update range on slider change
    // this.slider.on(this.range =)
  }

  public detached() {
    this.slider?.destroy();
    this.slider = null;
  }

  protected get options(): noUiSlider.Options {
    return {
      start: [this.range.start, this.range.end],
      range: {
        min: [this.minMax.start],
        max: [this.minMax.end],
      },
      tooltips: this.tooltipFormatter,
      step: this.step,
      // snap: true,
    };
  }

  protected get tooltipFormatter(): noUiSlider.Formatter {
    const symbol = this.currencySymbol;
    return {
      to(value: number): string | number {
        return `${symbol}${value.toFixed(2)}`;
      },
      from(value: string): number | false {
        return Number(value.replace(symbol, ""));
      },
    };
  }
}
