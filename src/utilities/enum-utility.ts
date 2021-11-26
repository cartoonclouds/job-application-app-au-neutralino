import * as _ from "underscore";

export class EnumUtility {
  private static getEnumValues<T extends Record<string, number | string>>(
    anEnum: T
  ): Array<T[keyof T]> {
    const enumClone = _.clone(anEnum);

    _.forEach(enumClone, (_value: number | string, key: string) => {
      if (!isNaN(Number(key))) {
        delete enumClone[key];
      }
    });

    return _.values(enumClone) as Array<T[keyof T]>;
  }

  public static getRandomEnum<T extends Record<string, number | string>>(
    anEnum: T
  ): T[keyof T] {
    const enumValues = EnumUtility.getEnumValues(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);

    return enumValues[randomIndex];
  }
}
