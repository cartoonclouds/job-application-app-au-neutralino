import { Action } from "../models/Action";
import { User } from "../models/User";
import { Person } from "../models/Person";
import { JobApplication } from "../models/JobApplication";
import { Job } from "../models/Job";
import { Company } from "../models/Company";
import { Address } from "../models/Address";

declare type BooleanString = "true" | "false" | true | false /* boolean */;

export type PropertyGetter = (item) => any;
export type EntriesPropertyGetter = (key, value) => any;
export type PropertyName = string;
export type PropertyNameOrFunction = PropertyName | PropertyGetter;
export type PropertyMultiGetter =
  | PropertyName
  | PropertyGetter
  | EntriesPropertyGetter;

// https://2ality.com/2020/04/classes-as-values-typescript.html
export type Class<T> = new (...args: any[]) => T;

export type SearchFunction = (item) => boolean;

export type Comparefunction = (a: any, b: any) => -1 | 0 | 1;

export type LeftMouseButton = 0;
export type MiddleMouseButton = 1;
export type RightMouseButton = 2;
