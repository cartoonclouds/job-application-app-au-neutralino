import * as _ from "underscore";
import { SearchFunction } from "../custom_typings/common";

export class ArrayUtility {
  public static cloneArray(array?: any[]) {
    if (array == null) {
      return array; // return null or defined
    }

    return array.slice(0);
  }

  /** This function does not work with an array of functions */
  public static removeElementFromArray<Type>(
    array: Type[],
    fnOrObj: SearchFunction | Type
  ): void {
    const index = ArrayUtility.findIndexOfArray(array, fnOrObj);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  public static findIndexOfArray(
    array: any[],
    fnOrObj: SearchFunction | any
  ): number {
    let index = -1;
    // If array is null return -1
    if (!array) {
      return index;
    }
    if (_.isFunction(fnOrObj)) {
      index = array.findIndex(fnOrObj);
    } else {
      index = array.findIndex((item) => item === fnOrObj);
    }

    return index;
  }
}
