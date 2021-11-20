import _ from "underscore";
import {
  EntriesPropertyGetter,
  PropertyGetter,
  PropertyMultiGetter,
  PropertyName,
} from "../custom_typings/common";
import { ArrayUtility } from "./array-utility";

export class Utility {
  public static truthyDetector(value: unknown) {
    return value === "" || value === true || value === "true";
  }

  public static isObject(obj: any): obj is object {
    return obj !== null && typeof obj === "object";
  }

  public static isNullOrNaN(value: any) {
    return value == null || isNaN(value);
  }

  public static isNullOrEmpty(
    val: any
  ): typeof val extends null | undefined | "" ? true : false {
    return val == null || val === "";
  }

  public static isWhitespaceNullOrEmpty(val: string) {
    return Utility.isNullOrEmpty(val) || /^\s+$/.test(val);
  }

  public static getNumber(value: any, stripInvalidChars: boolean = true) {
    // todo: use numbro
    if (_.isString(value)) {
      const toParse = stripInvalidChars
        ? value.replace(/[^0-9\.-]+/g, "")
        : value;
      const num = parseFloat(toParse || "");
      return !isNaN(num) && isFinite(num) ? num : NaN;
    }

    if (_.isNumber(value)) {
      return value;
    }

    return NaN;
  }

  /**
   * Performs a round towards 0 reducing magnitude of the number
   * (rather reducing than the absolute value)
   * @param value the number to round
   */
  public static roundReduceMagnitude(value: number): number {
    return value >= 0 ? Math.round(value) : -Math.round(-value);
  }

  /**
   * Performs a floor towards 0 (reducing magnitude of the number)
   * @param value the number to round
   */
  public static floorReduceMagnitude(value: number): number {
    return value >= 0 ? Math.floor(value) : -Math.floor(-value);
  }

  public static getValueFromPropertyNameOrFunction(
    i: any | any[],
    propertyNameOrFunction: PropertyMultiGetter
  ): any {
    return _.isFunction(propertyNameOrFunction)
      ? (
          (<PropertyGetter | EntriesPropertyGetter>(
            propertyNameOrFunction
          )) as Function
        ).apply(null, _.isArray(i) ? i : [i])
      : i[<PropertyName>propertyNameOrFunction];
  }

  public static getOwnPropertyNames(obj: any): string[] {
    if (obj == null) {
      return [];
    }

    const properties = Object.getOwnPropertyNames(obj);

    // remove hidden or irrelevant properties which could be returned with getOwnPropertyNames
    //  eg: $$observers, constructor
    for (let p = properties.length - 1; p >= 0; p--) {
      if (properties[p].startsWith("$")) {
        properties.splice(p, 1);
      }
    }
    ArrayUtility.removeElementFromArray(properties, "constructor");

    return properties;
  }
}
