import { Model } from "./Model";
import moment from "moment";

/**
 * The built-in, primitive cast types supported.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
 * @see https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch01.html
 * @var string[]
 */
export const PrimitiveTypesSerializations = new Map<string, any>([
  [
    "array",
    {
      serialize: (value) => Model.toJson(value),
      unserialize: (value) => Model.fromJson(value),
    },
  ],
  [
    "arraybuffer",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "bigint",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "boolean",
    {
      serialize: (value) => String(value),
      unserialize: (value) => Boolean(value),
    },
  ],
  [
    "date",
    {
      serialize: (value) => value.toISOString(),
      unserialize: (value) => new Date(value),
    },
  ],
  [
    "error",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "function",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "infinity",
    {
      serialize: (value) => String(value),
      unserialize: (value) => Model.asInfinity(value),
    },
  ],
  [
    "map",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "nan",
    {
      serialize: (value) => String(value),
      unserialize: (value) => NaN,
    },
  ],
  [
    "null",
    {
      serialize: (value) => String(null),
      unserialize: (value) => null,
    },
  ],
  [
    "number",
    {
      serialize: (value) => String(value),
      unserialize: (value) => Number(value),
    },
  ],
  [
    "object",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "regexp",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "set",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "string",
    {
      serialize: (value) => String(value),
      unserialize: (value) => String(value),
    },
  ],
  [
    "symbol",
    {
      serialize: (value) => String(value),
      unserialize: (value) => {},
    },
  ],
  [
    "typedarray",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "undefined",
    {
      serialize: (value) => String(undefined),
      unserialize: (value) => undefined,
    },
  ],
  [
    "weakmap",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "weakset",
    {
      serialize: (value) => {},
      unserialize: (value) => {},
    },
  ],
  [
    "moment.Moment",
    {
      serialize: (value) => (value as moment.Moment).format(),
      unserialize: (value) => moment(value),
    },
  ],
]);
