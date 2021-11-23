import { PayRateUnitEnum } from "../enums/pay-rate-unit";

export class PayRateUtility {
  public static create(amount: number, unit: PayRateUnitEnum): PayRate {
    return {
      amount,
      unit,
    };
  }
}
