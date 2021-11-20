import { Utility } from "../../utilities/common";
import numeral from "numeral";
import * as _ from "underscore";

type RoundingFormatOptions = {
  /** The format used by numeral */
  format?: string;

  /** The rounding strategy */
  roundingStrategy?: string;

  /** The string to return when the input is invalid or when a value can't be converted */
  invalidFormat?: string;

  /** Set to true if null or NaN assertions are valid inputs to the value converter */
  ignoreInputAssertions?: boolean;
};

abstract class RoundingValueConverterBase {
  protected defaultOptions: RoundingFormatOptions = {
    format: "0,0.00",
    roundingStrategy: undefined,
    invalidFormat: "--",
    ignoreInputAssertions: false,
  };

  constructor(defaultOptions?: RoundingFormatOptions) {
    Object.assign(this.defaultOptions, defaultOptions);
  }

  public toView(value: number, options?: RoundingFormatOptions) {
    options = Object.assign({}, this.defaultOptions, options);

    // The default value when not configured is 6R
    if (!options.roundingStrategy) {
      options.roundingStrategy = "6R";
    }

    if (Utility.isNullOrNaN(value)) {
      // It's probably an error if it gets to a format value converter
      // and we are trying to format null or NaN
      if (!options.ignoreInputAssertions) {
        console.assert(
          true,
          "RoundingValueConverter: Received null or NaN. This is likely unintentional"
        );
      }
      return options.invalidFormat;
    }

    // parse the rounding strategy code
    const splitIndex = options.roundingStrategy.length - 1;
    const precision = +options.roundingStrategy.substring(0, splitIndex);

    /*
    const rounding = options.roundingStrategy.substring(splitIndex);

    
    // We want to "round towards 0" (reduce 'magnitude')
    // rather than towards +/- infinity.
    // As such, when value is negative
    //  rounding down uses ceil() and
    //  rounding up uses floor()
    // A custom roundReduceMagnitude needs to be used in place of Math.round()
    //   as the latter rounds towards the infinities
    let roundingFunction: Function;
    switch (rounding) {
      case "D":
        roundingFunction = value > 0 ? Math.floor : Math.ceil;
        break;
      case "U":
        roundingFunction = value > 0 ? Math.ceil : Math.floor;
        break;
      case "R":
      default:
        roundingFunction = Utility.roundReduceMagnitude;
        break;
    }

    // round off to "X" digits
    const firstRound: number = +numeral._.toFixed(
      value,
      precision,
      Utility.roundReduceMagnitude
    );

    // check if rounding caused a problem. (Overflow?)
    if (Utility.isNullOrNaN(firstRound)) {
      // always perform this assertion. An overflow error is never intentional
      console.assert(
        true,
        "RoundingValueConverter: Possible overflow error with initial rounding"
      );
      return options.invalidFormat;
    }

    // calculate the required display precision based on the mantissa of the format
    const mantissa = options.format ? options.format.split(".")[1] : "";
    const requiredDisplayPrecision = mantissa.replace(/[^0]/gi, "").length;

    let secondRound;
    if (requiredDisplayPrecision >= precision) {
      // already rounded to the correct precision
      secondRound = firstRound;
    } else {
      // use round function "Y"
      secondRound = +numeral._.toFixed(
        firstRound,
        requiredDisplayPrecision,
        roundingFunction
      );
      // check if rounding caused a problem. (Overflow?)
      if (Utility.isNullOrNaN(secondRound)) {
        // always perform this assertion. An overflow error is never intentional
        console.assert(
          true,
          "RoundingValueConverter: Possible overflow error with display rounding"
        );
        return options.invalidFormat;
      }
    }

    */
    const secondRound = Number(value).toFixed(precision);

    // convert to a numeral object
    const num = numeral(secondRound);

    // display as 2 digits with $ (or as defined by options.format)
    return num.format(options.format);
  }
}

/**
 * Rounding Strategy using "4D":
 * https://jira.plusc.io/browse/LZ-1710
 *
 * Rounding strategy using "6R":
 * https://jira.plusc.io/browse/LK-2132
 *
 * Handling rounding strategy XY
 * Step 1 Round *OFF* to X digits
 * Round using Y (where Y = Up/Down/Off) to Z digits
 *  (Z == 2 or as sepcified in options.format)
 *
 *  4D =>
 *  Step 1) Round *OFF* to 4 digits.
 *  Step 2) Round *DOWN* to 2 digits.
 *
 *  6R =>
 *  Step 1) Round *OFF* to 6 digits.
 *  Step 2) Round *OFF* to 2 digits
 */
export class CurrencyFormatValueConverter extends RoundingValueConverterBase {
  constructor() {
    super({
      // this format should probably eventually be driven localisation
      // eg: 0,0.00€ in some locales
      format: "$0,0.00",
    });
  }
}
