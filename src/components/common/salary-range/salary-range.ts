import { observable, ObserverLocator } from "@aurelia/runtime";
import { bindable, BindingMode } from "aurelia";
import { NavigationKeys } from "../../../custom_typings/keyboard-keys";

export class SalaryRange {
  @bindable({ mode: BindingMode.twoWay }) public range: NumberRange;
  @bindable({ mode: BindingMode.oneTime }) public step: number = 0.5;
  @bindable({ mode: BindingMode.oneTime }) public currencySymbol: string = "$";

  // https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/
  public updateValue(rangeKey: "start" | "end", keyCode: NavigationKeys) {
    switch (keyCode) {
      case "ArrowUp":
        this.updateValueBy(rangeKey, 1 * this.step);
        break;

      case "ArrowDown":
        this.updateValueBy(rangeKey, 1 * this.step);
        break;
    }
    return true;
  }

  constructor(observerLocator: ObserverLocator) {
    // getting the observer for property 'value'
    // const observer = observerLocator.getObserver(this.range, "start");
    // const observer2 = observerLocator.getObserver(this.range, "end");
    // observer.subscribe({
    //   handleChange(newValue) {
    //     console.log("new value of object is:", newValue);
    //   },
    // });
    // observer2.subscribe(subscriber);
  }

  private updateValueBy(rangeKey: "start" | "end", direction: number) {
    if (!this.range) {
      this.range = {
        start: 0,
        end: 0,
      };
    }

    let newRange = Number(this.range[rangeKey]) + direction;

    newRange = Math.min(Math.max(newRange, 0), Number.MAX_VALUE);

    this.range[rangeKey] = newRange;
  }

  public rangeChanged(newRange) {
    console.log(newRange);

    // if (newRange.start >= newRange.end) {
    //   this.range.end = this.range.start + this.step;
    // }
  }
}

const subscriber = {};
