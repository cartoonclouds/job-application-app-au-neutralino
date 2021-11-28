import { bindable, BindingMode, inject } from "aurelia";
import { NavigationKeys } from "../../../custom_typings/keyboard-keys";
import { PayRateUnitEnum } from "../../../enums/pay-rate-unit";

@inject()
export class RateOfPay {
  @bindable({ mode: BindingMode.twoWay }) public rate: PayRate;
  @bindable({ mode: BindingMode.oneTime }) public step: number = 0.05;
  @bindable({ mode: BindingMode.oneTime }) public currencySymbol: string = "$";
  @bindable({ mode: BindingMode.oneTime }) public divider: string = "per";

  public updateValue(keyCode: NavigationKeys) {
    switch (keyCode) {
      case "ArrowUp":
        this.updateValueBy(1 * this.step);
        break;

      case "ArrowDown":
        this.updateValueBy(-1 * this.step);
        break;
    }
    return true;
  }

  private updateValueBy(direction: number) {
    if (!this.rate) {
      this.rate = {
        amount: 0.0,
        unit: PayRateUnitEnum.HOUR,
      };
    }

    let newRate = Number(this.rate.amount) + direction;

    newRate = Math.min(Math.max(newRate, 0), Number.MAX_VALUE);

    this.rate.amount = newRate;
  }

  public get payRateUnitOptions() {
    return Object.values(PayRateUnitEnum);
  }
}
