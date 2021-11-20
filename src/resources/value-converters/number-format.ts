import numeral from "numeral";
import * as _ from "underscore";
import { Utility } from "../../utilities/common";

export class NumberFormatValueConverter {
  /**
   * Converts a number from a model for display in HTML or an input field
   * @param value the field value (number or null)
   * @param format the number format string, e.g. "0.[00]" (default "00")
   * @param defaultValue the value to display if value is empty or NaN
   * @param preFormatRoundingFunction the function for rounding before display
   * @returns formatted string number
   * @remarks IMPORTANT: the preFormatRoundingFunction is applied directly to
   *          the `value` _before_ formatting, so you should avoid using
   *          `Math.round`, `Math.floor`, `Math.ceil` or
   *          `Utility.floorReduceMagnitude`, except in cases where the format
   *          has no decimal places. In those cases, if needed, pass in a
   *          function that will round the value as desired to the same number
   *          of decimal places as will be displayed according to `format`;
   *          additional rounding will be done if necessary by
   *          `numeral().format()`, using the default numeraljs rounding rules.
   *          For precise rounding of higher-precision dollar values according
   *          to business rules, CurrencyFormatValueConverter or
   *          RateFormatValueConverter is recommended instead.
   */
  public toView<ValueType = number | null, DefaultValueType = string>(
    value: ValueType,
    format: string | null,
    defaultValue?: DefaultValueType,
    preFormatRoundingFunction: (v: number) => number = (v: number) => v
  ) {
    const valueWithoutE =
      typeof value === "string" ? value.replace(/e\d*$/, "") : value;

    if (
      Utility.isNullOrEmpty(valueWithoutE) ||
      isNaN(valueWithoutE as unknown as number)
    ) {
      return defaultValue != null
        ? (defaultValue as DefaultValueType)
        : (valueWithoutE as ValueType);
    }

    if (!format) {
      format = "00";
    }

    const result = numeral(
      preFormatRoundingFunction(valueWithoutE as unknown as number)
    ).format(format);

    return result;
  }

  /**
   * Converts a number string typed in an input into a numeric form
   * @param value the value typed in the input field
   * @param format the number format string, e.g. "0.[00]"
   * @param defaultValue the value to return if the value is not a number
   * @param preFormatRoundingFunction unused
   * @param fromViewTruncatingFunction the function for truncating/rounding the
   *          output. Default Utility.floorReduceMagnitude. Use with caution.
   * @returns number
   * @remarks IMPORTANT: `fromViewTruncatingFunction` will be applied for the
   *          specified number of decimal places according to `format`, which
   *          differs from the the role of `preFormatRoundingFunction`. If you
   *          add an extra decimal place beyond what can be displayed, this
   *          function will be used to round to the permitted number of places.
   *          So if you set it to Math.round (instead of the default
   *          `Utility.floorReduceMagnitude`), typing "1.555" when format is
   *          "0.00" will change the output to `1.6`.
   */
  public fromView(
    value: string,
    format: string | null,
    defaultValue?: unknown,
    preFormatRoundingFunction?: (v: number) => number | null,
    fromViewTruncatingFunction?: (v: number) => number
  ): number | typeof value | typeof defaultValue {
    // if value contain anything other than 0-9, "." or "," do not attempt to parse it
    if (value?.match(/[^0-9\.e,-]+/)) {
      // invalid value should fall through so that it can be caught by validation
      return value;
    }

    const valueWithoutE =
      typeof value === "string" ? value.replace(/e\d*$/, "") : value;

    // Convert to number and remove trailing `e` which can pass the numeric test
    let result = Utility.getNumber(valueWithoutE);

    if (_.isNaN(result)) {
      return defaultValue != null ? defaultValue : valueWithoutE;
    }

    if (!format) {
      format = "00";
    }

    // Don't save a number with higher precision than what can be displayed;
    // round/truncate to specified format's decimal precision.
    const formattedNumber = numeral(result).format(
      format,
      fromViewTruncatingFunction ?? Utility.floorReduceMagnitude
    );
    result = Utility.getNumber(formattedNumber);

    return result;
  }
}

/**
 * Prefixes a + or - in front of a value
 */
export class SignPrefixValueConverter {
  public toView(value: number) {
    switch (Math.sign(value)) {
      case 1:
        return `+${value}`;
      case -1:
        return `-${value}`;
      case 0:
      default:
        return value;
    }
  }

  public fromView(value: string) {
    return Number(value);
  }
}
