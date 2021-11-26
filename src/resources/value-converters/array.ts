import {
  PropertyMultiGetter,
  PropertyNameOrFunction,
} from "../../custom_typings/common";
import { ArrayUtility } from "../../utilities/array-utility";
import { Utility } from "../../utilities/common";
import * as _ from "underscore";

const typeSortingValueMap = {
  undefined: 0,
  null: 1,
  boolean: 2,
  number: 3,
  bigint: 3,
};

export class SortValueConverter {
  /**
   * Sorts objects by the provided property or function's result, which should be an array
   * of comparable properties in this order:
   * * null/undefined
   * * NaN
   * * non-strings (numbers, booleans) with true and false treated as 1 and 0 respectively
   * * strings (no coercion of strings in numbers)
   * * undefined
   * If an object's sorted property is `undefined`, it will appear at the start
   * (treated as equal to null). If sorting a list of primitives (with the identity
   * function as propertyNameOrFunction), `undefined` will be sorted last
   * (according to JavaScript
   * [spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)).
   * @param unwrappedValues - an array or map
   * @param propertyStringsOrFunctions - an array of strings representing a property on each value, or functions,
   *                                     or a combination, OR a function that returns an array of properties
   * @param isAscending - sort order (default true)
   * @param mapValues - ignore the keys in a Map and only pass the values into the sort function
   *
   * @returns an object of the same type as the values object passed in
   * @remarks If mapValues is true then the resulting Map will be keyed by index.
   */
  public toView<T = unknown, U = unknown>(
    values: T[] | Map<T, U>,
    propertyStringsOrFunctions: typeof values extends []
      ? PropertyNameOrFunction | PropertyNameOrFunction[]
      : PropertyMultiGetter | PropertyMultiGetter[],
    isAscending: boolean = true,
    mapValues: boolean = false
  ): typeof values {
    let isMap = false;

    let valuesArray;
    if (values instanceof Map) {
      isMap = true;
      valuesArray = mapValues
        ? Array.from(values.values())
        : Array.from(values);
    } else {
      valuesArray = values;
    }
    if (!Array.isArray(valuesArray) || propertyStringsOrFunctions == null) {
      return isMap ? new Map(valuesArray) : valuesArray;
    }

    const factor = isAscending ? 1 : -1;
    const getValues = (i): any[] =>
      // If i is itself an array, function will be passed elements of i as separate arguments
      Array.isArray(propertyStringsOrFunctions)
        ? propertyStringsOrFunctions.map((nameOrFunction) =>
            Utility.getValueFromPropertyNameOrFunction(i, nameOrFunction)
          )
        : Utility.getValueFromPropertyNameOrFunction(
            i,
            propertyStringsOrFunctions
          );
    // array.sort is an in-situ operation and will trigger observable callbacks if modified.
    // value converts should not perform operations that create side effects to objects
    let temp = ArrayUtility.cloneArray(valuesArray);

    // pre-calculate the values so they don't have to be re-got for each compare
    // (important for values that are calculated in an expensive function)
    // treat undefined and null as the same
    const valueMap = new Map(temp.map((item) => [item, getValues(item)]));

    temp.sort((a, b) => {
      let result = 0;
      const aValues = valueMap.get(a);
      const bValues = valueMap.get(b);

      for (let index = 0; index < aValues.length; index++) {
        if (result !== 0) {
          break;
        }

        const aValue = aValues[index];
        const bValue = bValues[index];

        const aIsString = _.isString(aValue);
        const bIsString = _.isString(bValue);

        // check most common case first
        if (aIsString && bIsString) {
          result = aValue.localeCompare(bValue);
          // eslint-disable-next-line eqeqeq
        } else if (aValue == bValue) {
          // deterministic sorting of equivalent values of different types
          result =
            typeSortingValueMap[typeof aValue] -
            typeSortingValueMap[typeof bValue];

          // first is null/undefined — not treated as equivalent of 0/""/false
          // (although if the element itself is `undefined`,
          // it will sort to the end as per JavaScript
          // [spec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description))
        } else if (aValue == null) {
          result = -1;
        } else if (bValue == null) {
          result = 1;

          // next comes NaN
        } else if (_.isNaN(aValue)) {
          result = _.isNaN(bValue) ? 0 : -1;
        } else if (_.isNaN(bValue)) {
          result = 1;

          // numbers, bools come before strings; number-as-string is not coerced
        } else if (aIsString && !bIsString) {
          result = 1;
        } else if (!aIsString && bIsString) {
          result = -1;

          // probably both numbers or otherwise comparable/coercible primitives
        } else {
          // use regular comparison
          result = aValue < bValue ? -1 : 1;
        }
      }

      return result * factor;
    });

    if (mapValues) {
      // Convert back to a map tuple
      temp = temp.map((value, key) => [key, value]);
    }

    return isMap ? new Map(temp) : temp;
  }
}

export class FilterValueConverter {
  /**
   * Filters a array/map by the provided property/value pair or an identify function.
   *
   * @param propertyNameOrFunction - a string representing a property on each value, or function to retrieve it
   * @example repeat.for="i of array | filter:filterFunction"
   * @example repeat.for="i of array | filter:propertyName:value"
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
   * @returns {Map | Array} a new filtered array/map
   */
  public toView(array: any[], propertyNameOrFunction, value) {
    let isMap = false;

    if (array instanceof Map) {
      isMap = true;
      array = Array.from(array);
    }

    if (!Array.isArray(array) || propertyNameOrFunction == null) {
      return array;
    }

    let temp = [];
    if (_.isFunction(propertyNameOrFunction)) {
      temp = array.filter(propertyNameOrFunction);
    } else {
      temp = array.filter((item) => item[propertyNameOrFunction] === value);
    }

    return isMap ? new Map(temp) : temp;
  }
}
